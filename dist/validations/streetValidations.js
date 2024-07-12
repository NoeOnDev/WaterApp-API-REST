"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streetValidation = void 0;
// src/validations/streetValidations.ts
const express_validator_1 = require("express-validator");
exports.streetValidation = [
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
];
