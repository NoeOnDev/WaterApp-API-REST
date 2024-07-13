"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = void 0;
// src/users/userErrors/InvalidCredentialsError.ts
const AppError_1 = require("../../errors/AppError");
class InvalidCredentialsError extends AppError_1.AppError {
    constructor(details) {
        super('Invalid email or password', 401, 'INVALID_CREDENTIALS', details);
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
