// /src/routes/chatRoutes.ts

import { Router } from 'express';
import { chat, getSessionHistory, deleteSessionHistory } from '../controllers/ChatController';

const router = Router();

// POST /chat
router.post('/chat', chat);

// GET /history/:sessionId
router.get('/history/:sessionId', getSessionHistory);

// DELETE /history/:sessionId
router.delete('/history/:sessionId', deleteSessionHistory);

export default router;