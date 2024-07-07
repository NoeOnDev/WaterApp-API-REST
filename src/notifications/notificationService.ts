// src/notifications/notificationService.ts

import { pool } from '../config/database';

interface CreateNotificationDto {
    adminId: number;
    message: string;
}

class NotificationService {
    async createNotification({ adminId, message }: CreateNotificationDto) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const adminQuery = 'SELECT role FROM Users WHERE id = $1';
            const adminResult = await client.query(adminQuery, [adminId]);

            if (adminResult.rows.length === 0 || adminResult.rows[0].role !== 'Admin') {
                throw new Error('Only admins can send notifications');
            }

            const insertNotificationQuery = `
                INSERT INTO Notification (message, admin_id)
                VALUES ($1, $2)
                RETURNING id, message, created_at, admin_id
            `;
            const result = await client.query(insertNotificationQuery, [message, adminId]);
            const newNotification = result.rows[0];

            const insertHistoryQuery = `
                INSERT INTO NotificationHistory (notification_id, admin_id)
                VALUES ($1, $2)
                RETURNING id, notification_id, admin_id, created_at
            `;
            const historyResult = await client.query(insertHistoryQuery, [newNotification.id, adminId]);
            historyResult.rows[0];

            await client.query('COMMIT');

            return newNotification;
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error('Error creating notification');
        } finally {
            client.release();
        }
    }

    async getAdminNotifications(adminId: number) {
        const client = await pool.connect();
        try {
            const query = `
                SELECT nh.notification_id, n.message, nh.created_at
                FROM NotificationHistory nh
                INNER JOIN Notification n ON nh.notification_id = n.id
                WHERE nh.admin_id = $1
                ORDER BY nh.created_at DESC
            `;
            const result = await client.query(query, [adminId]);
            return result.rows;
        } catch (error) {
            throw new Error('Error fetching admin notifications');
        } finally {
            client.release();
        }
    }
}

export const notificationService = new NotificationService();
