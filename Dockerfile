# Build stage för React
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Installera bara produktionsberoenden för servern
COPY package*.json ./
RUN npm ci --only=production

# Kopiera byggd React-app från builder
COPY --from=builder /app/build ./build

# Kopiera server-filen
COPY server.mjs .

# Skapa .env fil (du kan också montera denna via Portainer)
# COPY .env .

# Exponera port
EXPOSE 5555

# Starta servern
CMD ["node", "server.mjs"]