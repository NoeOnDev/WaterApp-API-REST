// src/users/userRoutes.ts
import { Router } from 'express';
import { userController } from './userController';

const router = Router();

router.post('/register', userController.registerUser);
router.get('/', userController.getAllUsers);
router.post('/login', userController.loginUser);

router.post('/request-verification-code', userController.requestVerificationCode);
router.post('/verify-code', userController.verifyCode);
router.post('/reset-password', userController.resetPassword);

export default router;
