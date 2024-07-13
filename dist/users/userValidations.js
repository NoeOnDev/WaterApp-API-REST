"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserValidation = void 0;
// src/users/userValidations.ts
const express_validator_1 = require("express-validator");
exports.registerUserValidation = [
    (0, express_validator_1.body)('username')
        .not()
        .isEmpty()
        .withMessage('Username cannot be empty')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters long')
        .isString()
        .withMessage('Username must be a string')
        .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('Username must only contain letters and spaces'),
    (0, express_validator_1.body)('street')
        .not()
        .isEmpty()
        .withMessage('Street cannot be empty')
        .isLength({ min: 3, max: 20 })
        .withMessage('Street must be between 3 and 20 characters long')
        .isString()
        .withMessage('Street must be a string')
        .matches(/^[A-Z\s]+$/)
        .withMessage('Street must be in uppercase letters only'),
    (0, express_validator_1.body)('email')
        .not()
        .isEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Email must be valid')
        .isLength({ max: 40 })
        .withMessage('Email must not be longer than 40 characters'),
    (0, express_validator_1.body)('password')
        .not()
        .isEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 6, max: 50 })
        .withMessage('Password must be between 6 and 50 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[\W_]/)
        .withMessage('Password must contain at least one special character'),
];
