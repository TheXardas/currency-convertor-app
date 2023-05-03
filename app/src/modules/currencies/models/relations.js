const CurrencyModel = require('./CurrencyModel');
const CurrencyRateModel = require('./CurrencyRateModel');

CurrencyModel.hasMany(CurrencyRateModel, {
    onDelete: 'CASCADE',
    foreignKey: 'base_currency_id',
    as: 'BaseCurrencyRates',
})
CurrencyRateModel.belongsTo(CurrencyModel, {
    foreignKey: 'base_currency_id',
    as: 'BaseCurrency',
})

CurrencyModel.hasMany(CurrencyRateModel, {
    onDelete: 'CASCADE',
    foreignKey: 'target_currency_id',
    as: 'TargetCurrencyRates',
})
CurrencyRateModel.belongsTo(CurrencyModel, {
    foreignKey: 'target_currency_id',
    as: 'TargetCurrency',
})
