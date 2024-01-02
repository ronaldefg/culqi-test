import {CardData} from "../types";
import { storeData, getData } from './redisService';
interface CardInfo extends CardData {
    token: string;
}

export class CardService {
    private cardData: Record<string, CardInfo> = {};

    public async storeCardData(token: string, cardData: any): Promise<string> {
        try {
            await storeData(token, cardData);
            return 'Data stored correctly.';
        } catch (error) {
            throw new Error('Error storing data in Redis.');
        }
    }

    public async getCardData(token: string): Promise<any | null> {
        try {
            const result = await getData(token);
            return result ? JSON.parse(result) : null;
        } catch (error) {
            throw new Error('Error getting data from Redis.');
        }
    }
}
