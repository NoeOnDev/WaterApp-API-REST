// src/users/userErrors/StreetNotFoundError.ts
import { AppError } from '../../errors/AppError';

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
