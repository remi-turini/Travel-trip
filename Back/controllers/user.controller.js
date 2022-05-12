const models = require("../models")
const bcrypt = require('bcrypt');

function getUser(req, res)
{
    models.User.findOne({
        id: req.auth.userId
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
                    const newUser =  models.User.build ({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash,
                    });

                    newUser.save()
                        .then(result => {
                            res.status(201).json({
                                state: "ok",
                                message: "Compte crée avec succès",
                                data: result
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

async function updateUser(req, res)
{
    models.User.findOne({ where: {id: req.auth.userId} })
        .then(user => {
            if(!user){
                res.status(404).json({
                    state: "error",
                    message: "L'utilisateur spécifié n'existe pas",
                    data: null
                })
            }

            user.set({
                firstname: req.body.firstname ? req.body.firstname : user.lastname,
                lastname: req.body.lastname ? req.body.lastname : user.lastname,
                email: req.body.email ? req.body.email : user.email
            });

            user.save()
                .then(result => res.status(201).json({
                    state: "ok",
                    message: "Compte mise à jour avec succès",
                    data: result
                }))
                .catch(error => res.status(500).json({
                    state: "error update user",
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
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
}