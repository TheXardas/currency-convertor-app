'use strict'
const express = require('express')
const { Client } = require('pg')
const cors = require('cors');

const attachRoutes = require('./src/core/routes');

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('etag', false)

attachRoutes(app);

// FIXME
app.get('/', (req, res) => {
    const client = new Client(process.env.DATABASE_URL);
    client.connect();
    client.query('SELECT NOW()', (err, qres) => {
        res.send('Hello World App ' + qres.rows[0].now);
        client.end();
    });
});

app.listen(process.env.PORT, process.env.HOST);
console.log(`RUNNING ON http://${process.env.HOST}:${process.env.PORT}`);