// src/middlewares/authenticateJWT.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface AuthRequest extends Request {
    user?: { id: number; username: string; role: string };
}

const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.sendStatus(401);
        return;
    }

    const secret = env.jwt.jwtSecret;
    if (!secret) {
        res.sendStatus(500);
        return;
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.sendStatus(403);
            return;
        }

        req.user = user as AuthRequest['user'];
        next();
    });
};

export default authenticateJWT;