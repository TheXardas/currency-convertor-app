const User = require('../models/UserModel');

exports.getUser = function(login) {
    return User.findOne( {
        where: { login }
    })
}