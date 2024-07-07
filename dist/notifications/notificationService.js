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
const database_1 = require("../config/database");
class NotificationService {
    sendNotificationToStreet(adminId, message, street) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                yield client.query('BEGIN');
                // Insertar la notificación
                const insertNotificationQuery = `
                INSERT INTO Notification (message, admin_id)
                VALUES ($1, $2)
                RETURNING id
            `;
                const notificationResult = yield client.query(insertNotificationQuery, [message, adminId]);
                const notificationId = notificationResult.rows[0].id;
                // Obtener todos los usuarios de la calle especificada
                const selectUsersQuery = `
                SELECT id FROM Users WHERE street = $1
            `;
                const usersResult = yield client.query(selectUsersQuery, [street]);
                const users = usersResult.rows;
                // Asociar la notificación con los usuarios de la calle especificada
                const insertUserNotificationQuery = `
                INSERT INTO UserNotification (user_id, notification_id)
                VALUES ($1, $2)
            `;
                for (const user of users) {
                    yield client.query(insertUserNotificationQuery, [user.id, notificationId]);
                }
                yield client.query('COMMIT');
            }
            catch (error) {
                yield client.query('ROLLBACK');
                throw new Error('Error sending notification to users of the specified street');
            }
            finally {
                client.release();
            }
        });
    }
}
exports.notificationService = new NotificationService();
