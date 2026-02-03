import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { products } from '../utils/productData'
import './ProductDetail.css'

const ProductDetail = () => {
  const { productId } = useParams()
  const { user } = useAuth()

  const product = products.find((p) => p.id === productId)

  const canDownload = user && (user.role === 'admin' || user.role === 'customer')
  const canViewDetails = canDownload
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

  const handleDownload = async (filePath, fileName) => {
    if (!filePath || !user) return

    try {
      const relativePath = filePath.startsWith('/') ? filePath.substring(1) : filePath

      const response = await fetch(
        `${API_URL}/download-pdf?filePath=${encodeURIComponent(relativePath)}&username=${encodeURIComponent(user.username)}`,
        { method: 'GET' }
      )

      if (!response.ok) throw new Error('Failed to download file')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName || relativePath.split('/').pop()
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download file. Please try again.')
    }
  }

  const formatKey = (key) =>
    String(key)
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())

  /** Flatten a spec value to a short string for comparison table cells */
  const valueToDisplay = (value) => {
    if (value === null || value === undefined) return '—'
    if (typeof value === 'string' || typeof value === 'number') return String(value)
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (Array.isArray(value)) {
      const prim = value.every((v) => v === null || ['string', 'number', 'boolean'].includes(typeof v))
      if (prim) return value.join(', ')
      return value.map((v) => (typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v))).join('; ')
    }
    if (typeof value === 'object') {
      const parts = Object.entries(value).map(([k, v]) => `${formatKey(k)}: ${valueToDisplay(v)}`)
      return parts.join(' · ')
    }
    return String(value)
  }

  const renderValue = (value, depth = 0) => {
    if (value === null || value === undefined) return <span className="spec-null">N/A</span>
    if (typeof value === 'string' || typeof value === 'number') return <span>{String(value)}</span>
    if (typeof value === 'boolean') return <span>{value ? 'Yes' : 'No'}</span>

    if (Array.isArray(value)) {
      if (value.length === 0) return <span className="spec-null">None</span>
      const allPrimitive = value.every(
        (v) => v === null || ['string', 'number', 'boolean'].includes(typeof v)
      )
      if (allPrimitive) {
        return (
          <ul className="spec-list">
            {value.map((v, idx) => (
              <li key={idx}>{String(v)}</li>
            ))}
          </ul>
        )
      }

      return (
        <div className="spec-array">
          {value.map((v, idx) => (
            <div key={idx} className="spec-array-item">
              <div className="spec-array-index">{idx + 1}</div>
              <div className="spec-array-value">{renderValue(v, depth + 1)}</div>
            </div>
          ))}
        </div>
      )
    }

    if (typeof value === 'object') {
      const entries = Object.entries(value)
      if (entries.length === 0) return <span className="spec-null">N/A</span>
      return (
        <div className="spec-object">
          {entries.map(([k, v]) => (
            <div key={k} className="spec-row">
              <div className="spec-key">{formatKey(k)}</div>
              <div className="spec-value">{renderValue(v, depth + 1)}</div>
            </div>
          ))}
        </div>
      )
    }

    return <span>{String(value)}</span>
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-container">
          <div className="product-detail-top">
            <Link className="back-link" to="/product">
              ← Back to Products
            </Link>
          </div>
          <h1 className="product-detail-title">Product not found</h1>
          <p className="product-detail-subtitle">We couldn’t find a product with id: {productId}</p>
        </div>
      </div>
    )
  }

  if (!canViewDetails) {
    return <Navigate to="/product" replace />
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-top">
          <Link className="back-link" to="/product">
            ← Back to Products
          </Link>
        </div>

        <div className="product-detail-hero">
          <div className="product-detail-image">
            <img
              src={product.imagePath}
              alt={product.name}
              onError={(e) => {
                e.target.src = '/placeholder-image.png'
                e.target.alt = 'Image not available'
              }}
            />
          </div>

          <div className="product-detail-meta">
            <h1 className="product-detail-title">{product.name}</h1>
            <p className="product-detail-subtitle">Product specifications and resources</p>

            <div className="product-detail-actions">
              {canDownload ? (
                <>
                  {product.specPath && (
                    <button
                      className="detail-download-btn"
                      onClick={() => handleDownload(product.specPath, product.specPath.split('/').pop())}
                      type="button"
                    >
                      Download Spec (PDF)
                    </button>
                  )}
                  {product.userGuidePath && (
                    <button
                      className="detail-download-btn secondary"
                      onClick={() =>
                        handleDownload(product.userGuidePath, product.userGuidePath.split('/').pop())
                      }
                      type="button"
                    >
                      Download User Guide (PDF)
                    </button>
                  )}
                </>
              ) : (
                <div className="detail-locked">
                  <div className="detail-locked-text">Login as admin/customer to download PDFs.</div>
                  {!user && (
                    <Link to="/login" className="detail-login-link">
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="product-detail-specs">
          {product.specInfo ? (
            <div className="spec-card">
              <h2 className="product-detail-section-title">Specification Details</h2>
              {Array.isArray(product.specInfo.models) && product.specInfo.models.length > 0 ? (
                <>
                  <div className="spec-table-wrap">
                    <div
                      className="spec-models-grid spec-models-grid-single"
                      style={{ '--model-count': 1 }}
                    >
                      {Object.entries(product.specInfo)
                        .filter(([k]) => k !== 'models')
                        .map(([k, v]) => (
                          <div key={k} className="spec-models-row">
                            <div className="spec-models-cell spec-models-key">{formatKey(k)}</div>
                            <div className="spec-models-cell spec-models-model">{valueToDisplay(v)}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="spec-table-wrap">
                    <div
                      className="spec-models-grid"
                      style={{ '--model-count': product.specInfo.models.length }}
                    >
                      <div className="spec-models-header spec-models-cell spec-models-key">Spec</div>
                      {product.specInfo.models.map((m) => (
                        <div key={m.model || JSON.stringify(m)} className="spec-models-header spec-models-cell spec-models-model">
                          {m.model ? String(m.model).toUpperCase() : '—'}
                        </div>
                      ))}
                      {(() => {
                        const models = product.specInfo.models
                        const allKeys = [...new Set(models.flatMap((m) => Object.keys(m).filter((key) => key !== 'model')))]
                        return allKeys.map((key) => (
                          <div key={key} className="spec-models-row">
                            <div className="spec-models-cell spec-models-key">{formatKey(key)}</div>
                            {models.map((m) => (
                              <div key={`${m.model}-${key}`} className="spec-models-cell spec-models-model">
                                {valueToDisplay(m[key])}
                              </div>
                            ))}
                          </div>
                        ))
                      })()}
                    </div>
                  </div>
                </>
              ) : (
                <div className="spec-table-wrap">
                    <div
                      className="spec-models-grid spec-models-grid-single"
                      style={{ '--model-count': 1 }}
                    >
                      {Object.entries(product.specInfo).map(([k, v]) => (
                      <div key={k} className="spec-models-row">
                        <div className="spec-models-cell spec-models-key">{formatKey(k)}</div>
                        <div className="spec-models-cell spec-models-model">{valueToDisplay(v)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <h2 className="product-detail-section-title">Specification Details</h2>
              <div className="spec-empty">
                No `specInfo` has been added for this product yet (the PDF download may still be
                available).
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

