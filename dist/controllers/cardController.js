"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardController = void 0;
class CardController {
    constructor(tokenService, cardService) {
        this.tokenService = tokenService;
        this.cardService = cardService;
    }
    getCardData(req, res) {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                res.status(401).json({ error: 'Token no proporcionado' });
                return;
            }
            const decodedToken = this.tokenService.verifyToken(token);
            // Realiza más validaciones si es necesario
            // Por ejemplo, puedes verificar si el token tiene los permisos adecuados
            const cardData = this.cardService.getCardData(decodedToken);
            res.json(cardData);
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error && error.message === 'Token expirado') {
                res.status(401).json({ error: 'Token expirado' });
            }
            else {
                res.status(500).json({ error: 'Error al obtener datos de tarjeta' });
            }
        }
    }
}
exports.CardController = CardController;
