// /src/server.ts

import 'dotenv/config'; 
import app from './app'; // Import the configured Express app
import { initPostgres } from './config/postgres';
import { initRedis } from './config/redis';
import { initQdrant } from './config/qdrant';

const PORT = process.env.PORT || 3000;

// --- Database and Service Initialization ---
async function startServer() {
    try {
        console.log("Starting service initialization...");
        
        // 1. Initialize all required databases (mandatory persistence layer)
        await initPostgres(); 
        await initRedis();    
        await initQdrant(); 
        
        // 2. Start Express Server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('❌ Fatal error during application startup:', error);
        process.exit(1);
    }
}

startServer();