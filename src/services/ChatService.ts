// /src/services/ChatService.ts

import { GoogleGenAI } from '@google/genai';
import { embedQuery } from './EmbeddingService';
import { searchVectors, ArticleChunkPayload } from './VectorService';
import { getContext, setContext } from './CacheService'; 
import { saveInteraction } from './LogService';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 
const MODEL = "gemini-2.5-flash"; // Excellent balance of speed and capability for RAG

// --- Type for RAG History ---
interface Message {
    role: "user" | "model";
    parts: { text: string }[];
}

// --- CORE SYSTEM PROMPT ---
const SYSTEM_INSTRUCTION = `
You are an expert News Intelligence Bot. Your primary function is to answer questions 
based **ONLY** on the context provided below from news articles.
If the context does not contain the answer, state clearly, "I apologize, but the required information 
is not available in the provided news articles." Do not use outside knowledge.
Format your answer clearly, referencing specific news sources or topics where possible.
`;


/**
 * Orchestrates the full RAG pipeline for a user query.
 */
export async function processChatQuery(sessionId: string, userQuery: string): Promise<string> {
    const startTime = Date.now();

    // 1. Retrieve Conversation Context (Short-Term Memory)
    let history: Message[] = (await getContext(sessionId)) || [];

    // 2. Retrieval Step (Vector Search)
    const queryVector: number[] = await embedQuery(userQuery);
    // Retrieve top 4 relevant chunks
    const retrievedChunks: ArticleChunkPayload[] = await searchVectors(queryVector, 4);

    // 3. Augmentation Step (Prompt Construction)
    const contextText = retrievedChunks.map(c => `[Source ID: ${c.articleId}, Chunk: ${c.chunkId}] ${c.text}`).join('\n---\n');

    // Combine history, context, and instruction for the API call
    const fullPrompt = `
        SYSTEM INSTRUCTION: ${SYSTEM_INSTRUCTION}
        
        --- NEWS CONTEXT ---
        ${contextText}
        --- USER QUERY ---
        ${userQuery}
    `;
    
    // Append the current user message to the history for the API call
    history.push({ role: "user", parts: [{ text: fullPrompt }] });

    // 4. Generation Step (Gemini API Call)
    const responseStream = await ai.models.generateContentStream({
        model: MODEL,
        contents: history,
    });
    
    let llmResponse = '';
    // Collect the streamed response
    for await (const chunk of responseStream) {
        llmResponse += chunk.text;
    }
    
    const endTime = Date.now();
    const responseTime = (endTime - startTime) / 1000; // Time in seconds

    // 5. Persistence and Caching
    
    // Log the interaction (Mandatory for SQL)
    await saveInteraction(sessionId, userQuery, llmResponse, responseTime);

    // Update Redis Cache (Mandatory for chat feel)
    // Only store the user query and the LLM's final generated text for the next turn
    const newHistory = [
        ...history,
        { role: "model", parts: [{ text: llmResponse }] }
    ];
    await setContext(sessionId, newHistory);
    
    return llmResponse;
}