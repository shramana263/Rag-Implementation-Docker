// /src/controllers/IngestionController.ts

import { Request, Response } from 'express';
import { runIngestionPipeline } from '../services/IngestionService';
import { mockNewsArticles } from '../data/mockNwesData';

/**
 * Handles the POST /ingest request to trigger the document processing pipeline.
 */
export async function ingestDocuments(req: Request, res: Response): Promise<void> {
    try {
        // You might use a queue (BullMQ) here for the bonus point
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