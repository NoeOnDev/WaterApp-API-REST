"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/notifications/notificationRoutes.ts
const express_1 = require("express");
const notificationController_1 = require("./notificationController");
const notificationValidations_1 = require("./notificationValidations");
const handleValidationErrors_1 = require("../middlewares/handleValidationErrors");
const authenticateJWT_1 = __importDefault(require("../middlewares/authenticateJWT"));
const router = (0, express_1.Router)();
router.post('/send', notificationValidations_1.sendNotificationValidation, handleValidationErrors_1.handleValidationErrors, authenticateJWT_1.default, notificationController_1.notificationController.sendNotification);
router.get('/', authenticateJWT_1.default, notificationController_1.notificationController.getAllNotifications);
router.get('/history', authenticateJWT_1.default, notificationController_1.notificationController.getNotificationHistory);
router.get('/user', authenticateJWT_1.default, notificationController_1.notificationController.getUserNotifications);
exports.default = router;
