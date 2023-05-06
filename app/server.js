'use strict';
const dotenv = require('dotenv').config();
const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const attachRoutes = require('./src/core/routes');
const authMiddleware = require('./src/modules/auth/middlewares/authMiddleware');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(authMiddleware);
app.set('etag', false);

attachRoutes(app);

app.listen(process.env.PORT, process.env.HOST);
console.log(`RUNNING ON http://${process.env.HOST}:${process.env.PORT}`);