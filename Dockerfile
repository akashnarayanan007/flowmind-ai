# ─── Stage 1: Build ───────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install ALL deps (devDependencies needed for vite build)
COPY package*.json ./
RUN npm ci

# Copy source and build production bundle
COPY . .
RUN npm run build

# ─── Stage 2: Serve ───────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Install static file server
RUN npm install -g serve

# Copy built output from Stage 1
COPY --from=builder /app/dist ./dist

# Cloud Run sets PORT automatically; default to 8080
ENV PORT=8080
EXPOSE 8080

CMD ["sh", "-c", "serve -s dist -l ${PORT}"]
