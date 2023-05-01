
exports.currentRates = function(request, response) {
    response.json('Current currency rates');
}

exports.history = function(request, response) {
    response.json('Currency history data');
}