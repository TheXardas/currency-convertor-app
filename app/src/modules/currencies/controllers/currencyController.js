const CurrencyRateModel = require('../models/CurrencyRateModel')
const CurrencyModel = require('../models/CurrencyModel');
const {RATES_HISTORY_TIMEFRAMES} = require("../constants/currency");
const asyncHandler = require('express-async-handler')

exports.currentRates = asyncHandler(async function(request, response) {
    const baseCurrency = await CurrencyModel.getBaseCurrency();
    const latest = await CurrencyRateModel.getLatest(baseCurrency, new Date());
    response.json(latest);
})

exports.history = asyncHandler(async function(request, response, next) {
    let { timeframe, target } = request.query;
    if (!Object.values(RATES_HISTORY_TIMEFRAMES).includes(timeframe)) {
        timeframe = RATES_HISTORY_TIMEFRAMES.MONTH;
    }
    if (!target) {
        response.status(400).json({ error: 'Target required. Please send currency code.' }).end();
        return;
    }

    const baseCurrency = await CurrencyModel.getBaseCurrency();
    const targetCurrency = await CurrencyModel.findOneCurrencyByCode(target);
    if (!targetCurrency) {
        response.status(400).json({ error: 'Target required. Please send currency code.'}).end();
        return;
    }

    const history = await CurrencyRateModel.getHistory(baseCurrency, timeframe, targetCurrency);
    const formattedHistory = {};
    history.forEach(h => {
        formattedHistory[h.end_time] = h.avg_val;
    });
    response.json(formattedHistory);
})
