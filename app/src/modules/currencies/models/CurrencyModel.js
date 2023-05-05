const bcrypt = require('bcrypt');
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../core/db');
const {BASE_CURRENCY_CODE} = require("../constants/currency");

class CurrencyModel extends Model {

    toJSON() {
        let values = Object.assign({}, this.get());
        delete values.createdAt;
        delete values.updatedAt;
        delete values.decimal_digits;
        delete values.rounding;
        delete values.symbol_native;
        return values;
    }

    static findOneCurrencyByCode(code) {
        return CurrencyModel.findOne({
            where: {
                code: code,
            }
        })
    }

    static async findAllByCurrencyCodes(codes) {
        const currencies = await CurrencyModel.findAll({ where: { code: codes }});
        return currencies.reduce((result, currency) => {
            result[currency.code] = currency
            return result;
        }, {})
    }

    static saveCurrencies(currencies) {
        return CurrencyModel.bulkCreate(currencies, {
            ignoreDuplicates: true,
        });
    }

    static getBaseCurrency() {
        return CurrencyModel.findOneCurrencyByCode(BASE_CURRENCY_CODE);
    }
}

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