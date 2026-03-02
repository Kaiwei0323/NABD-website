# Backend (database) server - build from repo root: docker build -f server/Dockerfile .
FROM node:20-alpine

WORKDIR /app

# Copy public folder (server serves PDFs from ../public)
COPY public ./public

# Install server dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy server code
COPY server ./server

WORKDIR /app/server

EXPOSE 3001

# Listen on all interfaces for Docker
ENV HOST=0.0.0.0
CMD ["npm", "run", "dev"]
