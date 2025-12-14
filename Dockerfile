# ----------------------------------------------------
# Stage 1: Build Stage (Handles TypeScript Compilation)
# ----------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compile TypeScript code (requires tsconfig.json)
RUN npm run build

# ----------------------------------------------------
# Stage 2: Production Stage (Smaller and Optimized)
# ----------------------------------------------------
FROM node:20-alpine AS production

WORKDIR /app

# Copy package.json and install production dependencies only
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copy compiled JavaScript code (the application logic)
COPY --from=builder /app/dist ./dist

# CRITICAL FIX: Copy the .env file for runtime configuration 
# Note: Docker Compose handles passing env vars at runtime, but sometimes Node.js
# applications expect the file to be present depending on setup.
# If you are NOT using an --env-file flag in compose, the best practice is to NOT copy the .env file
# and instead rely on the `environment:` block in docker-compose.yml.
# However, if your application uses a library like `dotenv` inside `dist/server.js`, 
# the file MUST be here. Let's add it for robustness:
COPY .env ./.env

EXPOSE 3000

CMD [ "node", "dist/server.js" ]