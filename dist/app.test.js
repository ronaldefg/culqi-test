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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
describe('Token Service', () => {
    it('should create a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/create-token')
            .send({
            email: 'test@example.com',
            card_number: '4111111111111111',
            cvv: '123',
            expiration_month: '12',
            expiration_year: '2023',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    }));
    it('should get card data from a valid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const createTokenResponse = yield (0, supertest_1.default)(app_1.default)
            .post('/create-token')
            .send({
            email: 'test@example.com',
            card_number: '4111111111111111',
            cvv: '123',
            expiration_month: '12',
            expiration_year: '2023',
        });
        const token = createTokenResponse.body.token;
        const getCardDataResponse = yield (0, supertest_1.default)(app_1.default)
            .get('/get-card-data')
            .set('Authorization', `Bearer ${token}`);
        expect(getCardDataResponse.status).toBe(200);
        expect(getCardDataResponse.body).toEqual({
            card_number: '4111111111111111',
            expiration_month: '12',
            expiration_year: '2023',
        });
    }));
    it('should handle invalid token when getting card data', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidToken = 'invalid-token';
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/get-card-data')
            .set('Authorization', `Bearer ${invalidToken}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Token inválido');
    }));
});
