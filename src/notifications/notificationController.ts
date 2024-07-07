// src/notifications/notificationController.ts
import { Request, Response } from 'express';
import { notificationService } from './notificationService';

interface AuthRequest extends Request {
    user?: { id: number; username: string; role: string };
}

class NotificationController {
    async sendNotification(req: AuthRequest, res: Response) {
        try {
            const { user } = req;
            if (!user || user.role !== 'Admin') {
                return res.sendStatus(403);
            }

            const { message, street } = req.body;
            await notificationService.sendNotificationToStreet(user.id, message, street);
            return res.status(200).json({ message: 'Notification sent to users of the specified street successfully' });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export const notificationController = new NotificationController();
