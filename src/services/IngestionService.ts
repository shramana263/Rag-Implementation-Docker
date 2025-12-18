import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { embedDocuments } from './EmbeddingService';
import { storeVectors, ArticleChunkPayload, QdrantPointStruct } from './VectorService';
import { mockNewsArticles } from '../data/mockNewsData';
import { RawArticle } from '../types/article';

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1024, 
    chunkOverlap: 128,
});

export async function runIngestionPipeline(): Promise<number> {
    console.log('Starting RAG Ingestion Pipeline ---');
    const articles: RawArticle[] = mockNewsArticles; 

    if (articles.length === 0) {
        console.warn('No articles found in mockNewsData. Ingestion skipped.');
        return 0;
    }

    let allChunks: { text: string, article: RawArticle, chunkId: number }[] = [];
    let totalChunks = 0;
    for (const article of articles) {
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

    try {
        const embeddings: number[][] = await embedDocuments(chunkTexts);
        console.log(`Generated ${embeddings.length} embeddings using Jina Embeddings.`);
        
        if (embeddings.length !== totalChunks) {
            console.error('Mismatch between chunk count and embedding count. Aborting storage.');
            throw new Error('Embedding generation failed for all chunks.');
        }
        const points: QdrantPointStruct[] = allChunks.map((chunk, index) => {
            const payload: ArticleChunkPayload = {
                articleId: chunk.article.id,
                sourceUrl: chunk.article.url,
                text: chunk.text,
                chunkId: chunk.chunkId,
            };
            
            return {
                id: index, 
                vector: embeddings[index],
                payload: payload,
            } as QdrantPointStruct;
        });

        await storeVectors(points);
        console.log('Ingestion Pipeline Finished Successfully ---');
        
        return totalChunks;

    } catch (error) {
        console.error('Ingestion failed during embedding or storage steps:', error);
        throw new Error('Ingestion pipeline failed.');
    }
}