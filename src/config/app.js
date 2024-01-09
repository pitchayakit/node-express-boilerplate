import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT || 3000;
export const env = process.env.NODE_ENV || 'development';