"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// src/config/env.ts
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.env = {
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
};
