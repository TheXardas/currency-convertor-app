const bcrypt = require('bcrypt');
const { DataTypes, Model, Op, QueryTypes} = require('sequelize');
const sequelize = require('../../../core/db');
const CurrencyModel = require("./CurrencyModel");
require('./relations');
const historySql = require('../sql/history.js');
const {RATES_HISTORY_TIMEFRAMES, TIMEFRAME_TO_DAY_INTERVAL_MAP} = require("../constants/currency");
const {subMonths} = require("date-fns");

class CurrencyRateModel extends Model {

    toJSON() {
        let values = Object.assign({}, this.get());

        values.from = values.BaseCurrency.code;
        values.to = values.TargetCurrency.code;
        values.id = values.from + values.to;

        delete values.TargetCurrency;
        delete values.BaseCurrency;
        delete values.createdAt;
        delete values.updatedAt;
        delete values.base_currency_id;
        delete values.target_currency_id;

        return values;
    }

    static async getLatest(baseCurrency, date = new Date()) {
        return await CurrencyRateModel.findAll({
            where: {
                base_currency_id: baseCurrency.id,
                date,
            },
            include: ['BaseCurrency', 'TargetCurrency'],
        })
    }

    static async getHistory(timeframe, targetCurrency) {
        return await sequelize.query(historySql, {
                replacements: {
                    number_of_days: TIMEFRAME_TO_DAY_INTERVAL_MAP[timeframe],
                    target_currency_id: targetCurrency.id,
                },
                type: QueryTypes.SELECT
            }
        )
    }

    static async prepareRates(rates, date, baseCurrency, currenciesByCode) {
        const newCurrencyRates = [];
        for (const [code, rate] of Object.entries(rates)) {
            const currencyInDb = currenciesByCode[code];
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
});
CurrencyRateModel.belongsTo(CurrencyModel, {
    foreignKey: {
        name: 'base_currency_id',
        allowNull: false,
    },
    as: 'BaseCurrency',
});

CurrencyModel.hasMany(CurrencyRateModel, {
    onDelete: 'CASCADE',
    foreignKey: {
        name: 'target_currency_id',
        allowNull: false,
    },
    as: 'TargetCurrencyRates',
});
CurrencyRateModel.belongsTo(CurrencyModel, {
    foreignKey: {
        name: 'target_currency_id',
        allowNull: false,
    },
    as: 'TargetCurrency',
});


module.exports = CurrencyRateModel;