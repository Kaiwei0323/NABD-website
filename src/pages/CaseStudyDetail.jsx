import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getCaseStudyMeta } from '../data/caseStudiesMeta'
import { caseStudyBodies } from '../data/caseStudyBodies'
import './CaseStudyDetail.css'

const CaseStudyDetail = () => {
  const { slug } = useParams()
  const meta = slug ? getCaseStudyMeta(slug) : null
  const bodyHtml = slug ? caseStudyBodies[slug] : null

  useEffect(() => {
    if (!meta) return
    const prev = document.title
    document.title = 'Case study | Inventec NA'
    return () => {
      document.title = prev
    }
  }, [meta])

  if (!meta || !bodyHtml) {
    return <Navigate to="/resource" replace />
  }

  return (
    <div className="case-study-page">
      <div className="case-study-container">
        <nav className="case-breadcrumb" aria-label="Breadcrumb">
          <Link to="/resource">Case Studies</Link>
          <span className="case-breadcrumb-sep" aria-hidden="true">
            /
          </span>
          <span className="case-breadcrumb-current">Case study</span>
        </nav>

        <header className="case-study-header">
          <div className="case-study-hero-grid">
            <div className="case-study-hero-visual">
              <img
                src={meta.heroImage}
                alt=""
                className="case-study-hero-img"
                width={580}
                height={435}
              />
            </div>
            <div className="case-study-hero-copy">
              <span className="case-study-tag">{meta.tag}</span>
              <h1 className="case-study-title">{meta.title}</h1>
              {meta.highlights?.length > 0 && (
                <ul className="case-study-highlights">
                  {meta.highlights.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        <article
          className="case-study-article"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        <footer className="case-study-footer-nav">
          <Link to="/resource" className="case-study-back">
            ← Back to Case Studies
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default CaseStudyDetail
