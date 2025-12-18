import 'dotenv/config'; 
import app from './app'; 
import { initPostgres } from './config/postgres';
import { initRedis } from './config/redis';
import { initQdrant } from './config/qdrant';

const PORT = process.env.PORT || 3000;
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function startServer() {
    console.log("Starting RAG API service initialization...");
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            console.log(`Attempt ${i + 1}/${MAX_RETRIES} to initialize databases...`);
            
            await Promise.all([
                initPostgres(),
                initRedis(),
            ]);
            
            await initQdrant();

            console.log('All databases connected and initialized successfully!');
            break;

        } catch (error) {
            console.error(`Initialization failed on attempt ${i + 1}: ${(error as Error).message}`);
            if (i === MAX_RETRIES - 1) {
                console.error('Fatal: Max retries reached. Exiting.');
                process.exit(1); 
            }
            console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
            await delay(RETRY_DELAY_MS);
        }
    }
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`API Health Check: http://localhost:${PORT}/`);
    });
}

startServer();