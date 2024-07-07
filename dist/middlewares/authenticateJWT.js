"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    const secret = env_1.env.jwt.jwtSecret;
    if (!secret) {
        return res.sendStatus(500);
    }
    jsonwebtoken_1.default.verify(token, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        return next();
    });
    return null; // Esto es necesario para que TypeScript no se queje
};
exports.default = authenticateJWT;
