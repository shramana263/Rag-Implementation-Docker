import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import ingestionRoutes from './routes/ingestionRoutes';
import chatRoutes from './routes/chatRoutes';
import { globalLimiter, chatLimiter, ingestionLimiter } from './middleware/rateLimiter';

const app = express();
app.use(express.json()); 
app.use(globalLimiter);
app.use('/api/chat', chatLimiter);
app.use('/api/ingest', ingestionLimiter); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'RAG API Documentation',
}));

app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api', ingestionRoutes); 
app.use('/api', chatRoutes); 

/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check endpoint
 *     description: Returns the API status and service name
 *     responses:
 *       200:
 *         description: Service is running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        service: 'Scalable RAG API for News Intelligence'
    });
});

app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint Not Found',
        path: req.originalUrl,
    });
});
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});


export default app;