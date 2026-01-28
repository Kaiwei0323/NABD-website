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

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3001`

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
