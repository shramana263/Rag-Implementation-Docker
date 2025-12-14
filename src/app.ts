// /src/app.ts

import express from 'express';
import ingestionRoutes from './routes/ingestionRoutes';
import chatRoutes from './routes/chatRoutes';

const app = express();

// --- Middleware ---
// Mandatory: Body parser for JSON requests (e.g., for POST /chat and POST /ingest)
app.use(express.json()); 

// Optional Bonus: Implement a Rate Limiting Middleware here for extra credit

// --- API Routes ---
// POST /ingest
app.use('/api', ingestionRoutes); 
// POST /chat, GET /history/:sessionId, DELETE /history/:sessionId
app.use('/api', chatRoutes); 

// --- Health Check / Default Route ---
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        service: 'Scalable RAG API for News Intelligence'
    });
});

// --- Standardized Error Handling (Mandatory) ---
// Catch all for 404 errors
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint Not Found',
        path: req.originalUrl,
    });
});
// Global error handler (e.g., for 500 errors)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});


export default app;