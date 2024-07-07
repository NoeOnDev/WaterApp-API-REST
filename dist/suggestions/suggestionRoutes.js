"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/suggestions/suggestionRoutes.ts
const express_1 = require("express");
const suggestionController_1 = require("./suggestionController");
const authenticateJWT_1 = __importDefault(require("../middlewares/authenticateJWT"));
const router = (0, express_1.Router)();
router.post('/create', authenticateJWT_1.default, suggestionController_1.suggestionController.createSuggestion);
router.get('/', authenticateJWT_1.default, suggestionController_1.suggestionController.getAllSuggestions);
router.delete('/:id', authenticateJWT_1.default, suggestionController_1.suggestionController.deleteSuggestion);
exports.default = router;
