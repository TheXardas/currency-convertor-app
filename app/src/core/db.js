const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

// Test connection
sequelize.authenticate();

module.exports = sequelize;