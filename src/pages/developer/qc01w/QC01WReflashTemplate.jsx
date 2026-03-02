import { Link } from 'react-router-dom'
import '../../Developer.css'

const QC01WReflashTemplate = ({ title, steps = [], children }) => {
  return (
    <div className="developer-page">
      <div className="developer-container">
        <h1>QC01W – Reflash Image</h1>
        <p className="developer-subtitle">{title}</p>

        <div className="developer-card">
          <Link to="/developer" className="dev-back-link">
            Back to Developer
          </Link>

          <h2 className="dev-sop-page-title">{title} SOP</h2>
          <div className="dev-sop-stack">{children}</div>
          {steps.length ? (
            <ol className="dev-sop-steps">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default QC01WReflashTemplate

