"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotFoundError = exports.UserNotFoundError = exports.UserExistsError = exports.StreetNotFoundError = exports.InvalidCredentialsError = void 0;
// src/users/userErrors.ts
const AppError_1 = require("../errors/AppError");
class InvalidCredentialsError extends AppError_1.AppError {
    constructor(details) {
        super('Invalid email or password', 401, 'INVALID_CREDENTIALS', details);
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
class StreetNotFoundError extends AppError_1.AppError {
    constructor(street) {
        super(`La calle '${street}' no existe`, 404, 'STREET_NOT_FOUND', JSON.stringify({ street }));
    }
}
exports.StreetNotFoundError = StreetNotFoundError;
class UserExistsError extends AppError_1.AppError {
    constructor(details) {
        super('User already exists', 409, 'USER_EXISTS', details);
    }
}
exports.UserExistsError = UserExistsError;
class UserNotFoundError extends AppError_1.AppError {
    constructor(userId) {
        super(`El usuario con ID '${userId}' no existe`, 404, 'USER_NOT_FOUND', JSON.stringify({ userId }));
    }
}
exports.UserNotFoundError = UserNotFoundError;
class EmailNotFoundError extends AppError_1.AppError {
    constructor(email) {
        super(`El email '${email}' no existe`, 404, 'EMAIL_NOT_FOUND', JSON.stringify({ email }));
    }
}
exports.EmailNotFoundError = EmailNotFoundError;
