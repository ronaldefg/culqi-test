"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const tokenService_1 = require("../services/tokenService");
class TokenController {
    constructor() {
        this.tokenService = new tokenService_1.TokenService();
    }
    createToken(req, res) {
        try {
            const token = this.tokenService.createToken(req.body);
            res.json({ token });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en la creación del token' });
        }
    }
}
exports.TokenController = TokenController;
