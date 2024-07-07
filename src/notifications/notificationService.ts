// src/notifications/notificationService.ts
import { pool } from '../config/database';

class NotificationService {
    async sendNotificationToStreet(adminId: number, message: string, street: string) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const insertNotificationQuery = `
                INSERT INTO Notification (message, admin_id)
                VALUES ($1, $2)
                RETURNING id
            `;
            const notificationResult = await client.query(insertNotificationQuery, [message, adminId]);
            const notificationId = notificationResult.rows[0].id;

            const selectUsersQuery = `
                SELECT id FROM Users WHERE street = $1
            `;
            const usersResult = await client.query(selectUsersQuery, [street]);
            const users = usersResult.rows;

            const insertUserNotificationQuery = `
                INSERT INTO UserNotification (user_id, notification_id)
                VALUES ($1, $2)
            `;
            for (const user of users) {
                await client.query(insertUserNotificationQuery, [user.id, notificationId]);
            }

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error('Error sending notification to users of the specified street');
        } finally {
            client.release();
        }
    }
}

export const notificationService = new NotificationService();
