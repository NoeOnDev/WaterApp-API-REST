// src/users/userService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';
import { env } from '../config/env';

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
}

export const userService = new UserService();
