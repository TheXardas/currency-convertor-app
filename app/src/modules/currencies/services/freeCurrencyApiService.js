const axios = require('axios');
const {format, subYears, subDays} = require('date-fns');
const {LATEST_URL, HISTORY_URL, CURRENCIES_URL, API_DATE_FORMAT, API_KEY} = require("../constants/freeCurrencyApi");

async function fetchApi(url, params) {
    try {
        const res = await axios.get(url, { params: { apikey: API_KEY, ...params } });
        return res.data;
    } catch (e) {
        if (!e.response || !e.response.data) throw e;
        throw new Error(`${e.response.status} ${e.code} ${JSON.stringify(e.response.data)}`);
    }
}

exports.fetchCurrencies = async function() {
    const res = await fetchApi(CURRENCIES_URL);
    return Object.values(res.data);
};

exports.fetchLatest = async function(baseCurrencyCode) {
    const res = await fetchApi(LATEST_URL, {
        base_currency: baseCurrencyCode,
    });
    return res.data
};

exports.fetchLastYear = async function(baseCurrencyCode) {
    const now = new Date();
    const res = await fetchApi(HISTORY_URL, {
        date_from: format(subYears(now, 1), API_DATE_FORMAT),
        date_to: format(subDays(now, 1), API_DATE_FORMAT),
        base_currency: baseCurrencyCode,
    });
    return res.data;
};