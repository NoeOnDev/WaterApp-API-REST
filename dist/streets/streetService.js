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
exports.streetService = void 0;
// src/streets/streetService.ts
const database_1 = require("../config/database");
class StreetService {
    createStreet(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name }) {
            const client = yield database_1.pool.connect();
            try {
                const query = `
                INSERT INTO Street (name)
                VALUES ($1)
                RETURNING id, name
            `;
                const result = yield client.query(query, [name]);
                return result.rows[0];
            }
            finally {
                client.release();
            }
        });
    }
    getAllStreets() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield database_1.pool.connect();
            try {
                const query = 'SELECT id, name FROM Street';
                const result = yield client.query(query);
                return result.rows;
            }
            finally {
                client.release();
            }
        });
    }
}
exports.streetService = new StreetService();
