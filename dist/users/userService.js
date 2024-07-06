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
const database_1 = require("../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
}
exports.userService = new UserService();
