# Build stage för React
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Installera ALLA dependencies för att kunna bygga React
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Installera bara produktionsberoenden för servern
COPY package*.json ./
RUN npm install --omit=dev

# Kopiera byggd React-app från builder
COPY --from=builder /app/build ./build

# Kopiera server-filen
COPY server.mjs .

# Exponera port
EXPOSE 5555

# Starta servern
CMD ["node", "server.mjs"]