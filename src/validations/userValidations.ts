// src/validations/userValidations.ts
import { body } from 'express-validator';

export const registerUserValidation = [
    body('username').isString().withMessage('Username must be a string'),
    body('street').isString().withMessage('Street must be a string'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
