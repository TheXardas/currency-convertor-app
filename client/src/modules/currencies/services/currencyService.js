import api from "../../core/services/api";

class CurrencyService {

    latest() {
        return api.get('currency/current-rates');
    }

    history(timeframe, baseCurrencyCode, targetCurrencyCode) {
        return api.get('currency/history', { searchParams: {
            timeframe,
            source: baseCurrencyCode,
            target: targetCurrencyCode
        }});
    }
}

const currencyService = new CurrencyService();
export default currencyService;