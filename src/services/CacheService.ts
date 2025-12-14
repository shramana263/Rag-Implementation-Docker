// /src/services/CacheService.ts

import { redisClient } from '../config/redis';

// Note: Conversation history is usually an array of message objects {role: string, content: string}

const TTL_SECONDS = 3600; // Time To Live: 1 hour for conversation context

/**
 * Retrieves conversation context (short-term memory) from Redis.
 * @param {string} sessionId
 * @returns {Array<any> | null} Parsed conversation history array or null
 */
export async function getContext(sessionId: string): Promise<any[] | null> {
    const key = `chat:${sessionId}`;
    try {
        const historyJson = await redisClient.get(key);
        return historyJson ? JSON.parse(historyJson) : null;
    } catch (error) {
        console.error(`Error retrieving context for session ${sessionId}:`, error);
        return null;
    }
}

/**
 * Caches conversation context in Redis.
 * @param {string} sessionId
 * @param {Array<any>} history - The full conversation history array
 */
export async function setContext(sessionId: string, history: any[]): Promise<void> {
    const key = `chat:${sessionId}`;
    try {
        // Redis is STRICTLY for caching conversation context
        await redisClient.set(key, JSON.stringify(history), {
            EX: TTL_SECONDS, // Set expiration time
        });
    } catch (error) {
        console.error(`Error setting context for session ${sessionId}:`, error);
    }
}

/**
 * Clears the session data from the Redis cache.
 */
export async function clearContext(sessionId: string): Promise<number> {
    const key = `chat:${sessionId}`;
    try {
        const deletedCount = await redisClient.del(key);
        return deletedCount;
    } catch (error) {
        console.error(`Error clearing Redis context for session ${sessionId}:`, error);
        throw new Error('Redis deletion failed.');
    }
}