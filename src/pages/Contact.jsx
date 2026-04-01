import { useEffect } from 'react'
import './Contact.css'

const Contact = () => {
  useEffect(() => {
    const prev = document.title
    document.title = 'Inventec NA'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div className="contact-page">
      <section className="contact-hero" aria-label="Contact us">
        <div className="contact-hero-media">
          <img
            src="/image/nabd-contact/banner.jpg"
            alt=""
            className="contact-hero-img"
            width={1920}
            height={700}
          />
          <div className="contact-hero-scrim" aria-hidden="true" />
        </div>
        <div className="contact-hero-inner">
          <p className="contact-hero-eyebrow">Inventec NABD</p>
          <h1 className="contact-hero-title">Contact us</h1>
          <p className="contact-hero-lead">
            Reach out for sales, technical support, or partnership opportunities.
          </p>
        </div>
      </section>

      <div className="contact-wrap">
        <section className="contact-panel" aria-labelledby="contact-panel-heading">
          <div className="contact-panel-inner">
            <header className="contact-panel-head">
              <h2 id="contact-panel-heading" className="contact-panel-title">
                Get in touch
              </h2>
              <p className="contact-panel-sub">
                Sales, technical questions, or partnership—we are happy to hear from you.
              </p>
            </header>
            <div className="contact-panel-grid">
              <a href="mailto:NABUsales@inventec.com" className="contact-card">
                <span className="contact-card-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span className="contact-card-label">Email</span>
                <span className="contact-card-value">NABUsales@inventec.com</span>
              </a>
              <a href="tel:+14089889588" className="contact-card">
                <span className="contact-card-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="contact-card-label">Phone</span>
                <span className="contact-card-value">408-988-9588</span>
              </a>
              <div className="contact-card contact-card--static">
                <span className="contact-card-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="contact-card-label">Office</span>
                <span className="contact-card-value">
                  5201 Great America Pkwy #400
                  <br />
                  Santa Clara, CA 95054
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Contact
