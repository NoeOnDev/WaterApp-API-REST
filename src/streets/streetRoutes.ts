// src/streets/streetRoutes.ts
import { Router } from 'express';
import { streetValidation } from '../validations/streetValidations';
import { handleValidationErrors } from '../middlewares/handleValidationErrors';
import { streetController } from './streetController';

const router = Router();

router.post('/create', streetValidation, handleValidationErrors, streetController.createStreet);
router.get('/', streetController.getAllStreets);

export default router;
