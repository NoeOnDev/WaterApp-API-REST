// src/notifications/notificationController.ts
import { Request, Response } from 'express';
import { notificationService } from './notificationService';

interface AuthRequest extends Request {
    user?: { id: number; username: string; role: string };
}

class NotificationController {
    async sendNotification(req: AuthRequest, res: Response) {
        try {
            const { message, streets } = req.body;
            if (!req.user || req.user.role !== 'Admin') {
                return res.sendStatus(403);
            }
            const adminId = req.user.id;
            const notification = await notificationService.sendNotification({ message, streets, adminId });
            res.status(201).json(notification);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
        return; // Esto es necesario para que TypeScript no se queje
    }

    async getAllNotifications(_req: AuthRequest, res: Response) {
        try {
            const notifications = await notificationService.getAllNotifications();
            res.status(200).json(notifications);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }

    async getNotificationHistory(req: AuthRequest, res: Response) {
        try {
            const adminId = req.user?.id;
            if (!adminId) {
                return res.sendStatus(403);
            }
            const history = await notificationService.getNotificationHistory(adminId);
            res.status(200).json(history);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
        return; // Esto es necesario para que TypeScript no se queje
    }
}

export const notificationController = new NotificationController();
