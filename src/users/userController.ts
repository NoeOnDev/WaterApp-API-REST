// src/users/userController.ts
import { Request, Response } from 'express';
import { userService } from './userService';

interface AuthRequest extends Request {
    user?: { id: number; username: string; role: string };
}

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

    async updateUsername(req: AuthRequest, res: Response) {
        try {
            const { newUsername } = req.body;
            const userId = req.user?.id;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }
            const updatedUser = await userService.updateUsername(userId, newUsername);
            res.status(200).json(updatedUser);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
        return; // Esto es necesario para que TypeScript no se queje
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

    async requestVerificationCode(req: Request, res: Response) {
        try {
            const { email } = req.body;
            await userService.generateVerificationCode(email);
            res.status(200).json({ message: 'Verification code sent' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }

    async verifyCode(req: Request, res: Response) {
        try {
            const { userId, code } = req.body;
            await userService.verifyCode(userId, code);
            res.status(200).json({ message: 'Code verified' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { userId, newPassword } = req.body;
            await userService.resetPassword(userId, newPassword);
            res.status(200).json({ message: 'Password reset successfully' });
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
