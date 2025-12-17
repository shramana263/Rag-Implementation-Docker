// /src/routes/ingestionRoutes.ts

import { Router } from 'express';
import { ingestDocuments } from '../controllers/IngestionController';

const router = Router();

/**
 * @openapi
 * /api/ingest:
 *   post:
 *     tags:
 *       - Ingestion
 *     summary: Ingest documents into the vector database
 *     description: |
 *       Processes 50 news articles through the RAG pipeline:
 *       1. Chunks documents using RecursiveCharacterTextSplitter
 *       2. Generates embeddings using Jina AI (1024-dim)
 *       3. Stores vectors in Qdrant for semantic search
 *       
 *       **Note:** This should be run once before using the chat endpoint.
 *       Processing time: ~20-30 seconds
 *     responses:
 *       200:
 *         description: Documents successfully ingested
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IngestionResponse'
 *       500:
 *         description: Ingestion failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/ingest', ingestDocuments);

export default router;