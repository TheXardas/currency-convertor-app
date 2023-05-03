const dotenv = require('dotenv').config();
const freeCurrencyApiController = require("../src/modules/currencies/controllers/freeCurrencyApiController");

(async() => {
    await freeCurrencyApiController.loadCurrencies();
    await freeCurrencyApiController.loadLatest();
    await freeCurrencyApiController.loadLastYear();
})();