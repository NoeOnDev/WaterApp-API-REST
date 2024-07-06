"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/users/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("./userController");
const router = (0, express_1.Router)();
router.post('/register', userController_1.userController.registerUser);
router.get('/', userController_1.userController.getAllUsers);
router.post('/login', userController_1.userController.loginUser);
exports.default = router;
