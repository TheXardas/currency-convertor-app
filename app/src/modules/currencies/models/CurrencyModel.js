const bcrypt = require('bcrypt');
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../core/db');

class CurrencyModel extends Model {}

CurrencyModel.init({
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    symbol_native: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    decimal_digits: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rounding: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name_plural: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Currency',
    indexes: [
        {
            fields: ['code']
        }
    ]
});

module.exports = CurrencyModel;