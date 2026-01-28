import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { products } from '../utils/productData'
import './Product.css'

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { user } = useAuth()
  
  // Check if user can download (admin or customer only)
  const canDownload = user && (user.role === 'admin' || user.role === 'customer')

  // Category mapping
  const categories = {
    all: { name: 'All', products: products.map(p => p.id) },
    handheld: { name: 'Handheld', products: ['32e', '32p', '53r', '63e', 'momi13'] },
    'all-in-one': { name: 'All-in-One', products: ['m185', 'm215t', 'm240'] },
    edge: { name: 'Edge', products: ['aioox', 'ncon', 'ncox', 'nx-h3003', 'pson', 'psox', 'qc01', 'top1', 'ucon'] },
    'edge-server': { name: 'Edge Server', products: ['agx-orin', 'edge-pro-1u', 'edge-pro-2u', 'igx-orin'] }
  }

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => categories[selectedCategory].products.includes(product.id))

  const handleDownload = (filePath, fileName) => {
    if (filePath) {
      const link = document.createElement('a')
      link.href = filePath
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="product-page">
      <div className="product-header">
        <h1>Our Products</h1>
        <p>Explore our range of industrial computing solutions</p>
      </div>
      
      <div className="category-filters">
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(key)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            onMouseEnter={() => setSelectedProduct(product.id)}
            onMouseLeave={() => setSelectedProduct(null)}
          >
            <div className="product-image-container">
              <img 
                src={product.imagePath} 
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.src = '/placeholder-image.png'
                  e.target.alt = 'Image not available'
                }}
              />
            </div>
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <div className="download-links">
                {canDownload ? (
                  <>
                    {product.specPath && (
                      <a
                        href={product.specPath}
                        download
                        className="download-link"
                        onClick={(e) => {
                          e.preventDefault()
                          const fileName = product.specPath.split('/').pop()
                          handleDownload(product.specPath, fileName)
                        }}
                      >
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download Spec
                      </a>
                    )}
                    {product.userGuidePath && (
                      <a
                        href={product.userGuidePath}
                        download
                        className="download-link user-guide-link"
                        onClick={(e) => {
                          e.preventDefault()
                          const fileName = product.userGuidePath.split('/').pop()
                          handleDownload(product.userGuidePath, fileName)
                        }}
                      >
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        Download User Guide
                      </a>
                    )}
                    {!product.specPath && !product.userGuidePath && (
                      <span className="no-spec">Specification not available</span>
                    )}
                  </>
                ) : (
                  <div className="locked-download">
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="lock-icon"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <p className="locked-message">Become our partner to view product details</p>
                    {!user && (
                      <Link to="/login" className="login-prompt-link">
                        Login to access
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
