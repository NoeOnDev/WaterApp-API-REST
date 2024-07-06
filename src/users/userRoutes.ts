// src/users/userRoutes.ts
import { Router } from 'express';
import { userController } from './userController';

const router = Router();

router.post('/register', userController.registerUser);
router.get('/', userController.getAllUsers);
router.post('/login', userController.loginUser);

export default router;
