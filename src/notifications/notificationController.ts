// src/notifications/notificationController.ts

import { Request, Response } from 'express';
import { notificationService } from './notificationService';

class NotificationController {
    async createNotification(req: Request, res: Response) {
        try {
            const { adminId, message } = req.body;
            const notification = await notificationService.createNotification({ adminId, message });
            res.status(201).json(notification);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ error: error.message });
            } else {
                console.log('Error desconocido');
                res.status(500).json({ error: 'Error desconocido' });
            }
        }
    }

    async getAdminNotifications(req: Request, res: Response) {
        try {
            const adminId = req.user?.userId; // Obtener adminId del token JWT
            if (!adminId) {
                throw new Error('Admin ID not found in token');
            }

            const notifications = await notificationService.getAdminNotifications(adminId);
            res.status(200).json(notifications);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(400).json({ error: error.message });
            } else {
                console.log('Error desconocido');
                res.status(500).json({ error: 'Error desconocido' });
            }
        }
    }
}

export const notificationController = new NotificationController();
