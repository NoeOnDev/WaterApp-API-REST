"use strict";
// src/notifications/notificationRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateJWT_1 = __importDefault(require("../middlewares/authenticateJWT"));
const notificationController_1 = require("./notificationController");
const router = (0, express_1.Router)();
router.post('/send', authenticateJWT_1.default, notificationController_1.notificationController.sendNotification);
exports.default = router;
