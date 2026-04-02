import { useEffect, useRef, useState } from 'react'

const DEV_EMAIL = 'yang.kaiwei@inventec.com'

const IconChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DeveloperContactCta = () => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [open])

  return (
    <div className="dev-contact-fab" ref={rootRef}>
      <div
        id="dev-contact-fab-panel"
        className={`dev-contact-fab-panel ${open ? 'dev-contact-fab-panel--open' : ''}`}
        role="region"
        aria-label="Developer contact"
        hidden={!open}
      >
        <div className="dev-contact-fab-panel-accent" aria-hidden="true" />
        <p className="dev-contact-fab-panel-kicker">Developer support</p>
        <p className="dev-contact-fab-panel-title">Contact us</p>
        <p className="dev-contact-fab-panel-desc">
          Questions on reflashing, SOPs, or edge platforms—send us a note.
        </p>
        <a href={`mailto:${DEV_EMAIL}`} className="dev-contact-fab-mail">
          <span className="dev-contact-fab-mail-icon">
            <IconMail />
          </span>
          <span className="dev-contact-fab-mail-text">{DEV_EMAIL}</span>
        </a>
      </div>
      <button
        type="button"
        className="dev-contact-fab-btn"
        aria-expanded={open}
        aria-controls="dev-contact-fab-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="dev-contact-fab-btn-icon" aria-hidden="true">
          <IconChat />
        </span>
        <span className="dev-contact-fab-btn-textwrap">
          <span className="dev-contact-fab-btn-line1">Question?</span>
          <span className="dev-contact-fab-btn-line2">Contact us</span>
        </span>
      </button>
    </div>
  )
}

export default DeveloperContactCta
