"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
// src/notifications/notificationService.ts
const database_1 = require("../config/database");
class NotificationService {
    sendNotification(_a) {
        return __awaiter(this, arguments, void 0, function* ({ message, streets, adminId }) {
            const client = yield database_1.pool.connect();
            try {
                yield client.query('BEGIN');
                const insertNotificationQuery = `
                INSERT INTO Notification (message, admin_id)
                VALUES ($1, $2)
                RETURNING id, message, created_at
            `;
                const notificationResult = yield client.query(insertNotificationQuery, [message, adminId]);
                const notification = notificationResult.rows[0];
                for (const street of streets) {
                    const insertNotificationStreetQuery = `
                    INSERT INTO NotificationStreet (notification_id, street_id)
                    SELECT $1, id FROM Street WHERE name = $2
                `;
                    yield client.query(insertNotificationStreetQuery, [notification.id, street]);
                }
                const getUsersQuery = `
                SELECT id FROM Users WHERE street = ANY($1::VARCHAR[])
            `;
                const usersResult = yield client.query(getUsersQuery, [streets]);
                for (const user of usersResult.rows) {
                    const insertUserNotificationQuery = `
                    INSERT INTO UserNotification (user_id, notification_id)
                    VALUES ($1, $2)
                `;
                    yield client.query(insertUserNotificationQuery, [user.id, notification.id]);
                }
                const insertNotificationHistoryQuery = `
                INSERT INTO NotificationHistory (notification_id, admin_id)
                VALUES ($1, $2)
            `;
                yield client.query(insertNotificationHistoryQuery, [notification.id, adminId]);
                yield client.query('COMMIT');
                return notification;
            }
            catch (error) {
                yield client.query('ROLLBACK');
                throw new Error('Error sending notification');
            }
            finally {
                client.release();
            }
        });
    }
    getAllNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                const query = 'SELECT id, message, created_at, admin_id FROM Notification';
                const result = yield client.query(query);
                return result.rows;
            }
            finally {
                client.release();
            }
        });
    }
    getNotificationHistory(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
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
                const result = yield client.query(query, [adminId]);
                return result.rows;
            }
            finally {
                client.release();
            }
        });
    }
    getUserNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
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
                const result = yield client.query(query, [userId]);
                return result.rows;
            }
            finally {
                client.release();
            }
        });
    }
}
exports.notificationService = new NotificationService();
