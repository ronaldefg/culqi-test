"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validationUtils_1 = require("../validationUtils");
class TokenService {
    constructor() {
        this.secretKey = 'culqi-test';
    }
    createToken(data) {
        if (!(0, validationUtils_1.isLuhnValid)(data.card_number) ||
            !(0, validationUtils_1.isValidCVV)(data.card_type, data.cvv) ||
            !(0, validationUtils_1.isValidExpirationDate)(data.expiration_month, data.expiration_year) ||
            !(0, validationUtils_1.isValidEmail)(data.email)) {
            throw new Error('Datos de tarjeta no válidos');
        }
        return jsonwebtoken_1.default.sign(data, this.secretKey, { expiresIn: '1m' });
    }
    verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.secretKey);
            // Realiza validaciones adicionales si es necesario
            if (typeof decoded === 'string' ||
                !(0, validationUtils_1.isValidExpirationDate)(decoded.expiration_month, decoded.expiration_year)) {
                throw new Error('Token expirado');
            }
            return decoded;
        }
        catch (error) {
            throw new Error('Token inválido');
        }
    }
}
exports.TokenService = TokenService;
