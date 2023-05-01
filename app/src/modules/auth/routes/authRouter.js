const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.use("/login", authController.login);
authRouter.use("/currentUser", authController.currentUser);

module.exports = authRouter;