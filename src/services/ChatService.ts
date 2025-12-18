import { GoogleGenAI } from '@google/genai';
import { embedQuery } from './EmbeddingService';
import { searchVectors, ArticleChunkPayload } from './VectorService';
import { getContext, setContext } from './CacheService'; 
import { saveInteraction } from './LogService';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 
const MODEL = "gemini-2.5-flash";

interface Message {
    role: "user" | "model";
    parts: { text: string }[];
}

//CORE SYSTEM PROMPT ---
const SYSTEM_INSTRUCTION = `
You are an expert News Intelligence Bot. Your primary function is to answer questions 
based **ONLY** on the context provided below from news articles.
If the context does not contain the answer, state clearly, "I apologize, but the required information 
is not available in the provided news articles." Do not use outside knowledge.
Format your answer clearly, referencing specific news sources or topics where possible.
`;

export async function processChatQuery(sessionId: string, userQuery: string): Promise<string> {
    const startTime = Date.now();

    let history: Message[] = (await getContext(sessionId)) || [];
    const queryVector: number[] = await embedQuery(userQuery);
    const retrievedChunks: ArticleChunkPayload[] = await searchVectors(queryVector, 4);

    const contextText = retrievedChunks.map(c => `[Source ID: ${c.articleId}, Chunk: ${c.chunkId}] ${c.text}`).join('\n---\n');

    const fullPrompt = `
        SYSTEM INSTRUCTION: ${SYSTEM_INSTRUCTION}
        
        --- NEWS CONTEXT ---
        ${contextText}
        --- USER QUERY ---
        ${userQuery}
    `;
    
    history.push({ role: "user", parts: [{ text: fullPrompt }] });
    const responseStream = await ai.models.generateContentStream({
        model: MODEL,
        contents: history,
    });
    
    let llmResponse = '';
    for await (const chunk of responseStream) {
        llmResponse += chunk.text;
    }
    
    const endTime = Date.now();
    const responseTime = (endTime - startTime) / 1000; 
    await saveInteraction(sessionId, userQuery, llmResponse, responseTime);

    const newHistory = [
        ...history,
        { role: "model", parts: [{ text: llmResponse }] }
    ];
    await setContext(sessionId, newHistory);
    
    return llmResponse;
}