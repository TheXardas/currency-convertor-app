const dotenv = require('dotenv').config()

const sequelize = require('../src/core/db');
const UserModel = require('../src/modules/auth/models/UserModel');
require('../src/modules/currencies/models/CurrencyModel');
require('../src/modules/currencies/models/relations');

(async () => {
    try {
        await sequelize.sync({ alter: true });
        await UserModel.bulkCreate([{
            name: 'Axel Foley',
            login: 'user',
            password: '12345',
        }], {
            ignoreDuplicates: true
        })
        console.log('All Done! Models synchronized');
    } catch (e) {
        console.log('FAIL: migration has shown following error:');
        console.error(e);
    }
})();