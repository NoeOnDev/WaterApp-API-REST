// src/users/userService.ts
import { pool } from '../config/database';
import bcrypt from 'bcrypt';

interface RegisterUserDto {
    username: string;
    street: string;
    email: string;
    password: string;
}

class UserService {
    async registerUser({ username, street, email, password }: RegisterUserDto) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const userCountResult = await client.query('SELECT COUNT(*) FROM Users');
            const userCount = parseInt(userCountResult.rows[0].count, 10);

            const role = userCount === 0 ? 'Admin' : 'User';

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertUserQuery = `
                INSERT INTO Users (username, street, email, password, role)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, username, street, email, role
            `;
            const result = await client.query(insertUserQuery, [username, street, email, hashedPassword, role]);

            await client.query('COMMIT');

            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error('Error registering user');
        } finally {
            client.release();
        }
    }
}

export const userService = new UserService();
