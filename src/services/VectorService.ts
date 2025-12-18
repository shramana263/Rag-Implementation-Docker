import { qdrantClient, COLLECTION_NAME } from '../config/qdrant';
export interface QdrantPointStruct {
    id: number | string;
    vector: number[];
    payload?: Record<string, any>;
}
export interface ArticleChunkPayload {
    articleId: string;
    sourceUrl: string;
    text: string;
    chunkId: number;
}


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
        console.log(`Successfully stored ${points.length} vectors in Qdrant.`);

    } catch (error) {
        console.error('Error storing vectors in Qdrant:', error);
        throw new Error('Vector storage failed.');
    }
}

export async function searchVectors(queryVector: number[], k: number = 4): Promise<ArticleChunkPayload[]> {
    try {
        const results = await qdrantClient.search(COLLECTION_NAME, {
            vector: queryVector,
            limit: k,
            with_payload: true,
        });

        return results.map(hit => hit.payload as unknown as ArticleChunkPayload);

    } catch (error) {
        console.error('Error searching vectors in Qdrant:', error);
        throw new Error('Vector search failed.');
    }
}