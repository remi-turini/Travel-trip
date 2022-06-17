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

    const newDestination = await models.Destination.create({
        departureCity: departureCity,
        departureDate: departureDate,
        arrivedCity: arrivedCity,
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