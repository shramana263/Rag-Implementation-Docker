// /src/routes/chatRoutes.ts

import { Router } from 'express';
import { chat, getSessionHistory, deleteSessionHistory } from '../controllers/ChatController';

const router = Router();

/**
 * @openapi
 * /api/chat:
 *   post:
 *     tags:
 *       - Chat
 *     summary: Ask a question using RAG pipeline
 *     description: |
 *       Submit a query and receive an AI-generated response based on retrieved news articles.
 *       
 *       **RAG Pipeline Steps:**
 *       1. **Retrieval**: Embeds query and searches Qdrant for top-4 similar chunks
 *       2. **Augmentation**: Injects retrieved context into prompt with system instructions
 *       3. **Generation**: Streams response from Gemini 2.5 Flash
 *       4. **Persistence**: Logs interaction to PostgreSQL and caches context in Redis
 *       
 *       **Conversation Context:**
 *       - Uses sessionId to maintain conversation history
 *       - Context cached in Redis (1 hour TTL)
 *       - All interactions logged in PostgreSQL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *           examples:
 *             renewable_energy:
 *               summary: Ask about renewable energy
 *               value:
 *                 sessionId: "user123"
 *                 query: "What are the latest developments in renewable energy?"
 *             ai_technology:
 *               summary: Ask about AI
 *               value:
 *                 sessionId: "user456"
 *                 query: "Tell me about AI technology advancements"
 *             chip_shortage:
 *               summary: Ask about chip shortage
 *               value:
 *                 sessionId: "user789"
 *                 query: "What is causing the semiconductor chip shortage?"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: "error"
 *               message: "Missing required fields: sessionId and query."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/chat', chat);

/**
 * @openapi
 * /api/history/{sessionId}:
 *   get:
 *     tags:
 *       - History
 *     summary: Retrieve conversation history for a session
 *     description: |
 *       Fetches all past interactions for a specific session from PostgreSQL.
 *       Includes timestamps, queries, responses, and response times for analytics.
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique session identifier
 *         example: "user123"
 *     responses:
 *       200:
 *         description: History retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistoryResponse'
 *       500:
 *         description: Failed to retrieve history
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/history/:sessionId', getSessionHistory);

/**
 * @openapi
 * /api/history/{sessionId}:
 *   delete:
 *     tags:
 *       - History
 *     summary: Clear session history
 *     description: |
 *       Deletes all conversation data for a session from both:
 *       - PostgreSQL (interaction logs)
 *       - Redis (cached conversation context)
 *       
 *       Use this to reset a conversation or for GDPR compliance.
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique session identifier
 *         example: "user123"
 *     responses:
 *       200:
 *         description: History cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClearHistoryResponse'
 *       500:
 *         description: Failed to clear history
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/history/:sessionId', deleteSessionHistory);

export default router;