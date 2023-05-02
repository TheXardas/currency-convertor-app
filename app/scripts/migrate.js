const sequelize = require('../src/core/db');
const User = require('../src/modules/auth/models/userModel');
require('../src/modules/currencies/models/currencyRate');

(async () => {
    await sequelize.sync();
    User.create({
        name: 'Axel Foley',
        login: 'user',
        password: '12345',
    })

    // TODO Indexes!!
})();