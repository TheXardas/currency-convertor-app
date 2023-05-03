const freeCurrencyApiService = require('../services/freeCurrencyApiService')
const currencyService = require('../services/currencyService')

exports.loadCurrencies = async function() {
    const currencies = await freeCurrencyApiService.fetchCurrencies();
    return await currencyService.saveCurrencies(currencies);
}

exports.loadLatest = async function() {
    console.log('latest');
    //const latest = await freeCurrencyApiService.fetchLatest();
}

exports.loadLastYear = async function() {
    console.log('last year');
    //const history = await freeCurrencyApiService.fetchLastYear();
}