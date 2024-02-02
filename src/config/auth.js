import dotenv from "dotenv";
import process from "process";
dotenv.config();

export const jwtKey = process.env.JWT_KEY;
