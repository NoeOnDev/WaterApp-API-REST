// src/notifications/notificationValidations.ts
import { body } from 'express-validator';

export const sendNotificationValidation = [
    body('message')
        .not().isEmpty().withMessage('Message cannot be empty')
        .isString().withMessage('Message must be a string')
        .isLength({ max: 500 }).withMessage('Message must not exceed 500 characters'),
    body('streets')
        .not().isEmpty().withMessage('Streets cannot be empty')
        .isArray().withMessage('Streets must be an array')
        .custom((streets: any[]) => streets.every((street: string) => typeof street === 'string' && street.length <= 20))
        .withMessage('Every street must be a string not longer than 20 characters'),
];
