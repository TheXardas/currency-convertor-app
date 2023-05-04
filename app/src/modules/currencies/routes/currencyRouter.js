const express = require('express');
const currencyController = require('../controllers/currencyController');

const currencyRouter = express.Router();

currencyRouter.use("/currencies", currencyController.currencies);
currencyRouter.use("/current-rates", currencyController.currentRates);
currencyRouter.use("/history", currencyController.history);

module.exports = currencyRouter;