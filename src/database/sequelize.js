import Sequelize from "sequelize";
import dbConfig from "../config/database.js";
import process from "process";

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    // Rest of the code...

    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        timezone: "+07:00",
        logging: process.env.DB_LOGGING === "true" ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
);

export default sequelize;
