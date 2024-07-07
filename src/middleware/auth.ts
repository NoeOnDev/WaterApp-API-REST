// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: number;
    role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return; // Devuelve explícitamente aquí para asegurarte de que la función salga después de enviar la respuesta.
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret') as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.role !== 'Admin') {
        res.status(403).json({ error: 'Forbidden' });
        return; // Devuelve explícitamente aquí para asegurarte de que la función salga después de enviar la respuesta.
    }
    next(); // Devuelve next() aquí para indicar que puedes proceder con la siguiente función de middleware.
};
