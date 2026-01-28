# Deployment Guide

This guide explains how to deploy the application to a server with static IP address (99.64.152.69).

## Prerequisites

- Node.js (v16 or higher) installed on the server
- npm or yarn
- Firewall configured to allow traffic on ports 3000 (frontend) and 3001 (backend)
- Static IP address: 99.64.152.69

## Server Configuration

### 1. Backend Server Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create `.env` file for custom configuration:
```bash
cp .env.example .env
# Edit .env if needed (defaults work for most cases)
```

4. The server is configured to:
   - Listen on `0.0.0.0:3001` (accessible from all network interfaces)
   - Accept CORS requests from `http://99.64.152.69:3000` and `http://localhost:3000`

5. Start the server:
```bash
# Production
npm start

# Development (with auto-reload)
npm run dev
```

### 2. Frontend Setup

1. In the root directory, install dependencies:
```bash
npm install
```

2. (Optional) Create `.env` file for API URL:
```bash
cp .env.example .env
# The default API_URL is already set to http://99.64.152.69:3001/api
```

3. Build the frontend for production:
```bash
npm run build
```

4. The built files will be in the `dist` folder. You can serve them using:
   - A web server (nginx, Apache)
   - A static file server
   - Or use Vite preview: `npm run preview` (runs on port 4173 by default)

### 3. Firewall Configuration

Make sure ports 3000 (frontend) and 3001 (backend) are open:

```bash
# Ubuntu/Debian example
sudo ufw allow 3000/tcp
sudo ufw allow 3001/tcp
sudo ufw reload
```

## Configuration Summary

### Backend (server/index.js)
- **Host**: `0.0.0.0` (listens on all interfaces)
- **Port**: `3001` (configurable via PORT env variable)
- **CORS**: Allows requests from static IP and localhost

### Frontend (src/context/AuthContext.jsx)
- **API URL**: `http://99.64.152.69:3001/api` (default)
- Can be overridden with `VITE_API_URL` environment variable

## Accessing the Application

- **Frontend**: `http://99.64.152.69:3000` (or your configured port)
- **Backend API**: `http://99.64.152.69:3001`
- **Health Check**: `http://99.64.152.69:3001/api/health`

## Production Recommendations

1. **Use a Process Manager**: Consider using PM2 or systemd to keep the server running:
```bash
npm install -g pm2
pm2 start server/index.js --name inventec-server
pm2 save
pm2 startup
```

2. **Use a Reverse Proxy**: Set up nginx or Apache as a reverse proxy for better security and SSL support

3. **Environment Variables**: Use `.env` files for sensitive configuration (already in .gitignore)

4. **Database**: Consider migrating from JSON file to a proper database (PostgreSQL, MongoDB) for production

5. **SSL/HTTPS**: Set up SSL certificates (Let's Encrypt) for secure connections

## Troubleshooting

- **Connection refused**: Check firewall settings and ensure ports are open
- **CORS errors**: Verify the frontend URL is in the CORS allowed origins list
- **API not reachable**: Ensure the server is listening on `0.0.0.0` not `localhost`
