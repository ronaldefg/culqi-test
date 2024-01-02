// cardService.test.ts
import { CardService } from './cardService';
import { storeData, getData } from './redisService';

jest.mock('./redisService', () => ({
    storeData: jest.fn(),
    getData: jest.fn(),
}));

describe('CardService', () => {
    let cardService: CardService;

    beforeEach(() => {
        cardService = new CardService();
    });

    describe('storeCardData', () => {
        it('should store card data in Redis', async () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbmFsZGVmZ0BnbWFpbC5jb20iLCJjYXJkX251bWJlciI6IjQxMTExMTExMTExMTExMTEiLCJjdnYiOiIxMjMiLCJleHBpcmF0aW9uX21vbnRoIjoiMTIiLCJleHBpcmF0aW9uX3llYXIiOiIyMDI0IiwiaWF0IjoxNzA0MTM1MjI1LCJleHAiOjE3MDQxMzUyODV9.eQo5KCfowzlxwjuvWFUX9dnt9pBDjUINcG8IhxMHTP8';
            const cardData = {
                email: "ronaldefg@gmail.com",
                card_number: "4111111111111111",
                cvv: "123",
                expiration_month: "12",
                expiration_year: "2024"
            };

            await cardService.storeCardData(token, cardData);

            expect(storeData).toHaveBeenCalledWith(token, cardData);
        });

        it('should throw an error on Redis store failure', async () => {
            const token = '';
            const cardData = {};

            (storeData as jest.Mock).mockRejectedValue(new Error('Mock Redis Error'));

            await expect(cardService.storeCardData(token, cardData)).rejects.toThrow('Error storing data in Redis.');
        });
    });

    describe('getCardData', () => {
        it('should get card data from Redis', async () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbmFsZGVmZ0BnbWFpbC5jb20iLCJjYXJkX251bWJlciI6IjQxMTExMTExMTExMTExMTEiLCJjdnYiOiIxMjMiLCJleHBpcmF0aW9uX21vbnRoIjoiMTIiLCJleHBpcmF0aW9uX3llYXIiOiIyMDI0IiwiaWF0IjoxNzA0MTM1MjI1LCJleHAiOjE3MDQxMzUyODV9.eQo5KCfowzlxwjuvWFUX9dnt9pBDjUINcG8IhxMHTP8';

            (getData as jest.Mock).mockResolvedValue(JSON.stringify({
                email: "ronaldefg@gmail.com",
                card_number: "4111111111111111",
                cvv: "123",
                expiration_month: "12",
                expiration_year: "2024"
            }));

            const result = await cardService.getCardData(token);

            expect(getData).toHaveBeenCalledWith(token);
            expect(result).toEqual({
                email: "ronaldefg@gmail.com",
                card_number: "4111111111111111",
                cvv: "123",
                expiration_month: "12",
                expiration_year: "2024"
            });
        });

        it('should return null if no data found in Redis', async () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvbmFsZGVmZ0BnbWFpbC5jb20iLCJjYXJkX251bWJlciI6IjQxMTExMTExMTExMTExMTEiLCJjdnYiOiIxMjMiLCJleHBpcmF0aW9uX21vbnRoIjoiMTIiLCJleHBpcmF0aW9uX3llYXIiOiIyMDI0IiwiaWF0IjoxNzA0MTM1MjI1LCJleHAiOjE3MDQxMzUyODV9.eQo5KCfowzlxwjuvWFUX9dnt9pBDjUINcG8IhxMHTP9';

            (getData as jest.Mock).mockResolvedValue(null);

            const result = await cardService.getCardData(token);

            expect(getData).toHaveBeenCalledWith(token);
            expect(result).toBeNull();
        });

        it('should throw an error on Redis get failure', async () => {
            const token = '';

            (getData as jest.Mock).mockRejectedValue(new Error('Mock Redis Error'));

            await expect(cardService.getCardData(token)).rejects.toThrow('Error getting data from Redis.');
        });
    });
});
