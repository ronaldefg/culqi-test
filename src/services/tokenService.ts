import jwt, {JwtPayload, TokenExpiredError} from 'jsonwebtoken';
import {identifyCardType, isLuhnValid, isValidCVV, isValidEmail, isValidExpirationDate,} from '../validationUtils';

export class TokenService {
    private secretKey: string = 'pk_test_LsRBKejzCOEEWOsw';

    public createToken(data: any): string {
        if (!isLuhnValid(data.card_number)) {
            throw new Error('Invalid card number');
        }

        const cardType = identifyCardType(data.card_number);

        if (!isValidCVV(cardType, data.cvv)) {
            throw new Error('Invalid CVV');
        }

        if (!isValidExpirationDate(data.expiration_month, data.expiration_year)) {
            throw new Error('Invalid expiration date');
        }

        if (!isValidEmail(data.email)) {
            throw new Error('Invalid email');
        }


        return jwt.sign(data, this.secretKey, { expiresIn: '1m' });
    }

    public verifyToken(token: string) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new Error('Expired token');
            }
            throw new Error('Invalid token');
        }
    }
}
