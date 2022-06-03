const models = require("../models");

async function getAirplanesByIata(req, res)
{
    const startCity = data.startCity ?? null;
    const arrivedCity = data.arrivedCity ?? null;

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

    var data = {
        startCity: startCity,
        arrivedCity: arrivedCity
    }
    var airports = null;
    airports = getAirportsByCity(data);
    console.log(airports);

    return res.json({});
    for (const value of airports.data.startCityAirports) {
        console.log(value.cityName);
    }
    return 0;

    var url = "https://api.travelpayouts.com/aviasales/v3/prices_for_dates?origin=MRS&destination=PAR&departure_at=2022-06-24&unique=false&sorting=price&direct=false&currency=eur&limit=30&page=1&one_way=true&token=162ce094c6662a7b42f9ae736236a88a"

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "", true);
    xhttp.send();
}

async function getAirportsByCity(data)
{
    const startCity = data.startCity ?? null;
    const arrivedCity = data.arrivedCity ?? null;

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

    return "toto";

    // return res.status(200).json({
    //     state: "ok",
    //     message: "",
    //     data: {startCityAirports, arrivedCityAirports}
    // });
}

module.exports = {
    // getAirportsByCity: getAirportsByCity,
    getAirplanesByIata: getAirplanesByIata
}