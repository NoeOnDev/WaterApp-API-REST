// src/middlewares/authenticateJWT.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface AuthRequest extends Request {
    user?: any;
}

const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    const secret = env.jwt.jwtSecret;
    if (!secret) {
        return res.sendStatus(500);
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        return next();
    });

    return undefined;
};

export default authenticateJWT;
