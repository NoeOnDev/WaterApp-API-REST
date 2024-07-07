"use strict";
// src/notifications/notificationController.ts
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
exports.notificationController = void 0;
const notificationService_1 = require("./notificationService");
class NotificationController {
    createNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { adminId, message } = req.body;
                const notification = yield notificationService_1.notificationService.createNotification({ adminId, message });
                res.status(201).json(notification);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.log('Error desconocido');
                    res.status(500).json({ error: 'Error desconocido' });
                }
            }
        });
    }
    getAdminNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Obtener adminId del token JWT
                if (!adminId) {
                    throw new Error('Admin ID not found in token');
                }
                const notifications = yield notificationService_1.notificationService.getAdminNotifications(adminId);
                res.status(200).json(notifications);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.log('Error desconocido');
                    res.status(500).json({ error: 'Error desconocido' });
                }
            }
        });
    }
}
exports.notificationController = new NotificationController();
