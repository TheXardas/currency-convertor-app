const sequelize = require('../../../core/db');
const freeCurrencyApiService = require('../services/freeCurrencyApiService')
const CurrencyRateModel = require("../models/CurrencyRateModel");
const CurrencyModel = require('../models/CurrencyModel');

exports.loadCurrencies = async function() {
    const currencies = await freeCurrencyApiService.fetchCurrencies();
    return await CurrencyModel.saveCurrencies(currencies);
}

exports.loadLatest = async function() {
    const baseCurrency = await CurrencyModel.getBaseCurrency();
    const latest = await freeCurrencyApiService.fetchLatest(baseCurrency.code);
    await CurrencyRateModel.saveLatest(latest, baseCurrency);
}

exports.loadLastYear = async function() {
    const baseCurrency = await CurrencyModel.getBaseCurrency();
    const history = await freeCurrencyApiService.fetchLastYear(baseCurrency.code);
    await CurrencyRateModel.saveHistory(history, baseCurrency);
}