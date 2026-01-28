import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)
const API_URL = 'http://localhost:3001/api'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const register = async (username, password, role = 'guest') => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      })

      const data = await response.json()

      if (data.success) {
        // Store user in localStorage for session persistence
        const currentUser = { username: data.user.username, role: data.user.role, loggedInAt: new Date().toISOString() }
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        setUser(currentUser)
      }

      return data
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, message: 'Failed to connect to server' }
    }
  }

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Store user in localStorage for session persistence
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        setUser(data.user)
      }

      return data
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Failed to connect to server' }
    }
  }

  const logout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
