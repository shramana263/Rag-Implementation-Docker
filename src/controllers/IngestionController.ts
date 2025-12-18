import { Request, Response } from 'express';
import { runIngestionPipeline } from '../services/IngestionService';
import { mockNewsArticles } from '../data/mockNewsData';

export async function ingestDocuments(req: Request, res: Response): Promise<void> {
    try {
        const count = await runIngestionPipeline(); 
        
        res.status(200).json({
            status: 'success',
            message: `Ingestion successful. Processed documents and stored ${count} vectors in Qdrant.`,
            documents_processed: mockNewsArticles.length,
            vectors_stored: count,
        });

    } catch (error) {
        console.error('Ingestion failed:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error: Failed to complete the ingestion pipeline.',
            details: (error as Error).message,
        });
    }
}