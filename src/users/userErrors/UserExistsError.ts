// src/users/userErrors/UserExistsError.ts
import { AppError } from "../../errors/AppError";

export class UserExistsError extends AppError {
    constructor(details?: string) {
        super('User already exists', 409, 'USER_EXISTS', details);
    }
}
