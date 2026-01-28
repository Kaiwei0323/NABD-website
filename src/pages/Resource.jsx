import { useAuth } from '../context/AuthContext'
import './Resource.css'

const Resource = () => {
  const { user } = useAuth()
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

  const caseStudies = [
    {
      id: 'smart-factory',
      title: 'Smart Factory',
      description: 'Smart Manufacturing Case Study',
      filePath: '/case_study/smart_factory/smart_manufacture.pdf',
      fileName: 'smart_manufacture.pdf'
    },
    {
      id: 'smart-railway',
      title: 'Smart Railway',
      description: 'Railway System Case Study',
      filePath: '/case_study/smart_railway/railway.pdf',
      fileName: 'railway.pdf'
    },
    {
      id: 'smart-traffic',
      title: 'Smart Traffic',
      description: 'Smart Traffic Management Case Study',
      filePath: '/case_study/smart_traffic/smart_traffic.pdf',
      fileName: 'smart_traffic.pdf'
    }
  ]

  const handleDownload = async (filePath, fileName) => {
    if (!filePath || !user) {
      alert('Please login to download resources.')
      return
    }

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

  return (
    <div className="resource-page">
      <div className="resource-container">
        <h1>Resources</h1>
        <p className="resource-subtitle">Download our case studies and technical resources</p>
        
        <div className="case-studies-grid">
          {caseStudies.map((study) => (
            <div key={study.id} className="case-study-card">
              <div className="case-study-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h2>{study.title}</h2>
              <p className="case-study-description">{study.description}</p>
              <a
                href={study.filePath}
                download
                className="download-btn"
                onClick={(e) => {
                  e.preventDefault()
                  handleDownload(study.filePath, study.fileName)
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Resource
