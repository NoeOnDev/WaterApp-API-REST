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
exports.pool = void 0;
exports.connect = connect;
// src/config/database.ts
const pg_1 = require("pg");
const env_1 = require("./env");
const pool = new pg_1.Pool({
    host: env_1.env.db.host,
    port: Number(env_1.env.db.port),
    user: env_1.env.db.user,
    password: env_1.env.db.password,
    database: env_1.env.db.database,
});
exports.pool = pool;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        let retries = 5;
        while (retries) {
            try {
                yield pool.connect();
                console.log("Database connected ✅");
                break;
            }
            catch (error) {
                retries -= 1;
                console.error(`Database connection error ❌, retries left: ${retries}`, error);
                if (retries === 0) {
                    throw error;
                }
                yield new Promise(res => setTimeout(res, 5000));
            }
        }
    });
}
