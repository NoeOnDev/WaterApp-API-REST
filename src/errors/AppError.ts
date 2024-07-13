// src/errors/AppError.ts
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly errorCode: string;
    public readonly details?: string;

    constructor(message: string, statusCode = 400, errorCode = 'APP_ERROR', details?: string) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }
}
