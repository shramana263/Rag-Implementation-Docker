// /src/config/postgres.ts

import { Pool, QueryResult } from 'pg';

// --- Connection Pool ---
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST, // 'postgres' in docker-compose
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    max: 20,
});

// --- Type Definition for Logs ---
export interface InteractionLog {
    id: number;
    session_id: string;
    timestamp: Date;
    user_query: string;
    llm_response: string;
    response_time: number;
}


/**
 * Initializes the database by creating the mandatory interaction_logs table.
 */
export async function initPostgres(): Promise<void> {
    try {
        console.log('Attempting to connect to PostgreSQL...');
        // Create the table with all mandatory fields
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
        console.log("✅ PostgreSQL connected and 'interaction_logs' table initialized.");
    } catch (err) {
        console.error("❌ Error initializing PostgreSQL:", err);
        // In a production app, you might want to exit here
    }
}

export { pool };