const models = require("../models")

function getAllUser(req, res)
{
    models.user.findAll().then(result => {
        res.status(200).json({
            state: "ok",
            message: null,
            data: result
        });
    }).catch(error => {
        res.status(500).json({
            state: "error",
            message: "Une erreur inattendu est survenue",
            data: error
        });
    });
}

function createUser(req, res)
{
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,

    }

    models.user.create(user).then(result => {
        res.status(201).json({
            state: "ok",
            message: "L'utilisateur a été ajouté avec succès"
        });
    }).catch(error => {
        res.status(500).json({
            state: "error",
            message: "Une erreur inattendu est survenue",
            data: error
        });
    })
}


module.exports = {
    getAllUser: getAllUser,
    createUser: createUser
}