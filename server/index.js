// Load environment variables from .env file if it exists
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const { PDFDocument, rgb, StandardFonts, degrees } = require('pdf-lib')

const app = express()
const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || '0.0.0.0'
const DB_PATH = path.join(__dirname, 'database', 'users.json')

// Middleware
// CORS configuration - allow requests from static IP and localhost for development
const corsOptions = {
  origin: [
    'http://99.64.152.69:3000',
    'http://99.64.152.69',
    'http://localhost:3000',
    'http://localhost'
  ],
  credentials: true
}
app.use(cors(corsOptions))
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

// Download PDF with watermark endpoint
app.get('/api/download-pdf', async (req, res) => {
  try {
    const { filePath, username } = req.query

    if (!filePath || !username) {
      return res.status(400).json({ success: false, message: 'File path and username are required' })
    }

    // Security: Only allow PDFs from public/product or public/case_study
    const normalizedPath = path.normalize(filePath).replace(/\\/g, '/')
    
    // Remove leading slash if present
    const cleanPath = normalizedPath.startsWith('/') ? normalizedPath.substring(1) : normalizedPath
    
    const isAllowed =
      cleanPath.startsWith('product/') || cleanPath.startsWith('case_study/')

    if (!isAllowed) {
      return res.status(403).json({ success: false, message: 'Access denied' })
    }

    // Resolve the file path relative to public folder
    const publicPath = path.join(__dirname, '..', 'public', cleanPath)
    
    // Check if file exists
    if (!fs.existsSync(publicPath)) {
      return res.status(404).json({ success: false, message: 'File not found' })
    }

    // Read the PDF file
    const existingPdfBytes = fs.readFileSync(publicPath)

    // Load the PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Get all pages
    const pages = pdfDoc.getPages()
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    // Add watermark to each page
    pages.forEach((page) => {
      const { width, height } = page.getSize()
      
      // Create watermark text
      const watermarkText = `Downloaded by: ${username}`
      const textSize = 12
      const textWidth = font.widthOfTextAtSize(watermarkText, textSize)
      
      // Position watermark at bottom center
      page.drawText(watermarkText, {
        x: (width - textWidth) / 2,
        y: 20,
        size: textSize,
        font: font,
        color: rgb(0.7, 0.7, 0.7), // Light gray color
        opacity: 0.5,
        rotate: degrees(0)
      })

      // Add diagonal watermark across the page
      const diagonalText = `${username}`
      const diagonalSize = 48
      const diagonalWidth = font.widthOfTextAtSize(diagonalText, diagonalSize)
      
      page.drawText(diagonalText, {
        x: (width - diagonalWidth) / 2,
        y: height / 2,
        size: diagonalSize,
        font: font,
        color: rgb(0.9, 0.9, 0.9),
        opacity: 0.15,
        rotate: degrees(-45)
      })
    })

    // Serialize the PDF
    const pdfBytes = await pdfDoc.save()

    // Set headers for PDF download
    const fileName = path.basename(publicPath)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.setHeader('Content-Length', pdfBytes.length)

    // Send the watermarked PDF
    res.send(Buffer.from(pdfBytes))
  } catch (error) {
    console.error('Watermark error:', error)
    res.status(500).json({ success: false, message: 'Failed to process PDF' })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
  console.log(`Accessible from: http://99.64.152.69:${PORT}`)
  console.log(`Database location: ${DB_PATH}`)
})
