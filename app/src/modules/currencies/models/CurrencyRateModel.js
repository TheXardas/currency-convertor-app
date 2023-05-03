const bcrypt = require('bcrypt');
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../core/db');

class CurrencyRateModel extends Model {}

CurrencyRateModel.init({
    rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'CurrencyRate',
    indexes: [
        {
            unique: true,
            fields: ['base_currency_id', 'target_currency_id', 'date']
        },
        {
            fields: ['base_currency_id', 'date']
        }
    ]
});

module.exports = CurrencyRateModel;