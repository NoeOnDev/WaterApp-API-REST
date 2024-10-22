// src/users/userRoutes.ts
import { Router } from 'express';
import { userController } from './userController';
import { registerUserValidation } from './userValidations';
import { handleValidationErrors } from '../middlewares/handleValidationErrors';
import authenticateJWT from '../middlewares/authenticateJWT';

const router = Router();

router.post('/register', registerUserValidation, handleValidationErrors, userController.registerUser);
router.get('/', userController.getAllUsers);
router.patch('/update-username', authenticateJWT, userController.updateUsername);
router.post('/login', userController.loginUser);

router.post('/request-verification-code', userController.requestVerificationCode);
router.post('/verify-code', userController.verifyCode);
router.post('/reset-password', userController.resetPassword);

export default router;
