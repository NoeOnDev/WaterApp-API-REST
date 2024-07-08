"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationCode = void 0;
// src/users/emailService.ts
const mailer_1 = require("../config/mailer");
const env_1 = require("../config/env");
const sendVerificationCode = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: env_1.env.mailer.user,
        to: email,
        subject: 'Password Reset Verification Code',
        text: `Your verification code is: ${code}`,
    };
    try {
        yield mailer_1.transporter.sendMail(mailOptions);
        console.log('Email sent');
    }
    catch (error) {
        console.log('Error sending email', error);
    }
});
exports.sendVerificationCode = sendVerificationCode;
