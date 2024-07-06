// src/streets/streetRoutes.ts
import { Router } from 'express';
import { streetController } from './streetController';

const router = Router();

router.post('/create', streetController.createStreet);
router.get('/', streetController.getAllStreets);

export default router;
