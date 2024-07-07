// src/streets/streetService.ts
import { pool } from '../config/database';

interface CreateStreetDto {
    name: string;
}

class StreetService {
    async createStreet({ name }: CreateStreetDto) {
        const client = await pool.connect();
        try {
            const query = `
                INSERT INTO Street (name)
                VALUES ($1)
                RETURNING id, name
            `;
            const result = await client.query(query, [name]);
            return result.rows[0];
        } finally {
            client.release();
        }
    }

    async getAllStreets() {
        const client = await pool.connect();
        try {
            const query = 'SELECT id, name FROM Street';
            const result = await client.query(query);
            return result.rows;
        } finally {
            client.release();
        }
    }
}

export const streetService = new StreetService();
