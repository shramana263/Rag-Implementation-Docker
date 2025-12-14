// /src/services/VectorService.ts

import { qdrantClient, COLLECTION_NAME } from '../config/qdrant';

// --- STABLE FIX: Define the required structure based on Qdrant API ---
// This interface defines the minimum required structure for a Qdrant Point, 
// ensuring compatibility without relying on a fragile internal path.
export interface QdrantPointStruct {
    id: number | string; 
    vector: number[];   
    payload?: Record<string, any>; // Optional payload (could be undefined)
}

// Define a type for the data structure you will store in Qdrant payload
export interface ArticleChunkPayload {
    articleId: string;
    sourceUrl: string;
    text: string; // The actual chunk of text content
    chunkId: number;
}

/**
 * Stores a batch of points (vector and payload) into the Qdrant collection.
 * We now use the locally defined QdrantPointStruct.
 * @param {QdrantPointStruct[]} points - Array of objects containing id, vector, and payload.
 */
export async function storeVectors(points: QdrantPointStruct[]): Promise<void> {
    try {
        const result = await qdrantClient.upsert(COLLECTION_NAME, {
            wait: true,
            batch: {
                ids: points.map(p => p.id),
                vectors: points.map(p => p.vector),
                payloads: points.map(p => p.payload === undefined ? null : p.payload),
            },
        });
        
        if (result.status !== 'completed' && result.status !== 'acknowledged') {
            console.error('Qdrant upsert error:', result.status);
            throw new Error('Vector storage failed.');
        }
        console.log(`✅ Successfully stored ${points.length} vectors in Qdrant.`);

    } catch (error) {
        console.error('❌ Error storing vectors in Qdrant:', error);
        throw new Error('Vector storage failed.');
    }
}

/**
 * Searches the Qdrant collection for the top-k nearest neighbors to a query vector (Retrieval step).
 * @param {number[]} queryVector - The embedding of the user's query.
 * @param {number} k - The number of top results to retrieve.
 * @returns {Array<ArticleChunkPayload>} The payloads (text chunks) of the retrieved results.
 */
export async function searchVectors(queryVector: number[], k: number = 4): Promise<ArticleChunkPayload[]> {
    try {
        // The search method returns an array of results, which already contain the payload.
        const results = await qdrantClient.search(COLLECTION_NAME, {
            vector: queryVector,
            limit: k,
            with_payload: true, 
        });

        // Map the results to just the text payload for the RAG prompt
        return results.map(hit => hit.payload as unknown as ArticleChunkPayload);

    } catch (error) {
        console.error('❌ Error searching vectors in Qdrant:', error);
        throw new Error('Vector search failed.');
    }
}