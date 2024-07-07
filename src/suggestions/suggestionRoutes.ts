// src/suggestions/suggestionRoutes.ts
import { Router } from 'express';
import { suggestionController } from './suggestionController';

const router = Router();

router.post('/create', suggestionController.createSuggestion);
router.get('/', suggestionController.getAllSuggestions);
router.delete('/:id', suggestionController.deleteSuggestion);

export default router;
