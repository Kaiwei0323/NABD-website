import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Inventec North America</h3>
            <p>High-performance, AI-ready edge devices for real-time processing and seamless deployment.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/product">Product</Link></li>
              <li><Link to="/resource">Resource</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:NABUsales@inventec.com">NABUsales@inventec.com</a>
              </li>
              <li>5201 Great America Pkwy #400</li>
              <li>Santa Clara, CA 95054</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Inventec North America. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
