const dotenv = require('dotenv').config()

const sequelize = require('../src/core/db');
const UserModel = require('../src/modules/auth/models/UserModel');
const CurrencyModel = require('../src/modules/currencies/models/CurrencyModel');
require('../src/modules/currencies/models/CurrencyRateModel');
require('../src/modules/currencies/models/relations');
const bcrypt = require("bcrypt");

(async () => {
    try {
        await sequelize.sync({ alter: true });
        await UserModel.bulkCreate([{
            name: 'Axel Foley',
            login: 'user',
            // we have to hash manually here, because we'll have to use individualHooks: true.
            // and that breaks ignoreDuplicates (see sequelize github), which could lead to error.
            password: await bcrypt.hash('12345', await bcrypt.genSalt(8)),
        }], {
            ignoreDuplicates: true,
        })
        console.log('All Done! Models synchronized');
    } catch (e) {
        console.log('FAIL: migration has shown following error:');
        console.error(e);
    }
})();