"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
// src/users/userService.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const env_1 = require("../config/env");
class UserService {
    registerUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, street, email, password }) {
            const client = yield database_1.pool.connect();
            try {
                yield client.query('BEGIN');
                const userCountResult = yield client.query('SELECT COUNT(*) FROM Users');
                const userCount = parseInt(userCountResult.rows[0].count, 10);
                const role = userCount === 0 ? 'Admin' : 'User';
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const insertUserQuery = `
                INSERT INTO Users (username, street, email, password, role)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, username, street, email, role
            `;
                const result = yield client.query(insertUserQuery, [username, street, email, hashedPassword, role]);
                const newUser = result.rows[0];
                if (role === 'Admin') {
                    yield client.query('UPDATE Users SET street = NULL WHERE id = $1', [newUser.id]);
                    newUser.street = null;
                }
                yield client.query('COMMIT');
                return newUser;
            }
            catch (error) {
                yield client.query('ROLLBACK');
                throw new Error('Error registering user');
            }
            finally {
                client.release();
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                const query = `
                    SELECT Users.username, Users.email, Users.role, Street.name AS street
                    FROM Users
                    JOIN Street ON Users.street = Street.name`;
                const result = yield client.query(query);
                return result.rows;
            }
            catch (error) {
                throw new Error('Error fetching users');
            }
            finally {
                client.release();
            }
        });
    }
    loginUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const client = yield database_1.pool.connect();
            try {
                const query = 'SELECT id, username, email, password, role FROM Users WHERE email = $1';
                const result = yield client.query(query, [email]);
                if (result.rows.length === 0) {
                    throw new Error('Invalid email or password');
                }
                const user = result.rows[0];
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid email or password');
                }
                const jwtSecret = env_1.env.jwt.jwtSecret;
                if (typeof jwtSecret === 'undefined') {
                    throw new Error('La clave secreta JWT no está definida');
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, role: user.role }, jwtSecret, { expiresIn: env_1.env.jwt.jwtExpiration });
                return { token, user: { username: user.username, email: user.email, role: user.role } };
            }
            finally {
                client.release();
            }
        });
    }
}
exports.userService = new UserService();
