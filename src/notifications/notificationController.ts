// src/notifications/notificationController.ts
import { Request, Response } from 'express';
import { notificationService } from './notificationService';

interface AuthRequest extends Request {
    user?: { id: number; username: string; role: string };
}

class NotificationController {
    async sendNotification(req: AuthRequest, res: Response): Promise<void> {
        try {
            const { message, streets } = req.body;
            if (!req.user || req.user.role !== 'Admin') {
                res.sendStatus(403);
                return;
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

    async getNotificationHistory(req: AuthRequest, res: Response): Promise<void> {
        try {
            const adminId = req.user?.id;
            if (!adminId) {
                res.sendStatus(403);
                return;
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
    }

    async getUserNotifications(req: AuthRequest, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.sendStatus(403);
                return;
            }
            const notifications = await notificationService.getUserNotifications(userId);
            res.status(200).json(notifications);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }
}

export const notificationController = new NotificationController();
