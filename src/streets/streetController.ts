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
                console.log(error.message);
            } else {
                console.log('Error desconocido');
            }
        }
    }

    async getAllStreets(_req: Request, res: Response) {
        try {
            const streets = await streetService.getAllStreets();
            res.status(200).json(streets);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log('Error desconocido');
            }
        }
    }
}

export const streetController = new StreetController();
