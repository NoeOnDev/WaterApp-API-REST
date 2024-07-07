// src/notifications/notificationRoutes.ts
import { Router } from 'express';
import { notificationController } from './notificationController';
import authenticateJWT from '../middlewares/authenticateJWT';

const router = Router();

router.post('/send', authenticateJWT, notificationController.sendNotification);
router.get('/', authenticateJWT, notificationController.getAllNotifications);
router.get('/history', authenticateJWT, notificationController.getNotificationHistory);
router.get('/user', authenticateJWT, notificationController.getUserNotifications);

export default router;
