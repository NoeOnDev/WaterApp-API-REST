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
                const { user } = req;
                if (!user || user.role !== 'Admin') {
                    return res.sendStatus(403);
                }
                const { message, street } = req.body;
                yield notificationService_1.notificationService.sendNotificationToStreet(user.id, message, street);
                return res.status(200).json({ message: 'Notification sent to users of the specified street successfully' });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.notificationController = new NotificationController();
