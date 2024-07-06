"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/streets/streetRoutes.ts
const express_1 = require("express");
const streetController_1 = require("./streetController");
const router = (0, express_1.Router)();
router.post('/create', streetController_1.streetController.createStreet);
router.get('/', streetController_1.streetController.getAllStreets);
exports.default = router;
