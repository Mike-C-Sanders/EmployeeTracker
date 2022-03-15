//require sequelize package
const Sequelize = require('sequelize');
//require .env file to ensure password and db are called when running sequelize
require('dotenv').config();

//create a new instance of sequelize which logs into my sequelize/sql
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
);

module.exports = sequelize;