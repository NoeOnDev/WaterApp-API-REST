// src/users/userController.ts
import { Request, Response } from 'express';
import { userService } from './userService';

class UserController {
    async registerUser(req: Request, res: Response) {
        try {
            const { username, street, email, password } = req.body;
            const user = await userService.registerUser({ username, street, email, password });
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }

    async getAllUsers(_req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { token, user } = await userService.loginUser({ email, password });
            res.status(200).json({ token, user });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }
}

export const userController = new UserController();
