// src/suggestions/suggestionRoutes.ts
import { Router } from 'express';
import { suggestionController } from './suggestionController';
import { suggestionValidation } from '../validations/suggestionsValidations';
import { handleValidationErrors } from '../middlewares/handleValidationErrors';
import authenticateJWT from '../middlewares/authenticateJWT';

const router = Router();

router.post('/', authenticateJWT, suggestionValidation, handleValidationErrors, suggestionController.createSuggestion);
router.get('/', authenticateJWT, suggestionController.getAllSuggestions);
router.delete('/:id', authenticateJWT, suggestionController.deleteSuggestion);

export default router;
