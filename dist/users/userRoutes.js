"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/users/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("./userController");
const userValidations_1 = require("../validations/userValidations");
const handleValidationErrors_1 = require("../middlewares/handleValidationErrors");
const authenticateJWT_1 = __importDefault(require("../middlewares/authenticateJWT"));
const router = (0, express_1.Router)();
router.post('/register', userValidations_1.registerUserValidation, handleValidationErrors_1.handleValidationErrors, userController_1.userController.registerUser);
router.get('/', userController_1.userController.getAllUsers);
router.patch('/update-username', authenticateJWT_1.default, userController_1.userController.updateUsername);
router.post('/login', userController_1.userController.loginUser);
router.post('/request-verification-code', userController_1.userController.requestVerificationCode);
router.post('/verify-code', userController_1.userController.verifyCode);
router.post('/reset-password', userController_1.userController.resetPassword);
exports.default = router;
