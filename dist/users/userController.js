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
exports.userController = void 0;
const userService_1 = require("./userService");
class UserController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, street, email, password } = req.body;
                const user = yield userService_1.userService.registerUser({ username, street, email, password });
                res.status(201).json(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                else {
                    console.log('Error desconocido');
                }
            }
        });
    }
    getAllUsers(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.userService.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                else {
                    console.log('Error desconocido');
                }
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield userService_1.userService.loginUser({ email, password });
                res.status(200).json(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    res.status(400).json({ error: error.message });
                }
                else {
                    console.log('Error desconocido');
                    res.status(500).json({ error: 'Error desconocido' });
                }
            }
        });
    }
}
exports.userController = new UserController();
