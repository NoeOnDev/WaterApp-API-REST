"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationValidation = void 0;
// src/notifications/notificationValidations.ts
const express_validator_1 = require("express-validator");
exports.sendNotificationValidation = [
    (0, express_validator_1.body)('message')
        .not().isEmpty().withMessage('Message cannot be empty')
        .isString().withMessage('Message must be a string')
        .isLength({ max: 500 }).withMessage('Message must not exceed 500 characters'),
    (0, express_validator_1.body)('streets')
        .not().isEmpty().withMessage('Streets cannot be empty')
        .isArray().withMessage('Streets must be an array')
        .custom((streets) => streets.every((street) => typeof street === 'string' && street.length <= 20))
        .withMessage('Every street must be a string not longer than 20 characters'),
];
