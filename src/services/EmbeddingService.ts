// /src/services/EmbeddingService.ts (CORRECTED)

import { JinaEmbeddings } from '@langchain/community/embeddings/jina';
// import { VECTOR_DIMENSION } from '../config/qdrant'; // Not needed in this file

// We choose a Jina model that aligns with our 1024 dimension set in qdrant.ts
// Using jina-embeddings-v3 which produces 1024-dimensional vectors
const JINA_MODEL = "jina-embeddings-v3"; 

const jinaEmbeddings = new JinaEmbeddings({
    // Explicitly pass the API key read from the environment
    apiKey: process.env.JINA_API_KEY, 
    model: JINA_MODEL,
});

/**
 * Generates a single embedding for a query. Used later by the /chat endpoint.
 * @param {string} text - The query text.
 * @returns {number[]} The vector embedding.
 */
export async function embedQuery(text: string): Promise<number[]> {
    // JinaEmbeddings has a dedicated method for queries
    return jinaEmbeddings.embedQuery(text);
}

/**
 * Generates embeddings for a batch of text documents (chunks).
 * Used by the /ingest endpoint.
 * @param {string[]} texts - Array of text chunks.
 * @returns {number[][]} Array of vector embeddings.
 */
export async function embedDocuments(texts: string[]): Promise<number[][]> {
    // JinaEmbeddings handles batching automatically for efficiency
    return jinaEmbeddings.embedDocuments(texts);
}