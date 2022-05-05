const models = require("../models")
const bcrypt = require('bcrypt');

function getAllUser(req, res)
{
    models.User.findAll({
        include: {
            model: models.Travel,
            through: { attributes: []}
        },
    }).then(result => {
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
    models.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if(user) {
                return res.status(401).json({
                    state: 'error',
                    message: 'Email déjà utilisé par un utilisateur',
                    data: null
                })
            }

            let errorMessage = '';

            if (req.body.email.length === 0)
                errorMessage = "Email incorrecte";
            else if (req.body.password.length === 0)
                errorMessage = "Mot de passe incorrecte";

            if(errorMessage)
            {
                res.status(401).json({
                    state: "error",
                    message: errorMessage,
                    data: null
                });
            }

            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const newUser = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash,
                    }

                    models.User.create(newUser)
                        .then(result => {
                            res.status(201).json({
                                state: "ok",
                                message: "Compte crée avec succès",
                                data: null
                            });
                        })
                        .catch(error => {
                            res.status(500).json({
                                state: "error creating user",
                                message: "Une erreur inattendu est survenue",
                                data: error
                            });
                        })
                })
                .catch(error => res.status(500).json({
                    state: "error password hash",
                    message: "Une erreur inattendu est survenue",
                    data: error
                }));
        })
        .catch(error => res.status(500).json({
            state: "error find user",
            message: "Une erreur inattendu est survenue",
            data: error
        }));
}


module.exports = {
    getAllUser: getAllUser,
    createUser: createUser
}