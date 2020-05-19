process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 //DANGER: remove
const jwt = require('jsonwebtoken');
const logger = require('winston');

const config = require('./../../config');
const { AccessTokenHandler } = require('node-accesstoken-validation');

const Entity = require('./users/model');

const auth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.authorization;
    console.log(token);
    if (token) {
        var at_validation = new AccessTokenHandler({
            authority: config.authserver.authority,
            apiName: config.authserver.audience,
        });

        at_validation.Handle(token).then(res => {
            Entity.find({
                email: res.Identifier
            }).lean().exec(async function (err, entity) {
                if (err)
                    res.send(err);
                req.decoded = res;
                req.decoded.id = entity[0]._id;
                console.log(req.decoded);
                next();
            });
        }).catch(err => {
            console.log(err);
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
