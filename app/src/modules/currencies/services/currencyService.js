const CurrencyModel = require('../models/CurrencyModel');

exports.saveCurrencies = async function(currencies) {
    const currencyModels = await CurrencyModel.bulkCreate(currencies, {
        ignoreDuplicates: true,
    });
}