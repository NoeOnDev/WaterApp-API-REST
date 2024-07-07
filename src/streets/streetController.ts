// src/streets/streetController.ts
import { Request, Response } from 'express';
import { streetService } from './streetService';

class StreetController {
    async createStreet(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const street = await streetService.createStreet({ name });
            res.status(201).json(street);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }

    async getAllStreets(_req: Request, res: Response) {
        try {
            const streets = await streetService.getAllStreets();
            res.status(200).json(streets);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: 'Unknown error' });
            }
        }
    }
}

export const streetController = new StreetController();
