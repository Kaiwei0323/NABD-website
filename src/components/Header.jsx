import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'

const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/Inventec_Logo.jpg" alt="Inventec Logo" className="logo-img" />
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/product" className="nav-link">Product</Link>
          <Link to="/resource" className="nav-link">Resource</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          {user ? (
            <>
              <span className="user-welcome">
                Welcome, {user.username} <span className="user-role">({user.role})</span>
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link login-link">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
