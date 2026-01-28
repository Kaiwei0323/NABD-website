const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3001
const DB_PATH = path.join(__dirname, 'database', 'users.json')

// Middleware
app.use(cors())
app.use(express.json())

// Ensure database directory exists
const dbDir = path.dirname(DB_PATH)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// Initialize database if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2))
}

// Helper function to read users from database
const readUsers = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Helper function to write users to database
const writeUsers = (users) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2))
}

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, role = 'guest' } = req.body

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
    }

    // Validate role
    const validRoles = ['admin', 'customer', 'guest']
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' })
    }

    const users = readUsers()

    // Check if username already exists
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ success: false, message: 'Username already exists' })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      passwordHash,
      role: role || 'guest',
      createdAt: new Date().toISOString()
    }

    // Save to database
    users.push(newUser)
    writeUsers(users)

    res.json({ success: true, message: 'Registration successful', user: { username: newUser.username, role: newUser.role } })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' })
    }

    const users = readUsers()

    // Find user
    const user = users.find(u => u.username === username)

    if (!user) {
      return res.status(401).json({ success: false, message: 'Username not found' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)

    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Incorrect password' })
    }

    // Return user info (without password)
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        username: user.username,
        role: user.role,
        loggedInAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Get user info endpoint
app.get('/api/user/:username', (req, res) => {
  try {
    const { username } = req.params
    const users = readUsers()
    const user = users.find(u => u.username === username)

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    // Return user info without password
    res.json({
      success: true,
      user: {
        username: user.username,
        role: user.role,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Get all users endpoint (admin only)
app.get('/api/users', (req, res) => {
  try {
    const users = readUsers()
    // Return users without passwords
    const safeUsers = users.map(u => ({
      id: u.id,
      username: u.username,
      role: u.role,
      createdAt: u.createdAt
    }))
    res.json({ success: true, users: safeUsers })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Update user role endpoint (admin only)
app.put('/api/user/:username/role', (req, res) => {
  try {
    const { username } = req.params
    const { role } = req.body

    const validRoles = ['admin', 'customer', 'guest']
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' })
    }

    const users = readUsers()
    const userIndex = users.findIndex(u => u.username === username)

    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    users[userIndex].role = role
    writeUsers(users)

    res.json({ success: true, message: 'Role updated successfully' })
  } catch (error) {
    console.error('Update role error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log(`Database location: ${DB_PATH}`)
})
