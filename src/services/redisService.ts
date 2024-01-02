// redisService.ts
import Redis from 'ioredis';

const redisClient = new Redis({
    host: 'redis-19087.c321.us-east-1-2.ec2.cloud.redislabs.com',
    port: 19087,
    password: 'J0aMHU72cJikDU08oxq9e4LXJ1QTbHVB',
    username: 'default'
});

export function storeData(key: string, data: any): Promise<string> {

    const jsonString = JSON.stringify(data);
    return redisClient.set(key, jsonString);
}

export function getData(key: string): Promise<string | null> {
    return redisClient.get(key);
}
