const models = require("../models");
const axios = require('axios');

async function setAirplanesByCities(req, res)
{
    const destinationId = req.body.destinationId ?? null;
    // const departureCity = req.body.departureCity ?? null;
    // const arrivedCity = req.body.arrivedCity ?? null;

    const destination = await models.Destination.findByPk(destinationId);

    if(destination === null)
    {
        return res.status(404).json({
            state: "error",
            message: "Impossible de trouver la destination voulue",
            data: null
        });
    }

    if(await destination.getTransport() !== null)
    {
        return res.status(404).json({
            state: "error",
            message: "Un transport a déjà été ajouté sur cette destination",
            data: null
        });
    }

    var departureCityAirports = await models.Airport.findAll({
        where: {cityName: destination.departureCity},
        attributes: ['code', 'name', 'cityName', 'countryName']
    });

    var arrivedCityAirports = await models.Airport.findAll({
        where: {cityName: destination.arrivedCity},
        attributes: ['code', 'name', 'cityName', 'countryName']
    });

    if (departureCityAirports.length === 0){
        // departureCityAirports = "Aucun résultat";
        return res.status(404).json({
            state: "error",
            message: "Aucun aéroport disponible dans la ville : " + destination.departureCity,
            data: null
        });
    }

    if (arrivedCityAirports.length === 0){
        // arrivedCityAirports = "Aucun résultat";
        return res.status(404).json({
            state: "error",
            message: "Aucun aéroport disponible dans la ville : " + destination.arrivedCity,
            data: null
        });
    }

    var airplanes = [];
    for (const departureCityAirport of departureCityAirports)
    {
        for (const arrivedCityAirport of arrivedCityAirports)
        {
            var url = "https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=" + departureCityAirport.code + "&destination=" + arrivedCityAirport.code + "&departure_at=2022-06-24&unique=false&sorting=price&direct=false&currency=eur&limit=30&page=1&one_way=true&token=162ce094c6662a7b42f9ae736236a88a"

            try {
                var result = await axios({
                    url: url,
                    method: 'get',
                });
            } catch (e) {
                continue;
            }

            if(result.data.data.length !== 0)
            {
                var apiData = result.data.data[0];
                // var arrived_at = new Date(new Date(apiData.departure_at).getTime() + apiData.duration*60000);

                if (airplanes.length === 0 || airplanes.price > apiData.price)
                {
                    airplanes = {
                        origin: departureCityAirport.name,
                        destination: arrivedCityAirport.name,
                        departure_at:  apiData.departure_at,
                        duration: apiData.duration,
                        price: apiData.price,
                        flight_number: apiData.flight_number
                    };
                }
            }
        }
    }

    const newTransport = await models.Transport.create({
        type: "airplane",
        duration: airplanes.duration,
        departureAt: airplanes.departure_at,
        arrivedAt: null,
        price: airplanes.price,
        reserved: 0
    });

    if(newTransport == 0)
    {
        return res.status(404).json({
            state: "error",
            message: "Erreur lors de la création du transport",
            data: null
        });
    }

    const addedTransport = await destination.setTransport(newTransport);

    if(addedTransport == 0)
    {
        return res.status(404).json({
            state: "error",
            message: "Erreur lors de l'ajout du transport",
            data: null
        });
    }

    return res.status(200).json({
        state: "ok",
        message: "Transport ajouté avec succèes",
        data: addedTransport
    });
}

module.exports = {
    setAirplanesByCities: setAirplanesByCities
}