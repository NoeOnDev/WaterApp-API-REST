// src/users/userService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';
import { env } from '../config/env';
import { sendVerificationCode } from './emailService';

interface RegisterUserDto {
    username: string;
    street: string;
    email: string;
    password: string;
}

interface LoginUserDto {
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
            const newUser = result.rows[0];

            if (role === 'Admin') {
                await client.query('UPDATE Users SET street = NULL WHERE id = $1', [newUser.id]);
                newUser.street = null;
            }

            await client.query('COMMIT');

            return newUser;
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error('Error registering user');
        } finally {
            client.release();
        }
    }

    async getAllUsers() {
        const client = await pool.connect();
        try {
            const query = `
                SELECT Users.username, Users.email, Users.role, Street.name AS street
                FROM Users
                JOIN Street ON Users.street = Street.name`;
            const result = await client.query(query);
            return result.rows;
        } catch (error) {
            throw new Error('Error fetching users');
        } finally {
            client.release();
        }
    }

    async updateUsername(userId: number, newUsername: string) {
        const client = await pool.connect();
        try {
            const query = 'UPDATE Users SET username = $1 WHERE id = $2 RETURNING id, username, street, email, role';
            const result = await client.query(query, [newUsername, userId]);
            if (result.rows.length === 0) {
                throw new Error('User not found');
            }
            return result.rows[0];
        } catch (error) {
            throw new Error('Error updating username');
        } finally {
            client.release();
        }
    }

    async loginUser({ email, password }: LoginUserDto) {
        const client = await pool.connect();
        try {
            const query = 'SELECT id, username, email, password, role FROM Users WHERE email = $1';
            const result = await client.query(query, [email]);

            if (result.rows.length === 0) {
                throw new Error('Invalid email or password');
            }

            const user = result.rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            const jwtSecret = env.jwt.jwtSecret;
            if (typeof jwtSecret === 'undefined') {
                throw new Error('La clave secreta JWT no está definida');
            }

            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                jwtSecret,
                { expiresIn: env.jwt.jwtExpiration }
            );

            return { token, user: { username: user.username, email: user.email, role: user.role } };
        } finally {
            client.release();
        }
    }

    async generateVerificationCode(email: string): Promise<number> {
        const client = await pool.connect();
        try {
            const userResult = await client.query('SELECT id FROM Users WHERE email = $1', [email]);
            if (userResult.rows.length === 0) {
                throw new Error('Email not found');
            }
            const userId = userResult.rows[0].id;

            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = new Date(Date.now() + 3600000);

            await client.query(
                'INSERT INTO VerificationCodes (user_id, code, expires_at) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET code = $2, expires_at = $3',
                [userId, code, expiresAt]
            );

            await sendVerificationCode(email, code);
            return userId;
        } finally {
            client.release();
        }
    }

    async verifyCode(userId: number, code: string) {
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT expires_at FROM VerificationCodes WHERE user_id = $1 AND code = $2', [userId, code]);
            if (result.rows.length === 0) {
                throw new Error('Invalid or expired code');
            }
            const expiresAt = new Date(result.rows[0].expires_at);
            if (expiresAt < new Date()) {
                throw new Error('Expired code');
            }
        } finally {
            client.release();
        }
    }

    async resetPassword(userId: number, newPassword: string) {
        const client = await pool.connect();
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await client.query('UPDATE Users SET password = $1 WHERE id = $2', [hashedPassword, userId]);
        } finally {
            client.release();
        }
    }
}

export const userService = new UserService();
