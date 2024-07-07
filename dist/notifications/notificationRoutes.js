"use strict";
// src/notifications/notificationRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationController_1 = require("./notificationController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/create', auth_1.authenticate, auth_1.authorizeAdmin, notificationController_1.notificationController.createNotification);
router.get('/admin', auth_1.authenticate, auth_1.authorizeAdmin, notificationController_1.notificationController.getAdminNotifications);
exports.default = router;
