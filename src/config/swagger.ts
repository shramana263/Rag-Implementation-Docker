// /src/config/swagger.ts

import swaggerJsdoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-ui-express';

const swaggerDefinition: any = {
    openapi: '3.0.0',
    info: {
        title: 'RAG API for News Intelligence',
        version: '1.0.0',
        description: `A production-ready Retrieval-Augmented Generation (RAG) system that enables intelligent question-answering over a corpus of 50 news articles using vector similarity search and Google's Gemini AI.`,
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
    paths: {
        '/': {
            get: {
                tags: ['Health'],
                summary: 'Health check endpoint',
                description: 'Returns the API status and service name',
                responses: {
                    '200': {
                        description: 'Service is running',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/HealthResponse' }
                            }
                        }
                    }
                }
            }
        },
        '/api/ingest': {
            post: {
                tags: ['Ingestion'],
                summary: 'Ingest documents into the vector database',
                description: 'Processes 50 news articles through the RAG pipeline: chunks documents, generates embeddings, and stores vectors in Qdrant',
                responses: {
                    '200': {
                        description: 'Documents successfully ingested',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/IngestionResponse' }
                            }
                        }
                    },
                    '500': {
                        description: 'Ingestion failed',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse' }
                            }
                        }
                    }
                }
            }
        },
        '/api/chat': {
            post: {
                tags: ['Chat'],
                summary: 'Ask a question using RAG pipeline',
                description: 'Submit a query and receive an AI-generated response based on retrieved news articles',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ChatRequest' },
                            examples: {
                                renewable_energy: {
                                    summary: 'Ask about renewable energy',
                                    value: {
                                        sessionId: 'user123',
                                        query: 'What are the latest developments in renewable energy?'
                                    }
                                },
                                ai_technology: {
                                    summary: 'Ask about AI',
                                    value: {
                                        sessionId: 'user456',
                                        query: 'Tell me about AI technology advancements'
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ChatResponse' }
                            }
                        }
                    },
                    '400': {
                        description: 'Missing required fields',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse' }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal server error',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse' }
                            }
                        }
                    }
                }
            }
        },
        '/api/history/{sessionId}': {
            get: {
                tags: ['History'],
                summary: 'Retrieve conversation history for a session',
                description: 'Fetches all past interactions for a specific session from PostgreSQL',
                parameters: [
                    {
                        in: 'path',
                        name: 'sessionId',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Unique session identifier',
                        example: 'user123'
                    }
                ],
                responses: {
                    '200': {
                        description: 'History retrieved successfully',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/HistoryResponse' }
                            }
                        }
                    },
                    '500': {
                        description: 'Failed to retrieve history',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse' }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['History'],
                summary: 'Clear session history',
                description: 'Deletes all conversation data for a session from both PostgreSQL and Redis',
                parameters: [
                    {
                        in: 'path',
                        name: 'sessionId',
                        required: true,
                        schema: { type: 'string' },
                        description: 'Unique session identifier',
                        example: 'user123'
                    }
                ],
                responses: {
                    '200': {
                        description: 'History cleared successfully',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ClearHistoryResponse' }
                            }
                        }
                    },
                    '500': {
                        description: 'Failed to clear history',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/ErrorResponse' }
                            }
                        }
                    }
                }
            }
        }
    }
};

// Export the spec directly
export const swaggerSpec = swaggerDefinition;
