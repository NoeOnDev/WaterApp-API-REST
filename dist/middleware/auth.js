"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return; // Devuelve explícitamente aquí para asegurarte de que la función salga después de enviar la respuesta.
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
const authorizeAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'Admin') {
        res.status(403).json({ error: 'Forbidden' });
        return; // Devuelve explícitamente aquí para asegurarte de que la función salga después de enviar la respuesta.
    }
    next(); // Devuelve next() aquí para indicar que puedes proceder con la siguiente función de middleware.
};
exports.authorizeAdmin = authorizeAdmin;
