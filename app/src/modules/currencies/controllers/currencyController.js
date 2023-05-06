const CurrencyRateModel = require('../models/CurrencyRateModel');
const CurrencyModel = require('../models/CurrencyModel');
const {RATES_HISTORY_TIMEFRAMES} = require("../constants/currency");
const asyncHandler = require('express-async-handler');

exports.currencies = asyncHandler(async function(request, response) {
    const result = await CurrencyModel.findAll();
    response.json(result);
});

exports.currentRates = asyncHandler(async function(request, response) {
    const baseCurrency = await CurrencyModel.getBaseCurrency();
    if (!baseCurrency) return [];
    const latest = await CurrencyRateModel.getLatest(baseCurrency, new Date());

    const preparedRates = latest.map((r) => r.toJSON());
    const result = [];

    // Now we calculate reverse rates and add as new objects
    preparedRates.forEach(r => {
        result.push(r);
        const from = r.from;
        const to = r.to;
        if (to === from) return;
        result.push({
            ...r,
            from: to,
            to: from,
            rate: Math.floor((1 / r.rate) * 1000000) / 1000000,
            id: to + from,
        })
    });

    response.json(result);
});

exports.history = asyncHandler(async function(request, response, next) {
    let { timeframe, source, target } = request.query;
    if (!Object.values(RATES_HISTORY_TIMEFRAMES).includes(timeframe)) {
        timeframe = RATES_HISTORY_TIMEFRAMES.MONTH;
    }
    if (!target) return response.status(400).json({ error: 'Target required. Please send currency code.' }).end();
    if (!source) return response.status(400).json({ error: 'Source required. Please send currency code.' }).end();

    const baseCurrency = await CurrencyModel.getBaseCurrency();
    if (!baseCurrency) return response.json({});
    const sourceCurrency = await CurrencyModel.findOneCurrencyByCode(source);
    const targetCurrency = await CurrencyModel.findOneCurrencyByCode(target);
    if (!sourceCurrency) return response.status(400).json({ error: 'Source required. Please send currency code.'}).end();
    if (!targetCurrency) return response.status(400).json({ error: 'Target required. Please send currency code.'}).end();

    const history = await CurrencyRateModel.getHistory(timeframe, targetCurrency);

    if (sourceCurrency.code !== baseCurrency.code) {
        const sourceHistory = await CurrencyRateModel.getHistory(timeframe, sourceCurrency);
        for (const date in history) {
            history[date].avg_val = Math.floor((history[date].avg_val / sourceHistory[date].avg_val) * 1000000) / 1000000
        }
    }

    const formattedHistory = {};
    history.forEach(h => {
        formattedHistory[h.end_time] = h.avg_val.toString();
    });
    response.json(formattedHistory);
});
