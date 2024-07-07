// src/notifications/notificationRoutes.ts

import { Router } from 'express';
import authenticateJWT from '../middlewares/authenticateJWT';
import { notificationController } from './notificationController';

const router = Router();

router.post('/send', authenticateJWT, notificationController.sendNotification);

export default router;
