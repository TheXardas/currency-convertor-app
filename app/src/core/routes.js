const authRouter = require('../modules/auth/routes/authRouter');
const currencyRouter = require('../modules/currencies/routes/currencyRouter');

function attachRoutes(app) {
    // App routes
    app.use('/auth', authRouter);
    app.use('/currency', currencyRouter);

    // System routes
    app.get('*', function(req, res){
        if (!res.headersSent) {
            res.status(404).json({ code: 404, error: 'Unknown Route' });
        }
    });
    app.use(function (err, req, res, next) {
        console.error(err.message, err.stack)
        res.status(500).json({ code: 500, error: 'Server Error' });
    })
}

module.exports = attachRoutes;