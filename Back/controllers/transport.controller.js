const models = require("../models");

async function getAirplanesByIata(req, res)
{
    // TO DO
}

async function getAirportsByCity(req, res)
{
    const startCity = req.body.startCity ?? null;
    const arrivedCity = req.body.arrivedCity ?? null;

    var startCityAirports = await models.Airport.findAll({
        where: {cityName: startCity},
        attributes: ['code', 'name', 'cityName', 'countryName']
    });

    var arrivedCityAirports = await models.Airport.findAll({
        where: {cityName: arrivedCity},
        attributes: ['code', 'name', 'cityName', 'countryName']
    });

    if (startCityAirports.length === 0){
        startCityAirports = "Aucun résultat";
        // return res.status(404).json({
        //     state: "error",
        //     message: "Aucun aéroport disponible dans la ville : " + startCity,
        //     data: null
        // });
    }

    if (arrivedCityAirports.length === 0){
        arrivedCityAirports = "Aucun résultat";
        // return res.status(404).json({
        //     state: "error",
        //     message: "Aucun aéroport disponible dans la ville : " + arrivedCity,
        //     data: null
        // });
    }

    return res.status(200).json({
        state: "ok",
        message: "",
        data: {startCityAirports, arrivedCityAirports}
    });
}

module.exports = {
    getAirportsByCity: getAirportsByCity,
}