// src/suggestions/suggestionService.ts
import { pool } from '../config/database';

interface CreateSuggestionDto {
    message: string;
    adminId: number;
}

class SuggestionService {
    async createSuggestion({ message, adminId }: CreateSuggestionDto) {
        const client = await pool.connect();
        try {
            const query = `
                INSERT INTO SuggestedMessage (message, admin_id)
                VALUES ($1, $2)
                RETURNING id, message, admin_id
            `;
            const result = await client.query(query, [message, adminId]);
            return result.rows[0];
        } finally {
            client.release();
        }
    }

    async getAllSuggestions() {
        const client = await pool.connect();
        try {
            const query = 'SELECT id, message, admin_id FROM SuggestedMessage';
            const result = await client.query(query);
            return result.rows;
        } finally {
            client.release();
        }
    }

    async deleteSuggestion(id: number) {
        const client = await pool.connect();
        try {
            const query = 'DELETE FROM SuggestedMessage WHERE id = $1 RETURNING id';
            const result = await client.query(query, [id]);
            if (result.rows.length === 0) {
                throw new Error('Suggestion not found');
            }
            return result.rows[0];
        } finally {
            client.release();
        }
    }
}

export const suggestionService = new SuggestionService();
