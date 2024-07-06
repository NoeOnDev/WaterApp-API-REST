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
                console.log(error.message);
            } else {
                console.log('Error desconocido');
            }
        }
    }

    async getAllUsers(_req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('Error desconocido');
            }
        }
    }
    
    async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await userService.loginUser({ email, password });
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('Error desconocido');
            }
        }
    }
}

export const userController = new UserController();
