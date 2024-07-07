// src/suggestions/suggestionController.ts
import { Request, Response } from 'express';
import { suggestionService } from './suggestionService';

class SuggestionController {
    async createSuggestion(req: Request, res: Response) {
        try {
            const { message, adminId } = req.body;
            const suggestion = await suggestionService.createSuggestion({ message, adminId });
            res.status(201).json(suggestion);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('Error desconocido');
            }
        }
    }

    async getAllSuggestions(_req: Request, res: Response) {
        try {
            const suggestions = await suggestionService.getAllSuggestions();
            res.status(200).json(suggestions);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('Error desconocido');
            }
        }
    }

    async deleteSuggestion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const suggestion = await suggestionService.deleteSuggestion(parseInt(id, 10));
            res.status(200).json(suggestion);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('Error desconocido');
            }
        }
    }
}

export const suggestionController = new SuggestionController();
