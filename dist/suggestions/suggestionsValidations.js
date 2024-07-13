"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestionValidation = void 0;
// src/suggestions/suggestionsValidations.ts
const express_validator_1 = require("express-validator");
exports.suggestionValidation = [
    (0, express_validator_1.body)('message')
        .not()
        .isEmpty()
        .withMessage('Suggestion cannot be empty')
        .isLength({ min: 3, max: 100 })
        .withMessage('Suggestion must be between 3 and 100 characters long')
        .isString()
        .withMessage('Suggestion must be a string'),
];
