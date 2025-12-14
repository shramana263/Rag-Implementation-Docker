// /src/services/IngestionService.ts

import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { embedDocuments } from './EmbeddingService';
import { storeVectors, ArticleChunkPayload, QdrantPointStruct } from './VectorService';
import { mockNewsArticles } from '../data/mockNwesData';
import { RawArticle } from '../types/article'; // Assuming you created this file

// Define Text Splitter
const splitter = new RecursiveCharacterTextSplitter({
    // Standard setting for RAG chunking: aiming for ~1000 characters per chunk
    chunkSize: 1024, 
    chunkOverlap: 128,
});

/**
 * Main pipeline to process documents, generate embeddings, and store them.
 * This function implements the RAG Pipeline & Ingestion objectives.
 * @returns {Promise<number>} The total number of vectors stored.
 */
export async function runIngestionPipeline(): Promise<number> {
    console.log('--- Starting RAG Ingestion Pipeline ---');
    
    // Load your ~50 news articles.
    const articles: RawArticle[] = mockNewsArticles; 

    if (articles.length === 0) {
        console.warn('No articles found in mockNewsData. Ingestion skipped.');
        return 0;
    }

    let allChunks: { text: string, article: RawArticle, chunkId: number }[] = [];
    let totalChunks = 0;

    // 1. Chunking Process
    for (const article of articles) {
        // Use the RecursiveCharacterTextSplitter to split the full content
        const chunks: string[] = await splitter.splitText(article.content);
        
        chunks.forEach((text, index) => {
            allChunks.push({
                text: text,
                article: article,
                chunkId: index
            });
        });
        totalChunks += chunks.length;
    }
    console.log(`Split ${articles.length} articles into ${totalChunks} total chunks.`);

    const chunkTexts = allChunks.map(c => c.text);

    // 2. Embedding Generation (Vector Processing)
    try {
        const embeddings: number[][] = await embedDocuments(chunkTexts);
        console.log(`Generated ${embeddings.length} embeddings using Jina Embeddings.`);
        
        if (embeddings.length !== totalChunks) {
            console.error('Mismatch between chunk count and embedding count. Aborting storage.');
            throw new Error('Embedding generation failed for all chunks.');
        }

        // 3. Prepare Points for Qdrant Upsert (Vector Storage)
        const points: QdrantPointStruct[] = allChunks.map((chunk, index) => {
            const payload: ArticleChunkPayload = {
                articleId: chunk.article.id,
                sourceUrl: chunk.article.url,
                text: chunk.text,
                chunkId: chunk.chunkId,
            };
            
            // Create a unique ID for the point (vector)
            return {
                id: `${chunk.article.id}_${chunk.chunkId}`, 
                vector: embeddings[index],
                payload: payload,
            } as QdrantPointStruct;
        });

        // 4. Vector Storage
        await storeVectors(points);
        console.log('--- Ingestion Pipeline Finished Successfully ---');
        
        return totalChunks;

    } catch (error) {
        console.error('❌ Ingestion failed during embedding or storage steps:', error);
        throw new Error('Ingestion pipeline failed.');
    }
}