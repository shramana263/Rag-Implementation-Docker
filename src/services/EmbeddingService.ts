import { JinaEmbeddings } from '@langchain/community/embeddings/jina';
const JINA_MODEL = "jina-embeddings-v3"; 

const jinaEmbeddings = new JinaEmbeddings({
    apiKey: process.env.JINA_API_KEY, 
    model: JINA_MODEL,
});

export async function embedQuery(text: string): Promise<number[]> {
    return jinaEmbeddings.embedQuery(text);
}

export async function embedDocuments(texts: string[]): Promise<number[][]> {
    return jinaEmbeddings.embedDocuments(texts);
}