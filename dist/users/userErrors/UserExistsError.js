"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistsError = void 0;
// src/users/userErrors/UserExistsError.ts
const AppError_1 = require("../../errors/AppError");
class UserExistsError extends AppError_1.AppError {
    constructor(details) {
        super('User already exists', 409, 'USER_EXISTS', details);
    }
}
exports.UserExistsError = UserExistsError;
