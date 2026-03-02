# Docker setup

This project runs in two containers:

| Service | Port | URL |
|---------|------|-----|
| Backend (database server) | 3001 | http://99.64.152.69:3001 |
| Frontend (Vite dev server) | 3000 | http://99.64.152.69:3000 |

## Prerequisites

- Docker and Docker Compose installed on the host (99.64.152.69 or your machine).

## Commands (from project root)

```bash
# Build and start both containers
docker compose up --build

# Run in background
docker compose up -d --build

# Stop
docker compose down

# View logs
docker compose logs -f
```

## What runs where

- **server** container: `cd server` → `npm run dev` (nodemon), serves API and reads/writes `server/database/`. The `server-data` volume keeps the database across restarts.
- **web** container: `npm run dev -- --host 0.0.0.0` (Vite). Your project directory is mounted so code changes are picked up by Vite; `node_modules` stays from the image so installs stay correct.

## Rebuild after dependency changes

If you change `package.json` or `server/package.json`:

```bash
docker compose up --build
```

## Access from host

From the host (e.g. 99.64.152.69), open:

- Website: http://99.64.152.69:3000  
- API: http://99.64.152.69:3001  
- Health: http://99.64.152.69:3001/api/health  

The frontend is already configured to call the API at `http://99.64.152.69:3001/api` (see `src/context/AuthContext.jsx`).
