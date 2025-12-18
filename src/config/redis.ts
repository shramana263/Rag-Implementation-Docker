import { createClient, RedisClientType } from 'redis';

const redisClient: RedisClientType = createClient({
    url: `redis://${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || '6379'}`,
});

export async function initRedis(): Promise<void> {
    try {
        redisClient.on('error', (err) => console.error('Redis Client Error:', err));
        await redisClient.connect();
        console.log('Redis connected.');
    } catch (err) {
        console.error('Error initializing Redis:', err);
    }
}

export { redisClient };