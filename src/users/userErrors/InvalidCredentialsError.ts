// src/users/userErrors/InvalidCredentialsError.ts
import { AppError } from "../../errors/AppError";

export class InvalidCredentialsError extends AppError {
    constructor(details?: string) {
        super('Invalid email or password', 401, 'INVALID_CREDENTIALS', details);
    }
}
