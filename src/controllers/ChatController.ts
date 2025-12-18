import { Request, Response } from 'express';
import { processChatQuery } from '../services/ChatService';
import { getHistory, clearHistory } from '../services/LogService';
import { clearContext } from '../services/CacheService';

interface ChatRequest {
    sessionId: string;
    query: string;
}

export async function chat(req: Request<{}, {}, ChatRequest>, res: Response): Promise<void> {
    const { sessionId, query } = req.body;

    if (!sessionId || !query) {
        res.status(400).json({ status: 'error', message: 'Missing required fields: sessionId and query.' });
        return;
    }

    try {
        const responseText = await processChatQuery(sessionId, query);
        // Note: For simplicity, full text is returned instead of streaming in this example
        res.status(200).json({ 
            sessionId: sessionId,
            response: responseText 
        });
    } catch (error) {
        console.error('Chat processing failed:', error);
        res.status(500).json({ 
            status: 'error', 
            message: 'Internal Server Error during RAG pipeline execution.',
            details: (error as Error).message
        });
    }
}


export async function getSessionHistory(req: Request, res: Response): Promise<void> {
    const { sessionId } = req.params;
    try {
        const history = await getHistory(sessionId); 
        res.status(200).json({ sessionId, history });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ status: 'error', message: 'Failed to retrieve history.' });
    }
}

export async function deleteSessionHistory(req: Request, res: Response): Promise<void> {
    const { sessionId } = req.params;
    try {
        const [sqlCount, redisCount] = await Promise.all([
            clearHistory(sessionId), // Clear SQL logs
            clearContext(sessionId), // Clear Redis cache
        ]);
        
        res.status(200).json({ 
            status: 'success', 
            message: `Session ${sessionId} cleared. Deleted ${sqlCount} SQL logs and ${redisCount} Redis keys.`,
        });
    } catch (error) {
        console.error('Error clearing history:', error);
        res.status(500).json({ status: 'error', message: 'Failed to clear session history.' });
    }
}