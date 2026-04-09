import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getApiUrl } from '../utils/api'
import { caseStudiesMaterials } from '../utils/caseStudiesMaterials'
import './CaseStudiesMaterialDetail.css'

const CaseStudiesMaterialDetail = () => {
  const { resourceId } = useParams()
  const { user } = useAuth()
  const API_URL = getApiUrl()

  const material = caseStudiesMaterials.find((item) => item.id === resourceId)
  if (!material) return <Navigate to="/resource" replace />

  const handleDownload = async () => {
    if (!user) {
      alert('Please login to download.')
      return
    }

    try {
      const relativePath = material.filePath.startsWith('/')
        ? material.filePath.substring(1)
        : material.filePath
      const response = await fetch(
        `${API_URL}/download-pdf?filePath=${encodeURIComponent(relativePath)}&username=${encodeURIComponent(user.username)}`,
        { method: 'GET' }
      )

      if (!response.ok) throw new Error('Failed to download file')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = material.fileName || relativePath.split('/').pop()
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download error:', error)
      alert('Failed to download file. Please try again.')
    }
  }

  return (
    <div className="resource-detail-page">
      <div className="resource-detail-container">
        <Link className="resource-back-link" to="/resource">
          ← Back to Case Studies
        </Link>

        <section className={`resource-detail-hero ${material.accentClass}`}>
          <h1>{material.title}</h1>
          <p>{material.subtitle}</p>
        </section>

        <section className="resource-media-grid">
          <article className="resource-media-card">
            <h2>Solution Visual</h2>
            <img src={material.imagePath} alt={`${material.title} visual`} className="resource-image" />
          </article>

          <article className="resource-media-card">
            <h2>Solution Video</h2>
            <video className="resource-video" controls muted loop playsInline>
              <source src={material.videoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </article>
        </section>

        <section className="resource-info-grid">
          <article className="resource-info-card">
            <h3>Overview</h3>
            <p>{material.overview}</p>
          </article>

          <article className="resource-info-card">
            <h3>Key Use Cases</h3>
            <ul>
              {material.useCases.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
          </article>
        </section>

        <div className="resource-detail-actions">
          <button type="button" className="download-btn" onClick={handleDownload}>
            Download One-Pager (PDF)
          </button>
        </div>
      </div>
    </div>
  )
}

export default CaseStudiesMaterialDetail
