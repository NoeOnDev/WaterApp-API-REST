// src/validations/streetValidations.ts
import { body } from 'express-validator';

export const streetValidation = [
    body('name')
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
