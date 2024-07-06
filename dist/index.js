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
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const env_1 = require("./config/env");
const app = (0, express_1.default)();
const port = env_1.env.port;
app.use(express_1.default.json());
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connect)();
            app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        }
        catch (error) {
            console.error("Failed to start server due to database connection error:", error);
            process.exit(1);
        }
    });
}
start();
