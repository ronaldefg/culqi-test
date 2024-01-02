// __tests__/tokenService.test.ts
import { TokenService } from '../services/tokenService';
import { TokenExpiredError } from 'jsonwebtoken';

describe('TokenService', () => {
    let tokenService: TokenService;

    beforeEach(() => {
        tokenService = new TokenService();
    });

    it('should create a valid token', () => {
        const data = {
            email: "ronaldefg@gmail.com",
            card_number: "4111111111111111",
            cvv: "123",
            expiration_month: "12",
            expiration_year: "2024"
        };
        const token = tokenService.createToken(data);

        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
    });

    it('should throw an error for invalid card number', () => {
        const invalidData = {
            card_number: '1111111111111111',
        };

        expect(() => tokenService.createToken(invalidData)).toThrow('Invalid card number');
    });

    it('should throw an error for invalid cvv', () => {
        const invalidData = {
            card_number: '4111111111111111',
            cvv: '11111',
        };

        expect(() => tokenService.createToken(invalidData)).toThrow('Invalid CVV');
    });

    it('should throw an error for invalid expiration date', () => {
        const invalidData = {
            card_number: '4111111111111111',
            cvv: '123',
            expiration_month: "12",
            expiration_year: "2023"
        };

        expect(() => tokenService.createToken(invalidData)).toThrow('Invalid expiration date');
    });

    it('should throw an error for invalid email', () => {
        const invalidData = {
            card_number: '4111111111111111',
            cvv: '123',
            expiration_month: "12",
            expiration_year: "2024",
            email: "correo@dominio.com"
        };

        expect(() => tokenService.createToken(invalidData)).toThrow('Invalid email');
    });

    it('should verify a valid token', () => {
        const data = {
            email: "ronaldefg@gmail.com",
            card_number: "4111111111111111",
            cvv: "123",
            expiration_month: "12",
            expiration_year: "2024"
        };
        const token = tokenService.createToken(data);

        const decoded = tokenService.verifyToken(token);

        expect(decoded).toBeDefined();
    });

    it('should throw expired token', () => {
        const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbmFsZGVmZ0BnbWFpbC5jb20iLCJjYXJkX251bWJlciI6IjQxMTExMTExMTExMTExMTEiLCJjdnYiOiIxMjMiLCJleHBpcmF0aW9uX21vbnRoIjoiMTIiLCJleHBpcmF0aW9uX3llYXIiOiIyMDI0IiwiaWF0IjoxNzA0MTM1MjI1LCJleHAiOjE3MDQxMzUyODV9.eQo5KCfowzlxwjuvWFUX9dnt9pBDjUINcG8IhxMHTP8';

        expect(() => tokenService.verifyToken(expiredToken)).toThrow('Expired token');
    });

    it('should throw invalid token', () => {
        const invalidToken = '';

        expect(() => tokenService.verifyToken(invalidToken)).toThrow('Invalid token');
    });
});
