require("dotenv").config();
const Sequelize = require('sequelize');
const dbConfig = require('../../config/database');
const dbUtil = require('../utils/db');

// const dbConfig = DbContext.getDbConfig();
const sequelize = new Sequelize(
    dbConfig.database, 
    dbConfig.username, 
    dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        timezone: "+07:00",
        logging: process.env.DB_LOGGING == 'true' ? true : false
    }
)
const op = Sequelize.Op

module.exports = {
    sequelize,
    Sequelize,
    op,
    dbUtil
}
