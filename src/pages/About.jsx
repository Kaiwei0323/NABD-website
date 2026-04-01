import { useEffect } from 'react'
import './About.css'

const About = () => {
  useEffect(() => {
    const prev = document.title
    document.title = 'Inventec NA'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <div className="about-page">
      <section className="about-hero" aria-label="About us">
        <div className="about-hero-media">
          <img
            src="/image/nabd-about/top-banner.png"
            alt=""
            className="about-hero-img"
            width={1920}
            height={700}
          />
          <div className="about-hero-scrim" aria-hidden="true" />
        </div>
        <div className="about-hero-inner">
          <p className="about-hero-eyebrow">Inventec NABD</p>
          <h1 className="about-hero-title">About us</h1>
          <p className="about-hero-lead">
            Engineering partner for edge AI and industrial solutions across North America.
          </p>
        </div>
      </section>

      <div className="about-wrap">
        <section className="about-section about-story" aria-labelledby="about-story-heading">
          <h2 id="about-story-heading" className="about-section-title">
            Who we are
          </h2>
          <div className="about-story-body">
            <p className="about-story-lead">
              <strong>At Inventec, possibilities take shape.</strong> Since 1975, we have offered
              scalable manufacturing capabilities to help technology brands and innovators scale new
              concepts worldwide.
            </p>
            <p>
              We are an innovative engineering partner, working closely with ecosystem players to
              design and produce cutting-edge solutions that transform ideas into global impact.
              Through our expertise and worldwide manufacturing presence, we help customers capture
              market opportunities and make any vision sustainable and durable, regardless of scale or
              ambition.
            </p>
            <p className="about-story-tagline">At Inventec, we are inventing today and inspiring tomorrow.</p>
          </div>
        </section>

        <section className="about-section about-pillars" aria-labelledby="about-pillars-heading">
          <h2 id="about-pillars-heading" className="about-section-title about-section-title--center">
            Vision, mission &amp; what we do
          </h2>
          <p className="about-pillars-intro">
            The same pillars that guide our global team—reflected in how we work with partners every
            day.
          </p>

          <div className="about-pillars-grid">
            <article className="about-pillar">
              <div className="about-pillar-visual">
                <img
                  src="/image/nabd-about/vision.png"
                  alt=""
                  loading="lazy"
                  width={550}
                  height={500}
                />
              </div>
              <div className="about-pillar-body">
                <h3 className="about-pillar-title">Vision</h3>
                <blockquote className="about-pillar-quote">
                  We believe in the power of engineering to shape a sustainable future through
                  invention.
                </blockquote>
              </div>
            </article>

            <article className="about-pillar">
              <div className="about-pillar-visual">
                <img
                  src="/image/nabd-about/mission.png"
                  alt=""
                  loading="lazy"
                  width={550}
                  height={500}
                />
              </div>
              <div className="about-pillar-body">
                <h3 className="about-pillar-title">Mission</h3>
                <p className="about-pillar-text">
                  Through flexible design and collaboration with ecosystem partners, we offer scalable
                  manufacturing capabilities designed to transform ideas into global impact.
                </p>
              </div>
            </article>

            <article className="about-pillar about-pillar--wide">
              <div className="about-pillar-visual">
                <img
                  src="/image/nabd-about/we-do.png"
                  alt=""
                  loading="lazy"
                  width={1200}
                  height={500}
                />
              </div>
              <div className="about-pillar-body">
                <h3 className="about-pillar-title">What we do</h3>
                <p className="about-pillar-text">
                  We combine flexible design with deep manufacturing scale so your products—from concept
                  to deployment—meet real-world demands without compromise.
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
