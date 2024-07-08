"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
// src/config/mailer.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("./env");
exports.transporter = nodemailer_1.default.createTransport({
    host: env_1.env.mailer.host,
    port: Number(env_1.env.mailer.port),
    secure: true,
    auth: {
        user: env_1.env.mailer.user,
        pass: env_1.env.mailer.pass,
    },
});
