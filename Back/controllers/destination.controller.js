const models = require("../models");
const { Op } = require("sequelize");

async function addDestination(req, res)
{
    travelId = req.body.travelId ?? null;
    departureCity = req.body.departureCity ?? null;
    departureDate = req.body.departureDate ?? null;
    arrivedCity = req.body.arrivedCity ?? null;
    arrivedDate = req.body.arrivedDate ?? null;

    const travel = await models.Travel.findByPk(travelId, {
        include: {
            model: models.User,
            where: {id: req.auth.userId},
            attributes: [],
            through: { attributes: [] },
        }
    });

    if (!travel) {
        return res.status(404).json({
            state: "error",
            message: "Ce voyage n'existe pas ou est erroné",
            data: null
        });
    }

    const existDestination = await models.Destination.findOne({
        where: {
            [Op.and]: [{departureCity: departureCity}, {arrivedCity: arrivedCity}],
        },
        include: {
            model: models.Travel,
            where: {id: travel.id},
        }
    })

    if (existDestination)
    {
        return res.status(404).json({
            state: "error",
            message: "Cette destination a déjà été ajouté à votre voyage",
            data: null
        });
    }

    var departureCityGps = await models.Airport.findAll({
        where: {cityName: departureCity},
        attributes: ['lat', 'lon']
    });

    const departureCityLat = departureCityGps.length > 0 ? departureCityGps[0].lat : null;
    const departureCityLon = departureCityGps.length > 0 ? departureCityGps[0].lon : null;

    var arrivedCityGps = await models.Airport.findAll({
        where: {cityName: arrivedCity},
        attributes: ['lat', 'lon']
    });

    const arrivedCityLat = arrivedCityGps.length > 0 ? arrivedCityGps[0].lat : null;
    const arrivedCityLon = arrivedCityGps.length > 0 ? arrivedCityGps[0].lon : null;

    const newDestination = await models.Destination.create({
        departureCity: departureCity,
        departureCityLat: departureCityLat,
        departureCityLong: departureCityLon,
        departureDate: departureDate,
        arrivedCity: arrivedCity,
        arrivedCityLat: arrivedCityLat,
        arrivedCityLong: arrivedCityLon,
        arrivedDate: arrivedDate
    });

    const addedDestination = await travel.addDestination(newDestination);

    if (addedDestination === null) {
        return res.status(404).json({
            state: "error",
            message: "Erreur d'ajout de la destination",
            data: null
        });
    }

    return res.status(200).json({
        state: "ok",
        message: "Destination ajoutée avec succès",
        data: addedDestination
    });
}

module.exports = {
    addDestination: addDestination
}