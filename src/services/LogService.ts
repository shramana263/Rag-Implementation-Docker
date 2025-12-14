// /src/services/LogService.ts

import { QueryResult } from 'pg';
import { pool, InteractionLog } from '../config/postgres';

/**
 * Saves a detailed record of a chat interaction to the SQL database.
 * Mandatory fields: SessionID, UserQuery, LLMResponse, Response Time.
 */
export async function saveInteraction(
    sessionId: string,
    userQuery: string,
    llmResponse: string,
    responseTime: number // Time in milliseconds
): Promise<InteractionLog> {
    const query = `
        INSERT INTO interaction_logs 
        (session_id, user_query, llm_response, response_time) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *;
    `;
    const values = [sessionId, userQuery, llmResponse, responseTime];

    try {
        const result = await pool.query<InteractionLog>(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error saving interaction log:', error);
        throw new Error('Database logging failed.');
    }
}

/**
 * Fetches past Q&A for a specific session.
 */
export async function getHistory(sessionId: string): Promise<InteractionLog[]> {
    const query = `
        SELECT *
        FROM interaction_logs 
        WHERE session_id = $1 
        ORDER BY timestamp ASC;
    `;
    try {
        const result = await pool.query<InteractionLog>(query, [sessionId]);
        return result.rows;
    } catch (error) {
        console.error(`Error fetching history for session ${sessionId}:`, error);
        throw new Error('Database query failed to retrieve history.');
    }
}

/**
 * Clears the session data from the SQL database.
 */
export async function clearHistory(sessionId: string): Promise<number> {
    const query = `DELETE FROM interaction_logs WHERE session_id = $1;`;
    try {
        const result: QueryResult = await pool.query(query, [sessionId]);
        return result.rowCount ?? 0;
    } catch (error) {
        console.error(`Error clearing history for session ${sessionId}:`, error);
        throw new Error('Database deletion failed.');
    }
}