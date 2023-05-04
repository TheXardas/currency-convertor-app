const UserModel = require('../models/UserModel');

exports.getUser = function(login) {
    return UserModel.findOne( {
        where: { login }
    })
}