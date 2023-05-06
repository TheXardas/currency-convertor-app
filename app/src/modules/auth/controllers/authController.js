const jwt = require('jsonwebtoken');
const tokenKey = require('../constants/tokenKey');
const { getUser, getUserByAuth } = require('../services/userService');
const asyncHandler = require('express-async-handler');

exports.login = asyncHandler(async function(request, response, next) {
    if (!request.body.login || !request.body.password) {
        response.status(400).json({error: 'Login and password must be provided'}).end();
        return;
    }

    const user = await getUser(request.body.login);
    if (!user) {
        // Intentionally send 400 instead of 404 here, because it's user error, not lack of resource.
        // => proper UI reaction
        response.status(400).json({error: 'User not found'}).end();
        return;
    }

    if (!await user.validPassword(request.body.password)) {
        response.status(400).json({error: 'Password is incorrect'});
        return;
    }

    const token = {
        id: user.id,
        name: user.name,
        login: user.login
    };
    response.json({user, token: jwt.sign(token, tokenKey)});
});

exports.currentUser = asyncHandler(async function(request, response, next) {
    if (!request.user || !request.user.login) {
        response.status(401);
        response.json({error: 'Not authorized'});
        return;
    }

    const user = await getUser(request.user.login);

    if (!user) {
        response.status(404);
        response.json({error: 'User not found'});
        return;
    }

    response.json({user});
});