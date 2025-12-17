// /src/config/swagger.ts

import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'RAG API for News Intelligence',
        version: '1.0.0',
        description: `
A production-ready Retrieval-Augmented Generation (RAG) system that enables intelligent 
question-answering over a corpus of 50 news articles using vector similarity search and Google's Gemini AI.

## Features
- 🔍 Semantic search with Qdrant vector database
- 🤖 AI-powered responses using Gemini 2.5 Flash
- 💾 PostgreSQL for interaction logs and analytics
- ⚡ Redis caching for conversation context
- 🐳 Fully containerized with Docker Compose

## Technology Stack
- **Runtime**: Node.js 20 with TypeScript
- **Framework**: Express.js
- **Vector DB**: Qdrant
- **Cache**: Redis
- **SQL DB**: PostgreSQL
- **Embeddings**: Jina AI Embeddings v3 (1024-dim)
- **LLM**: Google Gemini 2.5 Flash
        `.trim(),
        contact: {
            name: 'Edwid Tech PVT LTD',
            email: 'support@edwidtech.com',
        },
        license: {
            name: 'Proprietary',
        },
    },
    servers: [
        {
            url: 'http://localhost:4000',
            description: 'Local Development Server',
        },
        {
            url: 'http://localhost:4000/api',
            description: 'API Base Path',
        },
    ],
    tags: [
        {
            name: 'Health',
            description: 'Health check and status endpoints',
        },
        {
            name: 'Ingestion',
            description: 'Document processing and vector storage operations',
        },
        {
            name: 'Chat',
            description: 'RAG-powered question answering',
        },
        {
            name: 'History',
            description: 'Conversation logs and session management',
        },
    ],
    components: {
        schemas: {
            HealthResponse: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        example: 'ok',
                    },
                    service: {
                        type: 'string',
                        example: 'Scalable RAG API for News Intelligence',
                    },
                },
            },
            IngestionResponse: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        example: 'success',
                    },
                    message: {
                        type: 'string',
                        example: 'Ingestion successful. Processed documents and stored 156 vectors in Qdrant.',
                    },
                    documents_processed: {
                        type: 'integer',
                        example: 50,
                    },
                    vectors_stored: {
                        type: 'integer',
                        example: 156,
                    },
                },
            },
            ChatRequest: {
                type: 'object',
                required: ['sessionId', 'query'],
                properties: {
                    sessionId: {
                        type: 'string',
                        description: 'Unique identifier for the conversation session',
                        example: 'user123',
                    },
                    query: {
                        type: 'string',
                        description: 'User question or prompt',
                        example: 'What are the latest developments in renewable energy?',
                    },
                },
            },
            ChatResponse: {
                type: 'object',
                properties: {
                    sessionId: {
                        type: 'string',
                        example: 'user123',
                    },
                    response: {
                        type: 'string',
                        example: 'Based on the provided news articles, the Ministry of Energy announced a major new policy framework...',
                    },
                },
            },
            InteractionLog: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        example: 1,
                    },
                    session_id: {
                        type: 'string',
                        example: 'user123',
                    },
                    timestamp: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-12-17T10:30:00.000Z',
                    },
                    user_query: {
                        type: 'string',
                        example: 'What are the latest developments in renewable energy?',
                    },
                    llm_response: {
                        type: 'string',
                        example: 'Based on the provided news articles...',
                    },
                    response_time: {
                        type: 'number',
                        format: 'decimal',
                        example: 2.456,
                        description: 'Response time in seconds',
                    },
                },
            },
            HistoryResponse: {
                type: 'object',
                properties: {
                    sessionId: {
                        type: 'string',
                        example: 'user123',
                    },
                    history: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/InteractionLog',
                        },
                    },
                },
            },
            ClearHistoryResponse: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        example: 'success',
                    },
                    message: {
                        type: 'string',
                        example: 'Session user123 cleared. Deleted 3 SQL logs and 1 Redis keys.',
                    },
                },
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        example: 'error',
                    },
                    message: {
                        type: 'string',
                        example: 'Error description',
                    },
                    details: {
                        type: 'string',
                        description: 'Additional error details (only in development mode)',
                    },
                },
            },
        },
    },
};

const options: swaggerJsdoc.Options = {
    definition: swaggerDefinition,
    // Path to the API routes files with JSDoc annotations
    apis: [
        './src/routes/*.ts',
        './src/controllers/*.ts',
        './src/app.ts',
    ],
};

export const swaggerSpec = swaggerJsdoc(options);
