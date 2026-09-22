import dotenv from "dotenv";

dotenv.config();

export const configs = {
    APP_PORT: process.env.APP_PORT || 3001,
    APP_HOST: process.env.APP_HOST,

    MONGO_URL: process.env.MONGO_URL,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION as string,

    SMTP_EMAIL: process.env.SMTP_EMAIL as string,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD as string,
};
