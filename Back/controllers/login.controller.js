const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require("../models");

function login(req, res, next)
{
    models.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    state: "error",
                    message: 'Utilisateur non trouvé !',
                    data: null });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
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