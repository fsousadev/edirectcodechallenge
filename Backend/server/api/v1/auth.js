const jwt = require('jsonwebtoken');
const logger = require('winston');

const config = require('./../../config');

const auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.authorization;
    console.log(token);
    if (token) {
        var at_validation = new AccessTokenHandler({
            authority: 'https://authserver-fsousa.azurewebsites.net',
            apiName: 'web_api'
        });

        at_validation.Handle(token).then(res => {
            next();
        }).catch(err => {
            const message = 'Unauthorized';
            logger.warn(message);
            res.status(401);
            res.json({
                success: false,
                message,
            });
        });
    } else {
        const message = 'Forbidden';
        logger.warn(message);
        res.status(403);
        res.json({
            success: false,
            message,
        });
    }
};

const signToken = (payload, expiresIn = '1h') => jwt.sign(payload, config.jwt.secret, {
    algorithm: 'HS256',
    expiresIn,
});

const authFailed = (req, res, next) => {
    res.status(403);
    res.json({
        success: false,
        message: 'Email or password does not match',
    });
};

module.exports = {
    auth,
    authFailed,
    signToken,
};
