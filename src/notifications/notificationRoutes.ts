// src/notifications/notificationRoutes.ts

import { Router } from 'express';
import { notificationController } from './notificationController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = Router();

router.post('/create', authenticate, authorizeAdmin, notificationController.createNotification);
router.get('/admin', authenticate, authorizeAdmin, notificationController.getAdminNotifications);

export default router;
