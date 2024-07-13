"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreetNotFoundError = void 0;
// src/users/userErrors/StreetNotFoundError.ts
const AppError_1 = require("../../errors/AppError");
class StreetNotFoundError extends AppError_1.AppError {
    constructor(street) {
        super(`La calle '${street}' no existe`, 404, 'STREET_NOT_FOUND', JSON.stringify({ street }));
    }
}
exports.StreetNotFoundError = StreetNotFoundError;
