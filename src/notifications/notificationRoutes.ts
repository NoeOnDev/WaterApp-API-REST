// src/notifications/notificationRoutes.ts
import { Router } from 'express';
import { notificationController } from './notificationController';
import authenticateJWT from '../middlewares/authenticateJWT';

const router = Router();

router.post('/send', authenticateJWT, notificationController.sendNotification);

export default router;
