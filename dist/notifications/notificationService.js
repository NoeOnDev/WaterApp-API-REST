"use strict";
// src/notifications/notificationService.ts
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
const database_1 = require("../config/database");
class NotificationService {
    createNotification(_a) {
        return __awaiter(this, arguments, void 0, function* ({ adminId, message }) {
            const client = yield database_1.pool.connect();
            try {
                yield client.query('BEGIN');
                const adminQuery = 'SELECT role FROM Users WHERE id = $1';
                const adminResult = yield client.query(adminQuery, [adminId]);
                if (adminResult.rows.length === 0 || adminResult.rows[0].role !== 'Admin') {
                    throw new Error('Only admins can send notifications');
                }
                const insertNotificationQuery = `
                INSERT INTO Notification (message, admin_id)
                VALUES ($1, $2)
                RETURNING id, message, created_at, admin_id
            `;
                const result = yield client.query(insertNotificationQuery, [message, adminId]);
                const newNotification = result.rows[0];
                const insertHistoryQuery = `
                INSERT INTO NotificationHistory (notification_id, admin_id)
                VALUES ($1, $2)
                RETURNING id, notification_id, admin_id, created_at
            `;
                const historyResult = yield client.query(insertHistoryQuery, [newNotification.id, adminId]);
                historyResult.rows[0];
                yield client.query('COMMIT');
                return newNotification;
            }
            catch (error) {
                yield client.query('ROLLBACK');
                throw new Error('Error creating notification');
            }
            finally {
                client.release();
            }
        });
    }
    getAdminNotifications(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                const query = `
                SELECT nh.notification_id, n.message, nh.created_at
                FROM NotificationHistory nh
                INNER JOIN Notification n ON nh.notification_id = n.id
                WHERE nh.admin_id = $1
                ORDER BY nh.created_at DESC
            `;
                const result = yield client.query(query, [adminId]);
                return result.rows;
            }
            catch (error) {
                throw new Error('Error fetching admin notifications');
            }
            finally {
                client.release();
            }
        });
    }
}
exports.notificationService = new NotificationService();
