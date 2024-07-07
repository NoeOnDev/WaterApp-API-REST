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
exports.suggestionController = void 0;
const suggestionService_1 = require("./suggestionService");
class SuggestionController {
    createSuggestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message } = req.body;
                if (!req.user || req.user.role !== 'Admin') {
                    return res.sendStatus(403);
                }
                const adminId = req.user.id;
                const suggestion = yield suggestionService_1.suggestionService.createSuggestion({ message, adminId });
                res.status(201).json(suggestion);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(400).json({ error: 'Unknown error' });
                }
            }
            return; // Esto es necesario para que TypeScript no se queje
        });
    }
    getAllSuggestions(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const suggestions = yield suggestionService_1.suggestionService.getAllSuggestions();
                res.status(200).json(suggestions);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(400).json({ error: 'Unknown error' });
                }
            }
        });
    }
    deleteSuggestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user || req.user.role !== 'Admin') {
                    return res.sendStatus(403);
                }
                const { id } = req.params;
                const suggestion = yield suggestionService_1.suggestionService.deleteSuggestion(parseInt(id, 10));
                res.status(200).json(suggestion);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(400).json({ error: 'Unknown error' });
                }
            }
            return; // Esto es necesario para que TypeScript no se queje
        });
    }
}
exports.suggestionController = new SuggestionController();
