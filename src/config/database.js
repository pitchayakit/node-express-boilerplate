import dotenv from "dotenv";
import process from "process"; // Import the 'process' module
dotenv.config();

const { SITE_DB_HOST, SITE_DB_USER, SITE_DB_PASSWORD, SITE_DB_DATABASE } =
    process.env;

const dbConfig = {
    host: SITE_DB_HOST,
    username: SITE_DB_USER,
    password: SITE_DB_PASSWORD,
    database: SITE_DB_DATABASE,
    dialect: "mysql",
};

export default dbConfig;
