import { Request, Response } from 'express';
import { TokenService } from '../services/tokenService';
import { CardService } from '../services/cardService';
import { CardDataInfo} from '../types';
import {JwtPayload} from "jsonwebtoken";
import {maskCardNumber} from "../validationUtils";

export class CardController {
    private tokenService: TokenService;
    private cardService: CardService;

    constructor(tokenService: TokenService, cardService: CardService) {
        this.tokenService = tokenService;
        this.cardService = cardService;
    }

    public async getCardData(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(401).json({ error: 'Token no proporcionado' });
                return;
            }

            const decodedToken = this.tokenService.verifyToken(token) as JwtPayload;

            const cardData: CardDataInfo = {
                email: decodedToken.email,
                card_number: maskCardNumber(decodedToken.card_number),
                expiration_month: decodedToken.expiration_month,
                expiration_year: decodedToken.expiration_year,
            };

            // const cardInfoString = await getData(token);

            res.json(cardData);
        } catch (error) {

            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }
}
