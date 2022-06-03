const models = require("../models")
const bcrypt = require('bcrypt');

function getUser(req, res)
{
    models.User.findOne({
        where: {id: req.auth.userId}
    }).then(user => {
        res.status(200).json({
            state: "ok",
            message: "",
            data: user
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
    const email = req.body.email ?? null;
    const password = req.body.password ?? null;

    models.User.findOne({ where: { email: email } })
        .then(user => {
            let errorMessage = '';

            if(user)
                errorMessage = 'Email déjà utilisé par un utilisateur'
            else if (!email)
                errorMessage = "Email incorrecte";
            else if (!password)
                errorMessage = "Mot de passe incorrecte";

            if(errorMessage) {
                return res.status(400).json({
                    state: "error",
                    message: errorMessage,
                    data: null
                });
            }

            bcrypt.hash(password, 10)
                .then(hash => {
                    const newUser =  models.User.build ({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: email,
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

async function deleteUser(req, res)
{
    const user = await models.User.findOne({where: {id: req.auth.userId}})

    if(!user) {
        res.status(404).json({
            state: "error",
            message: "Cet utilisateur n'existe pas",
            data: null
        });
    }

    await user.destroy();

    res.status(200).json({
        state: "ok",
        message: "Utilisateur supprimé avec succèes",
        data: null
    });
}


module.exports = {
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}