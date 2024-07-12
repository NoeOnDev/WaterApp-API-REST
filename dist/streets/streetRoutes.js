"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/streets/streetRoutes.ts
const express_1 = require("express");
const streetValidations_1 = require("../validations/streetValidations");
const handleValidationErrors_1 = require("../middlewares/handleValidationErrors");
const streetController_1 = require("./streetController");
const router = (0, express_1.Router)();
router.post('/create', streetValidations_1.streetValidation, handleValidationErrors_1.handleValidationErrors, streetController_1.streetController.createStreet);
router.get('/', streetController_1.streetController.getAllStreets);
exports.default = router;
