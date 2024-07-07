"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/suggestions/suggestionRoutes.ts
const express_1 = require("express");
const suggestionController_1 = require("./suggestionController");
const router = (0, express_1.Router)();
router.post('/create', suggestionController_1.suggestionController.createSuggestion);
router.get('/', suggestionController_1.suggestionController.getAllSuggestions);
router.delete('/:id', suggestionController_1.suggestionController.deleteSuggestion);
exports.default = router;
