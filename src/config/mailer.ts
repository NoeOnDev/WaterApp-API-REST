// src/config/mailer.ts
import nodemailer from 'nodemailer';
import { env } from './env';

export const transporter = nodemailer.createTransport({
    host: env.mailer.host,
    port: Number(env.mailer.port),
    secure: true,
    auth: {
        user: env.mailer.user,
        pass: env.mailer.pass,
    },
});
