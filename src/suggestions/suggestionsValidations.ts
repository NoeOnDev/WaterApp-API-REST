// src/suggestions/suggestionsValidations.ts
import { body } from 'express-validator';

export const suggestionValidation = [
    body('message')
        .not()
        .isEmpty()
        .withMessage('Suggestion cannot be empty')
        .isLength({ min: 3, max: 100 })
        .withMessage('Suggestion must be between 3 and 100 characters long')
        .isString()
        .withMessage('Suggestion must be a string'),
];