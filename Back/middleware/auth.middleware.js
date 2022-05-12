const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'secret_key');
        const userId = decodedToken.userId;

        req.auth = { userId };
        next();
    } catch (error){
        res.status(401).json({
            state: "error auth",
            message: 'Authentification incorrecte',
            data: error
        });
    }
};