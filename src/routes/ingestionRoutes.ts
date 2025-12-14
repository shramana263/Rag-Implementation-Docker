// /src/routes/ingestionRoutes.ts

import { Router } from 'express';
import { ingestDocuments } from '../controllers/IngestionController';

const router = Router();

// POST /ingest - Triggers the document processing pipeline.
router.post('/ingest', ingestDocuments);

export default router;