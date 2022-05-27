const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require("../models");

function login(req, res, next)
{
    console.log("la request est : ", req)
    var userEmail = null;
    if (req.body.email !== undefined)
        userEmail = req.body.email;

    models.User.findOne({ where: { email: userEmail } })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    state: "error",
                    message: 'L\'addresse mail spécifié n\'existe pas !',
                    data: null
                });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({
                            state: "error",
                            message: 'Mot de passe incorrect !',
                            data: null
                        });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'secret_key',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({
                    state: "error password compare",
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
    login: login
}