import { Request, Response } from 'express';
import { TokenService } from '../services/tokenService';
import {storeData} from "../services/redisService";

export class TokenController {
    private tokenService: TokenService;

    constructor(tokenService: TokenService) {
        this.tokenService = tokenService;
    }

    public createToken(req: Request, res: Response): void {
        try {
            const token = this.tokenService.createToken(req.body);
            storeData(token, req.body).then(r => res.json({ token }));
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'message' in error) {
                res.status(500).json({error: error.message});
            }
        }
    }
}
