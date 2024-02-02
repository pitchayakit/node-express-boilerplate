import dotenv from "dotenv";
import process from "process";
dotenv.config();

export const port = process.env.PORT || 3000;
export const env = process.env.NODE_ENV || "development";
export const appKey = process.env.APP_KEY;
