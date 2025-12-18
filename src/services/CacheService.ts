import { redisClient } from '../config/redis';
const TTL_SECONDS = 3600;

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


export async function setContext(sessionId: string, history: any[]): Promise<void> {
    const key = `chat:${sessionId}`;
    try {
        await redisClient.set(key, JSON.stringify(history), {
            EX: TTL_SECONDS,
        });
    } catch (error) {
        console.error(`Error setting context for session ${sessionId}:`, error);
    }
}

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