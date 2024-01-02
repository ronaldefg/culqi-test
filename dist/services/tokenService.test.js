"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenService_1 = require("./tokenService");
describe('TokenService', () => {
    it('should create a token', () => {
        const tokenService = new tokenService_1.TokenService();
        const data = { email: 'test@example.com', card_number: '4111111111111111', /* ... */ };
        const token = tokenService.createToken(data);
        expect(token).toBeTruthy();
    });
    it('should verify a valid token', () => {
        const tokenService = new tokenService_1.TokenService();
        const data = { email: 'test@example.com', card_number: '4111111111111111', /* ... */ };
        const token = tokenService.createToken(data);
        const decoded = tokenService.verifyToken(token);
        expect(decoded).toEqual(data);
    });
    it('should throw an error for an invalid token', () => {
        const tokenService = new tokenService_1.TokenService();
        const invalidToken = 'invalid-token';
        expect(() => tokenService.verifyToken(invalidToken)).toThrowError();
    });
});
