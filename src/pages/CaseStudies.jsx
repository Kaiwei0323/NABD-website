import { Link } from 'react-router-dom'
import { caseStudiesList } from '../data/caseStudiesMeta'
import './CaseStudies.css'

const CaseStudies = () => {
  return (
    <div className="resource-page">
      <section className="resource-hero" aria-label="Case Studies">
        <div className="resource-hero-media">
          <img
            src="/image/nabd-resource/banner.jpg"
            alt=""
            className="resource-hero-img"
            decoding="async"
          />
          <div className="resource-hero-scrim" aria-hidden="true" />
        </div>
        <div className="resource-hero-inner">
          <div className="resource-container resource-hero-copy">
            <p className="resource-kicker">Case Studies</p>
            <h1>Case Studies</h1>
            <p className="resource-lead">
              Explore how Inventec edge platforms power physical AI, smart manufacturing, and partner
              ecosystems—with full write-ups on this site.
            </p>
          </div>
        </div>
      </section>

      <div className="resource-container resource-body">
        <section className="resource-section" aria-labelledby="nabd-cases-heading">
          <div className="resource-section-head">
            <h2 id="nabd-cases-heading">Case Studies</h2>
            <p className="resource-section-desc">
              Full write-ups on this site—edge servers, physical AI, Qualcomm and Jetson-based
              solutions, and smart manufacturing.
            </p>
          </div>

          <ul className="nabd-case-grid">
            {caseStudiesList.map((item) => (
              <li key={item.slug} className="nabd-case-card">
                <Link to={`/resource/case/${item.slug}`} className="nabd-case-link">
                  <div className="nabd-case-thumb">
                    <img
                      src={item.gridImage}
                      alt=""
                      width={item.gridImageWidth}
                      height={item.gridImageHeight}
                      loading="lazy"
                    />
                  </div>
                  <span className="nabd-case-tag">{item.tag}</span>
                  <h3 className="nabd-case-title">{item.title}</h3>
                  <span className="nabd-case-cta">
                    Read case study
                    <span className="nabd-case-cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default CaseStudies
