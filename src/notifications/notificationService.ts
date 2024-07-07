// src/notifications/notificationService.ts
import { pool } from "../config/database";

class NotificationService {
    async sendNotification({ message, streets, adminId }: { message: string, streets: string[], adminId: number }) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const insertNotificationQuery = `
                INSERT INTO Notification (message, admin_id)
                VALUES ($1, $2)
                RETURNING id, message, created_at
            `;
            const notificationResult = await client.query(insertNotificationQuery, [message, adminId]);
            const notification = notificationResult.rows[0];

            for (const street of streets) {
                const insertNotificationStreetQuery = `
                    INSERT INTO NotificationStreet (notification_id, street_id)
                    SELECT $1, id FROM Street WHERE name = $2
                `;
                await client.query(insertNotificationStreetQuery, [notification.id, street]);
            }

            const getUsersQuery = `
                SELECT id FROM Users WHERE street = ANY($1::VARCHAR[])
            `;
            const usersResult = await client.query(getUsersQuery, [streets]);

            for (const user of usersResult.rows) {
                const insertUserNotificationQuery = `
                    INSERT INTO UserNotification (user_id, notification_id)
                    VALUES ($1, $2)
                `;
                await client.query(insertUserNotificationQuery, [user.id, notification.id]);
            }

            const insertNotificationHistoryQuery = `
                INSERT INTO NotificationHistory (notification_id, admin_id)
                VALUES ($1, $2)
            `;
            await client.query(insertNotificationHistoryQuery, [notification.id, adminId]);

            await client.query('COMMIT');
            return notification;
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error('Error sending notification');
        } finally {
            client.release();
        }
    }

    async getAllNotifications() {
        const client = await pool.connect();
        try {
            const query = 'SELECT id, message, created_at, admin_id FROM Notification';
            const result = await client.query(query);
            return result.rows;
        } finally {
            client.release();
        }
    }

    async getNotificationHistory(adminId: number) {
        const client = await pool.connect();
        try {
            const query = `
                SELECT nh.notification_id, n.message, nh.created_at, array_agg(s.name) AS streets
                FROM NotificationHistory nh
                JOIN Notification n ON nh.notification_id = n.id
                JOIN NotificationStreet ns ON nh.notification_id = ns.notification_id
                JOIN Street s ON ns.street_id = s.id
                WHERE nh.admin_id = $1
                GROUP BY nh.notification_id, n.message, nh.created_at
                ORDER BY nh.created_at DESC
            `;
            const result = await client.query(query, [adminId]);
            return result.rows;
        } finally {
            client.release();
        }
    }

    async getUserNotifications(userId: number) {
        const client = await pool.connect();
        try {
            const query = `
                SELECT un.notification_id, n.message, n.created_at, s.name AS street
                FROM UserNotification un
                JOIN Notification n ON un.notification_id = n.id
                JOIN NotificationStreet ns ON n.id = ns.notification_id
                JOIN Street s ON ns.street_id = s.id
                JOIN Users u ON un.user_id = u.id
                WHERE un.user_id = $1 AND s.name = u.street
                ORDER BY n.created_at DESC
            `;
            const result = await client.query(query, [userId]);
            return result.rows;
        } finally {
            client.release();
        }
    }
}

export const notificationService = new NotificationService();
