// src/config/env.ts
import { config } from "dotenv"

config()

export const env = {
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },
    jwt: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiration: process.env.JWT_EXPIRES_IN,
    },
    mailer: {
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
    },
}
