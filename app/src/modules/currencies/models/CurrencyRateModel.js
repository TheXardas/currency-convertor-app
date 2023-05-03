const bcrypt = require('bcrypt');
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../core/db');
const CurrencyModel = require("./CurrencyModel");
require('./relations');

class CurrencyRateModel extends Model {

    static async prepareRates(rates, date, baseCurrency, currenciesByCode) {
        const newCurrencyRates = [];
        for (const [code, rate] of Object.entries(rates)) {
            const currencyInDb = currenciesByCode[code]
            if (!currencyInDb) {
                console.error('Tried to save rate for unknown currency! Run fetch?', code);
                continue;
            }

            newCurrencyRates.push({
                base_currency_id: baseCurrency.id,
                target_currency_id: currencyInDb.id,
                date,
                code,
                rate,
            })
        }
        return newCurrencyRates;
    }

    static async saveHistory(history, baseCurrency) {
        let currenciesByCodes;
        let newRates = [];

        for (const date in history) {
            const rates = history[date];
            // Fetch currencies by code only once
            if (!currenciesByCodes) {
                const currencyCodes = Object.keys(rates);
                currenciesByCodes = await CurrencyModel.findAllByCurrencyCodes(currencyCodes);
            }
            const newRatesForDate = await this.prepareRates(rates, date, baseCurrency, currenciesByCodes);
            newRates = newRates.concat(newRatesForDate);
        }

        return await CurrencyRateModel.bulkCreate(newRates, {
            updateOnDuplicate: ['target_currency_id', 'base_currency_id', 'date'],
        })
    }

    static async saveLatest(latestRates, baseCurrency) {
        const currencyCodes = Object.keys(latestRates);
        const currenciesByCodes = await CurrencyModel.findAllByCurrencyCodes(currencyCodes);
        const newRates = await this.prepareRates(latestRates, sequelize.fn('NOW'), baseCurrency, currenciesByCodes);

        return await CurrencyRateModel.bulkCreate(newRates, {
            updateOnDuplicate: ['target_currency_id', 'base_currency_id', 'date'],
        })
    }

}

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

CurrencyModel.hasMany(CurrencyRateModel, {
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'base_currency_id',
        allowNull: false,
    },
    as: 'BaseCurrencyRates',
})
CurrencyRateModel.belongsTo(CurrencyModel, {
    foreignKey: {
        name: 'base_currency_id',
        allowNull: false,
    },
    as: 'BaseCurrency',
})

CurrencyModel.hasMany(CurrencyRateModel, {
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'target_currency_id',
        allowNull: false,
    },
    as: 'TargetCurrencyRates',
})
CurrencyRateModel.belongsTo(CurrencyModel, {
    foreignKey: {
        name: 'target_currency_id',
        allowNull: false,
    },
    as: 'TargetCurrency',
})


module.exports = CurrencyRateModel;