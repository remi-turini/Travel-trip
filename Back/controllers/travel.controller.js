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
                res.status(401).json({
                    state: "error",
                    message: "Aucun voyage",
                    data: null
                });
            }
            console.log(travels);
            return res.json({travels: travels});
        })
        .catch(error => res.status(500).json({
            state: "error find travels",
            message: "Une erreur inattendu est survenue",
            data: error
        }));

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

function createTravel(req, res)
{
    req.body.name
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
    shareTravel: shareTravel,
    test: test,
}