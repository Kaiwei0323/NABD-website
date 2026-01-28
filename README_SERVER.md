# Backend Server Setup

The backend server runs on **port 3001** and stores user data in a JSON database.

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your settings
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://0.0.0.0:3001` (accessible from all network interfaces)

## Deployment on Static IP

When deploying to a server with static IP (e.g., 99.64.152.69):

1. The server is configured to listen on `0.0.0.0:3001` by default, allowing external connections
2. CORS is configured to allow requests from:
   - `http://99.64.152.69:3000` (frontend)
   - `http://99.64.152.69` (frontend without port)
   - `http://localhost:3000` (local development)
3. Make sure port 3001 is open in your firewall:
   ```bash
   # Ubuntu/Debian example
   sudo ufw allow 3001/tcp
   ```

4. Access the server at: `http://99.64.152.69:3001`

## Database

- **Location**: `server/database/users.json`
- **Format**: JSON file containing user array
- **Default Role**: `guest` (can be `admin`, `customer`, or `guest`)

## API Endpoints

### POST `/api/register`
Register a new user
- Body: `{ username, password, role? }` (role defaults to 'guest')
- Returns: `{ success, message, user }`

### POST `/api/login`
Login with credentials
- Body: `{ username, password }`
- Returns: `{ success, message, user }`

### GET `/api/user/:username`
Get user information
- Returns: `{ success, user }`

### GET `/api/users`
Get all users (for admin)
- Returns: `{ success, users }`

### PUT `/api/user/:username/role`
Update user role (for admin)
- Body: `{ role }`
- Returns: `{ success, message }`

### GET `/api/health`
Health check endpoint

## Running Frontend and Backend Together

From the root directory:
```bash
npm run dev:all
```

This will start both the frontend (port 3000) and backend (port 3001) simultaneously.

## Security Notes

- Passwords are hashed using bcryptjs
- CORS is enabled for localhost development
- User data is stored in JSON file (consider migrating to a proper database for production)
