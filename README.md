# RAG API design for News Intelligence

A production-ready Retrieval-Augmented Generation (RAG) system built with TypeScript, Express, and modern AI technologies. This API enables intelligent question-answering over a corpus of 50 news articles using vector similarity search and Google's Gemini AI.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client                               │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Express API (Node.js)                     │
│  ┌────────────┐  ┌────────────┐  ┌───────────────────┐      │
│  │ Ingestion  │  │   Chat     │  │    History        │      │
│  │ Controller │  │ Controller │  │   Controller      │      │
│  └─────┬──────┘  └─────┬──────┘  └────────┬──────────┘      │
│        │                │                   │               │
│  ┌─────▼──────┐  ┌─────▼──────┐  ┌────────▼──────────┐      │
│  │ Ingestion  │  │   Chat     │  │  Log + Cache      │      │
│  │  Service   │  │  Service   │  │   Services        │      │
│  └─────┬──────┘  └─────┬──────┘  └────────┬──────────┘      │
└────────┼────────────────┼───────────────────┼───────────────┘
         │                │                   │
         ▼                ▼                   ▼
┌────────────────┐ ┌────────────┐ ┌─────────────────┐
│    Qdrant      │ │   Redis    │ │   PostgreSQL    │
│ (Vector Store) │ │  (Cache)   │ │    (Logs)       │
└────────────────┘ └────────────┘ └─────────────────┘
         │                │
         │                ▼
         │         ┌─────────────────┐
         │         │  Gemini 2.5     │
         └────────►│  Flash (LLM)    │
                   └─────────────────┘
```

### Technology Stack

- **Runtime**: Node.js 20 (TypeScript)
- **Framework**: Express.js
- **Vector Database**: Qdrant
- **Cache**: Redis
- **SQL Database**: PostgreSQL
- **Embeddings**: Jina AI Embeddings v3 (1024-dimension)
- **LLM**: Google Gemini 2.5 Flash
- **Containerization**: Docker & Docker Compose
- **Text Processing**: LangChain Text Splitters

---


### Prerequisites

- Docker Desktop installed and running
- 8GB RAM minimum
- Ports available: 4000 (API), 6333 (Qdrant), 5432 (PostgreSQL), 6379 (Redis)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rag-api-project
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   GEMINI_API_KEY=put_gemini_api_key_here
   JINA_API_KEY=put_jina_api_key_here
   ```

   Get the API keys from:
   - Gemini: https://ai.google.dev/
   - Jina AI: https://jina.ai/embeddings/

3. **Start all services**
   ```bash
   docker compose up --build -d
   ```

4. **Verify services are running**
   ```bash
   docker compose ps
   ```
   
   All services should show "Up" status.

5. **Check API health**
   ```bash
   curl http://localhost:4000/
   ```
   
   Expected response:
   ```json
   {
     "status": "ok",
     "service": "RAG API for News Project"
   }
   ```



## API Documentation

### Base URL
```
http://localhost:4000/api
```

### Endpoints

#### 1. Ingest Documents

**POST** `/api/ingest`

It processes 50 news articles, generates embeddings, and stores vectors in Qdrant DB.

**Request**
```bash
curl -X POST http://localhost:4000/api/ingest
```

**Response** (200 OK)
```json
{
  "status": "success",
  "message": "Ingestion successful. Processed documents and stored 156 vectors in Qdrant.",
  "documents_processed": 50,
  "vectors_stored": 156
}
```

**Notes:**
- Typically generates ~150 chunks from 50 articles
- Processing time: 15-30 seconds
- Run this once before using the chat endpoint



#### 2. Chat / Asking Questions related to the news stored

**POST** `/api/chat`

Submit a query and receive an AI-generated response based on retrieved news articles.

**Request**
```bash
curl -X POST http://localhost:4000/api/chat \
  -H "Content-Type: application/json"
  -d '{
    "sessionId": "user123",
    "query": "What are the latest developments in renewable energy?"
  }'
```

**Request Body**
```json
{
  "sessionId": "string",  // Unique identifier for conversation context
  "query": "string"       // User's question
}
```

**Response** (200 OK)
```json
{
  "sessionId": "user123",
  "response": "Based on the provided news articles, the Ministry of Energy announced a major new policy framework designed to boost investment in offshore wind and solar power. The policy introduces significant tax subsidies for projects meeting strict environmental standards. [Source ID: a2, Chunk: 0]"
}
```

**Error Responses**

400 Bad Request
```json
{
  "status": "error",
  "message": "Missing required fields: sessionId and query."
}
```

500 Internal Server Error
```json
{
  "status": "error",
  "message": "Internal Server Error during RAG pipeline execution.",
  "details": "Error details here"
}
```

---

#### 3. Get Conversation History

**GET** `/api/history/:sessionId`

Retrieves the complete conversation history for a session from PostgreSQL.

**Request**
```bash
curl http://localhost:4000/api/history/user123
```

**Response** (200 OK)
```json
{
  "sessionId": "user123",
  "history": [
    {
      "id": 1,
      "session_id": "user123",
      "timestamp": "2025-12-15T10:30:00.000Z",
      "user_query": "What are the latest developments in renewable energy?",
      "llm_response": "Based on the provided news articles...",
      "response_time": 2.456
    }
  ]
}
```

---

#### 4. Clear Session History

**DELETE** `/api/history/:sessionId`

Deletes all conversation history for a session from both PostgreSQL and Redis.

**Request**
```bash
curl -X DELETE http://localhost:4000/api/history/user123
```

**Response** (200 OK)
```json
{
  "status": "success",
  "message": "Session user123 cleared. Deleted 3 SQL logs and 1 Redis keys."
}
```

---

## Development

### Local Development (Without Docker)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start databases** (keep Docker Compose for DBs only)
   ```bash
   docker compose up postgres redis qdrant -d
   ```

3. **Update .env for local connection**
   ```env
   POSTGRES_HOST=localhost
   REDIS_HOST=localhost
   QDRANT_HOST=localhost
   ```

4. **Run in development mode**
   ```bash
   npm run dev
   ```

### Build for Production

```bash
npm run build
npm start
```

### TypeScript Compilation

The project uses strict TypeScript:
```bash
npm run build  # Compiles src/ to dist/
```

---

## Project Structure

```
rag-api-project/
├── src/
│   ├── app.ts                    # Express app configuration
│   ├── server.ts                 # Server initialization with retry logic
│   ├── config/                   # Database configurations
│   │   ├── postgres.ts           # PostgreSQL connection pool
│   │   ├── redis.ts              # Redis client setup
│   │   └── qdrant.ts             # Qdrant vector DB client
│   ├── controllers/              # Route handlers
│   │   ├── ChatController.ts     # Chat endpoint logic
│   │   └── IngestionController.ts# Document ingestion logic
│   ├── services/                 # Business logic layer
│   │   ├── ChatService.ts        # RAG pipeline orchestration
│   │   ├── IngestionService.ts   # Document processing pipeline
│   │   ├── EmbeddingService.ts   # Jina embeddings integration
│   │   ├── VectorService.ts      # Qdrant operations
│   │   ├── CacheService.ts       # Redis caching operations
│   │   └── LogService.ts         # PostgreSQL logging
│   ├── routes/                   # API route definitions
│   │   ├── chatRoutes.ts
│   │   └── ingestionRoutes.ts
│   ├── types/                    # TypeScript type definitions
│   │   └── article.ts
│   └── data/                     # Mock data
│       └── mockNewsData.ts       # 50 news articles
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml            # Service orchestration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
├── .env                          # Environment variables (gitignored)
└── .env.example                  # Environment template
```



## RAG Pipeline Details

### Ingestion Pipeline

1. **Document Loading**: 50 pre-loaded news articles from `mockNewsData.ts`
2. **Chunking**: RecursiveCharacterTextSplitter
   - Chunk size: 1024 characters
   - Overlap: 128 characters
3. **Embedding Generation**: Jina Embeddings v3 (1024-dimensional vectors)
4. **Vector Storage**: Qdrant with cosine similarity

### Query Pipeline

1. **Retrieval**: 
   - Embed user query using Jina
   - Search Qdrant for top-4 most similar chunks
   - Cosine similarity ranking

2. **Augmentation**:
   - Inject retrieved context into prompt
   - Add system instructions
   - Include conversation history from Redis

3. **Generation**:
   - Stream response from Gemini 2.5 Flash
   - Store interaction in PostgreSQL
   - Update Redis cache with new conversation state



## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | No |
| `PORT` | API server port | `3000` | No |
| `GEMINI_API_KEY` | Google Gemini API key | - | **Yes** |
| `JINA_API_KEY` | Jina embeddings API key | - | **Yes** |
| `POSTGRES_USER` | PostgreSQL username | `rag_user` | No |
| `POSTGRES_PASSWORD` | PostgreSQL password | `rag_secret` | No |
| `POSTGRES_DB` | PostgreSQL database name | `rag_logs` | No |
| `POSTGRES_HOST` | PostgreSQL host | `postgres` | No |
| `POSTGRES_PORT` | PostgreSQL port | `5432` | No |
| `REDIS_HOST` | Redis host | `redis` | No |
| `REDIS_PORT` | Redis port | `6379` | No |
| `QDRANT_HOST` | Qdrant host | `qdrant` | No |
| `QDRANT_PORT` | Qdrant port | `6333` | No |

---

## Docker Services

### Service Details

| Service | Image | Ports | Purpose |
|---------|-------|-------|---------|
| **api** | Custom (Node 20) | 4000:3000 | Express API server |
| **postgres** | postgres:15-alpine | 5432 | Conversation logs & history |
| **redis** | redis:7-alpine | 6379 | Session context caching |
| **qdrant** | qdrant/qdrant:latest | 6333 | Vector similarity search |

### Volume Persistence

Data persists across container restarts:
- `postgres_data` - SQL logs
- `redis_data` - Cache snapshots
- `qdrant_storage` - Vector embeddings


## Database Schemas

### PostgreSQL: `interaction_logs` Table

```sql
CREATE TABLE interaction_logs (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_query TEXT NOT NULL,
    llm_response TEXT NOT NULL,
    response_time DECIMAL NOT NULL
);
```

### Redis: Cached Keys

```
chat:{sessionId}  →  JSON array of conversation messages
TTL: 3600 seconds (1 hour)
```

### Qdrant: `news_articles` Collection

```javascript
{
  id: number,
  vector: number[1024],
  payload: {
    articleId: string,
    sourceUrl: string,
    text: string,
    chunkId: number
  }
}
```

---

## Testing

### Manual Testing Workflow

1. **Start the system**
   ```bash
   docker compose up -d
   ```

2. **Ingest documents**
   ```bash
   curl -X POST http://localhost:4000/api/ingest
   ```

3. **Ask a question**
   ```bash
   curl -X POST http://localhost:4000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"sessionId":"test1","query":"What is happening with AI technology?"}'
   ```

4. **Check history**
   ```bash
   curl http://localhost:4000/api/history/test1
   ```

5. **Clear history**
   ```bash
   curl -X DELETE http://localhost:4000/api/history/test1
   ```

### Sample Queries

- "What are the latest developments in renewable energy?"
- "Tell me about semiconductor chip shortages"
- "What is Edwid Tech working on?"
- "Summarize news about AI and machine learning"
- "What are the cybersecurity threats mentioned?"

---

## Troubleshooting

### Services Won't Start

**Issue**: `docker compose up` fails

**Solutions**:
1. Check if ports are already in use:
   ```bash
   netstat -ano | findstr :4000
   netstat -ano | findstr :6333
   ```
2. Stop conflicting services or change ports in `docker-compose.yml`
3. Ensure Docker Desktop has enough resources (8GB RAM minimum)

### "Cannot connect to database" Errors

**Issue**: API can't reach PostgreSQL/Redis/Qdrant

**Solutions**:
1. Wait 30 seconds for services to initialize
2. Check service health:
   ```bash
   docker compose ps
   ```
3. View logs:
   ```bash
   docker compose logs postgres
   docker compose logs redis
   docker compose logs qdrant
   ```

### Embedding API Errors

**Issue**: 401/403 errors when generating embeddings

**Solutions**:
1. Verify API keys in `.env`:
   ```bash
   cat .env | grep API_KEY
   ```
2. Ensure keys are valid and have quota remaining
3. Check Jina AI dashboard: https://jina.ai/

### Out of Memory Errors

**Issue**: Services crash with OOM errors

**Solutions**:
1. Increase Docker Desktop memory limit
2. Reduce chunk processing batch size in `IngestionService.ts`
3. Process articles in smaller batches



## Performance Considerations

- **Ingestion**: ~20-30 seconds for 50 articles
- **Chat Response**: 1-3 seconds average
- **Memory Usage**: ~2GB total across all services
- **Concurrent Users**: Scales to 100+ with proper resources

### Optimization Tips

1. **Caching**: Redis caching reduces response time by 40%
2. **Connection Pooling**: PostgreSQL pool size set to 20
3. **Vector Search**: Top-4 retrieval balances accuracy and speed
4. **Chunking Strategy**: 1024 chars maintains semantic coherence


Thank you