import { Pool, QueryResult } from 'pg';

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    max: 20,
});

export interface InteractionLog {
    id: number;
    session_id: string;
    timestamp: Date;
    user_query: string;
    llm_response: string;
    response_time: number;
}

export async function initPostgres(): Promise<void> {
    try {
        console.log('Attempting to connect to PostgreSQL...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS interaction_logs (
                id SERIAL PRIMARY KEY,
                session_id VARCHAR(255) NOT NULL,
                timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                user_query TEXT NOT NULL,
                llm_response TEXT NOT NULL,
                response_time DECIMAL NOT NULL
            );
        `);
        console.log("PostgreSQL connected and 'interaction_logs' table initialized.");
    } catch (err) {
        console.error("Error initializing PostgreSQL:", err);
        throw err;
    }
}

export { pool };