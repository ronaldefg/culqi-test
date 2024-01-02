"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cardService_1 = require("./cardService");
describe('CardService', () => {
    it('should get card data from a valid token', () => {
        const cardService = new cardService_1.CardService();
        const validToken = 'valid-token'; // Debes proporcionar un token válido aquí
        const cardData = cardService.getCardData(validToken);
        expect(cardData).toEqual({
            card_number: '**** **** **** 1111',
            expiration_month: '12',
            expiration_year: '2023',
        });
    });
    it('should handle expiration of the token', () => {
        const cardService = new cardService_1.CardService();
        const expiredToken = 'expired-token'; // Debes proporcionar un token que haya expirado aquí
        const cardData = cardService.getCardData(expiredToken);
        expect(cardData).toEqual({ error: 'Token expired' });
    });
    it('should handle invalid token', () => {
        const cardService = new cardService_1.CardService();
        const invalidToken = 'invalid-token'; // Debes proporcionar un token inválido aquí
        const cardData = cardService.getCardData(invalidToken);
        expect(cardData).toEqual({ error: 'Invalid token' });
    });
});
