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
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestionService = void 0;
// src/suggestions/suggestionService.ts
const database_1 = require("../config/database");
class SuggestionService {
    createSuggestion(_a) {
        return __awaiter(this, arguments, void 0, function* ({ message, adminId }) {
            const client = yield database_1.pool.connect();
            try {
                const query = `
                INSERT INTO SuggestedMessage (message, admin_id)
                VALUES ($1, $2)
                RETURNING id, message, admin_id
            `;
                const result = yield client.query(query, [message, adminId]);
                return result.rows[0];
            }
            finally {
                client.release();
            }
        });
    }
    getAllSuggestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                const query = 'SELECT id, message, admin_id FROM SuggestedMessage';
                const result = yield client.query(query);
                return result.rows;
            }
            finally {
                client.release();
            }
        });
    }
    deleteSuggestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                const query = 'DELETE FROM SuggestedMessage WHERE id = $1 RETURNING id';
                const result = yield client.query(query, [id]);
                if (result.rows.length === 0) {
                    throw new Error('Suggestion not found');
                }
                return result.rows[0];
            }
            finally {
                client.release();
            }
        });
    }
}
exports.suggestionService = new SuggestionService();
