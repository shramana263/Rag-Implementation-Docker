import { QdrantClient } from '@qdrant/qdrant-js';

const qdrantClient = new QdrantClient({
    host: process.env.QDRANT_HOST || 'qdrant', 
    port: parseInt(process.env.QDRANT_PORT || '6333', 10), 
});

const VECTOR_DIMENSION = 1024; 
const COLLECTION_NAME = 'news_articles';
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
                    distance: 'Cosine',
                },
            });
            console.log(`qdrant collection '${COLLECTION_NAME}' created.`);
        } else {
            console.log(`qdrant collection '${COLLECTION_NAME}' already exists.`);
        }
    } catch (err) {
        console.error('Error initializing qdrant:', err);
    }
}

export { qdrantClient, VECTOR_DIMENSION, COLLECTION_NAME };