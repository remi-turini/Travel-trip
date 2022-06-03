const models = require("../models");

function getTravels(req, res)
{
    models.Travel.findAll({
        include: {
            model: models.User,
            where: {id: req.auth.userId},
            attributes: [],
            through: { attributes: [] },
        }
    })
        .then(travels => {
            if (!travels) {
                return res.status(404).json({
                    state: "error",
                    message: "Aucun voyage",
                    data: null
                });
            }

            return res.status(200).json({
                state: "ok",
                message: "",
                data: travels
            });
        })
        .catch(error => res.status(500).json({
            state: "error find travels",
            message: "Une erreur inattendu est survenue",
            data: error
        }));

}

async function getTravelById(req, res)
{
    const travelName = req.body.travelName ?? null;

    const travel = await models.Travel.findOne({
        where: {name: travelName},
        include: [{
            model: models.User,
            where: {id: req.auth.userId},
            attributes: [],
        },
            models.Transport,   
            models.Eat,
            models.Sleep,
            models.Activity
        ]
    });

    if (!travel)
    {
        return res.status(400).json({
            state: "error",
            message: "Ce voyage n'exsite pas",
            data: null
        });
    }

    return res.status(200).json({
        state: "ok",
        message: "",
        data: travel
    });

}

async function shareTravel(req, res)
{
    var userEmail = null;
    var travelId = null;

    if (req.body.email !== undefined)
        userEmail = req.body.email;

    if (req.body.travelId !== undefined)
        travelId = req.body.travelId;

    const travel = await models.Travel.findByPk(travelId, {
        include: {
            model: models.User,
            where: {id: req.auth.userId},
            attributes: [],
            through: {attributes: []},
        }
    });

    if (!travel) {
        return res.status(404).json({
            state: "error",
            message: 'Ce voyage n\'est pas dans votre liste !',
            data: null
        });
    }

    const user = await models.User.findOne({
        where: {email: userEmail},
        include: models.Travel
    });

    if (!user) {
        return res.status(404).json({
            state: "error",
            message: 'L\'addresse mail spécifié n\'existe pas !',
            data: null
        });
    }

    const newSharedTravel = await user.addTravel(travel, { through: models.UserTravel });

    if (newSharedTravel == 0){
        res.status(404).json({
            state: "error",
            message: "Echec du partage de voyage ou voyage déjà partagée",
            data: null
        });
    }

    res.status(201).json({
        state: "ok",
        message: "Voyage partagé avec succès",
        data: newSharedTravel
    });
}

async function createTravel(req, res)
{
    var travelName;

    var startCity;
    var startAt;

    var arrivedCity;
    var endAt;

    req.body.travelName !== undefined ? travelName = req.body.travelName : travelName = null;
    req.body.startCity !== undefined ? startCity = req.body.startCity : startCity = null;
    req.body.startAt !== undefined ? startAt = req.body.startAt : startAt = null;
    req.body.arrivedCity !== undefined ? arrivedCity = req.body.arrivedCity : arrivedCity = null;
    req.body.endAt !== undefined ? endAt = req.body.endAt : endAt = null;


    const userAuth = await models.User.findByPk(req.auth.userId, {
        include: {
            model: models.Travel,
        }
    });

    const userTravel = await userAuth.getTravels({
        where: {name: travelName}
    });

    if (userTravel.length !== 0){
        return res.status(201).json({
            state: "error",
            message: "Vous avez déjà crée un voyage : " + travelName,
            data: null
        });
    }


    const newTravel = await models.Travel.create({
        name: travelName,
        startDate: startAt,
        endDate: endAt,
    });

    const addedTravel = await userAuth.addTravel(newTravel, { through: models.UserTravel });

    const newTransport = await models.Transport.create({
        startCity: startCity,
        startAt: startAt,
        arrivedCity: arrivedCity,
        arrivedAt: endAt
    });

    const addedTransport = await newTravel.addTransport(newTransport);

    if (addedTravel == 0){
        res.status(404).json({
            state: "error",
            message: "Echec de création du voyage",
            data: null
        });
    }

    res.status(404).json({
        state: "ok",
        message: "Voyage crée avec succès",
        data: newTransport
    });
}

async function test(req, res) {

    const test = await models.User.findByPk(1,
        {
            include: models.Travel
        });

    return res.json({result: test});
}

module.exports = {
    getTravels: getTravels,
    getTravelById: getTravelById,
    shareTravel: shareTravel,
    createTravel: createTravel,
    test: test,
}