const User = require('../models/userModel');

exports.getUser = function(login) {
    return User.findOne( {
        where: { login }
    })
}