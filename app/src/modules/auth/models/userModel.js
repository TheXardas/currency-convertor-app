const bcrypt = require('bcrypt');
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../core/db');

class UserModel extends Model {
    validPassword(password) {
        return bcrypt.compare(password, this.password);
    }

    toJSON() {
        let values = Object.assign({}, this.get());
        // Hide password from api result
        delete values.password;
        return values;
    }
}

UserModel.init({
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
});

UserModel.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(8))
});

module.exports = UserModel;