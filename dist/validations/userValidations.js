"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserValidation = void 0;
// src/validations/userValidations.ts
const express_validator_1 = require("express-validator");
exports.registerUserValidation = [
    (0, express_validator_1.body)('username').isString().withMessage('Username must be a string'),
    (0, express_validator_1.body)('street').isString().withMessage('Street must be a string'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email must be valid'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
