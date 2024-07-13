// src/users/userErrors.ts
import { AppError } from "../errors/AppError";

export class InvalidCredentialsError extends AppError {
    constructor(details?: string) {
        super('Invalid email or password', 401, 'INVALID_CREDENTIALS', details);
    }
}

export class StreetNotFoundError extends AppError {
    constructor(street: string) {
        super(
            `La calle '${street}' no existe`,
            404,
            'STREET_NOT_FOUND',
            JSON.stringify({ street })
        );
    }
}

export class UserExistsError extends AppError {
    constructor(details?: string) {
        super('User already exists', 409, 'USER_EXISTS', details);
    }
}

export class UserNotFoundError extends AppError {
    constructor(userId: number) {
        super(
            `El usuario con ID '${userId}' no existe`,
            404,
            'USER_NOT_FOUND',
            JSON.stringify({ userId })
        );
    }
}

export class EmailNotFoundError extends AppError {
    constructor(email: string) {
        super(
            `El email '${email}' no existe`,
            404,
            'EMAIL_NOT_FOUND',
            JSON.stringify({ email })
        );
    }
}
