const tokenKey = require('../constants/tokenKey');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const NO_AUTH_ROTES = ['/auth/login'];

module.exports = function (req, res, next) {
    if (!req.headers.authorization) {
        next();
        return;
    }

    jwt.verify(
        req.headers.authorization.split(' ')[1],
        tokenKey,
        async (err, payload) => {
            if (err) {
                if (NO_AUTH_ROTES.includes(req.url)) {
                    next();
                    return;
                }

                console.error(err);
                res.status(401).json({ error: 'Not Authorized' }).end();
            }
            else if (payload) {
                const user = await userService.getUser(payload.login);
                if (user && user.id === payload.id) {
                    req.user = user.dataValues;
                    next();
                    return;
                }

                console.error('Failed to verify user', payload);
                res.status(401).json({ error: 'Not Authorized' }).end();
            }
        }
    );
};