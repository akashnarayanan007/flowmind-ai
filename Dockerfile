# ─── Stage 1: Build ───────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests and install
COPY package*.json ./
RUN npm ci --omit=dev=false

# Copy all source files and build the production bundle
COPY . .
RUN npm run build

# ─── Stage 2: Serve ───────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Install only the static file server
RUN npm install -g serve

# Copy the production build output from Stage 1
COPY --from=builder /app/dist ./dist

# Cloud Run injects PORT env var; default to 8080
ENV PORT=8080
EXPOSE 8080

# Serve the static build on the correct port
CMD ["sh", "-c", "serve -s dist -l ${PORT}"]
