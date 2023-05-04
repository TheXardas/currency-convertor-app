import {BASE_CURRENCY_CODE} from "../constants/currencies";

/**
 * Here we calculate rate for pair of currencies, from rates that we have from api.
 * Api uses currency with BASE_CURRENCY_CODE for source.
 * So, if source is different, we need to calculate rate ourselves.
 * That is done by division of two rates.
 * i.e. if base currency is USD:
 * EUR=>RUB = USD=>RUB / USD=>EUR
 *
 * @param rates
 * @param baseCurrencyCode
 * @param targetCurrencyCode
 * @returns {number}
 */
export default function findRate(rates, baseCurrencyCode, targetCurrencyCode) {
    let rate;
    if (rates) {
        if (baseCurrencyCode === BASE_CURRENCY_CODE) rate = rates.find(r => r.from === baseCurrencyCode && r.to === targetCurrencyCode).rate;
        if (baseCurrencyCode !== BASE_CURRENCY_CODE) {
            const from = rates.find(r => r.from === BASE_CURRENCY_CODE && r.to === baseCurrencyCode);
            const to = rates.find(r => r.from === BASE_CURRENCY_CODE && r.to === targetCurrencyCode);
            rate = Math.floor((to.rate / from.rate) * 1000000) / 1000000;
        }
    }
    return rate;
}