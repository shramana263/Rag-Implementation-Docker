// /src/config/qdrant.ts

import { QdrantClient } from '@qdrant/qdrant-js';

// --- Qdrant Client ---
const qdrantClient = new QdrantClient({
    // Use the Docker service name as the host
    host: process.env.QDRANT_HOST || 'qdrant', 
    // Qdrant's default API port
    port: parseInt(process.env.QDRANT_PORT || '6333', 10), 
});

// --- Constants ---
// Choose a standard dimension for your embeddings. 
// If using Jina Embeddings v2 (as suggested) or a common HuggingFace model, 
// 768 or 1024 are typical. We'll use 1024 for Jina v3.
const VECTOR_DIMENSION = 1024; 
const COLLECTION_NAME = 'news_articles';

/**
 * Initializes the Qdrant collection for news article vectors.
 */
export async function initQdrant(): Promise<void> {
    try {
        console.log('Attempting to check Qdrant collection status...');

        const collections = await qdrantClient.getCollections();
        const collectionExists = collections.collections.some(c => c.name === COLLECTION_NAME);

        if (!collectionExists) {
            console.log(`Collection '${COLLECTION_NAME}' not found. Creating...`);
            await qdrantClient.createCollection(COLLECTION_NAME, {
                vectors: {
                    size: VECTOR_DIMENSION,
                    distance: 'Cosine', // Common choice for semantic search
                },
            });
            console.log(`✅ Qdrant collection '${COLLECTION_NAME}' created.`);
        } else {
            console.log(`✅ Qdrant collection '${COLLECTION_NAME}' already exists.`);
        }
    } catch (err) {
        console.error('❌ Error initializing Qdrant:', err);
    }
}

export { qdrantClient, VECTOR_DIMENSION, COLLECTION_NAME };