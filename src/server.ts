// /src/server.ts

import 'dotenv/config'; // Use dotenv for environment variable loading
import express from 'express';
import { initPostgres } from './config/postgres';
import { initRedis } from './config/redis';
// Import other routes/services here (e.g., Qdrant init, Express routes)

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup (e.g., json body parsing, rate limiting)
app.use(express.json());

// --- Database and Service Initialization ---
async function startServer() {
    try {
        // 1. Initialize all required databases
        await initPostgres(); // SQL (Logs/History)
        await initRedis();    // Redis (Caching/Context)
        // Note: Qdrant initialization (creating collections) will be next
        
        // 2. Set up routes
        // Example: app.use('/api/history', historyRoutes); 
        // Example: app.use('/api/chat', chatRoutes); 

        // 3. Start Express Server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Fatal error during startup:', error);
        process.exit(1);
    }
}

startServer();