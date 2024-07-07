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
exports.notificationController = void 0;
const notificationService_1 = require("./notificationService");
class NotificationController {
    sendNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, streets } = req.body;
                if (!req.user || req.user.role !== 'Admin') {
                    return res.sendStatus(403);
                }
                const adminId = req.user.id;
                const notification = yield notificationService_1.notificationService.sendNotification({ message, streets, adminId });
                res.status(201).json(notification);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(400).json({ error: 'Unknown error' });
                }
            }
            return; // Esto es necesario para que TypeScript no se queje
        });
    }
    getAllNotifications(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield notificationService_1.notificationService.getAllNotifications();
                res.status(200).json(notifications);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(400).json({ error: 'Unknown error' });
                }
            }
        });
    }
    getNotificationHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!adminId) {
                    return res.sendStatus(403);
                }
                const history = yield notificationService_1.notificationService.getNotificationHistory(adminId);
                res.status(200).json(history);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(400).json({ error: 'Unknown error' });
                }
            }
            return; // Esto es necesario para que TypeScript no se queje
        });
    }
    getUserNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return res.sendStatus(403);
                }
                const notifications = yield notificationService_1.notificationService.getUserNotifications(userId);
                res.status(200).json(notifications);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(400).json({ error: 'Unknown error' });
                }
            }
            return; // Esto es necesario para que TypeScript no se queje
        });
    }
}
exports.notificationController = new NotificationController();
