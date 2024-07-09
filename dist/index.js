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
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const env_1 = require("./config/env");
const userRoutes_1 = __importDefault(require("./users/userRoutes"));
const streetRoutes_1 = __importDefault(require("./streets/streetRoutes"));
const suggestionRoutes_1 = __importDefault(require("./suggestions/suggestionRoutes"));
const notificationRoutes_1 = __importDefault(require("./notifications/notificationRoutes"));
const app = (0, express_1.default)();
const port = env_1.env.port;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/users', userRoutes_1.default);
app.use('/streets', streetRoutes_1.default);
app.use('/suggestions', suggestionRoutes_1.default);
app.use('/notifications', notificationRoutes_1.default);
app.get('/', (_req, res) => {
    res.send('Welcome to the best API 🚬');
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connect)();
            app.listen(port, () => {
                console.log(`Server running on port http://localhost:${port} 🚀`);
            });
        }
        catch (error) {
            console.error("Failed to start server due to database connection error:", error);
            process.exit(1);
        }
    });
}
start();
