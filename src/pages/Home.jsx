import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../utils/productData'
import './Home.css'

const HERO_BANNERS = [
  '/image/nabd-home/banner-1.jpg',
  '/image/nabd-home/banner-2.jpg',
  '/image/nabd-home/banner-3.jpg',
  '/image/nabd-home/banner-4.jpg',
]

const BANNER_ROTATE_MS = 6500

const FEATURED_ITEMS = [
  {
    id: 'qc01',
    title: 'QC01',
    tag: 'Qualcomm edge',
    description:
      'Qualcomm Dragonwing-class edge AI box for vision, IoT, and field deployments that need rugged connectivity.',
  },
  {
    id: 'edge-pro-1u',
    title: 'Edge Pro 1U',
    tag: 'Edge server',
    description:
      '1U rack server for edge AI and enterprise workloads where data center density meets local inference.',
  },
  {
    id: 'edge-pro-2u',
    title: 'Edge Pro 2U',
    tag: 'Edge server',
    description:
      '2U rack platform with room for GPUs and storage—built for heavier compute at the edge.',
  },
  {
    id: 'igx-orin',
    title: 'IGX Orin',
    tag: 'NVIDIA IGX Orin',
    description:
      'NVIDIA IGX Orin 2U system for industrial AI, robotics, and regulated environments with long lifecycle support.',
  },
  {
    id: 'igx-thor',
    title: 'IGX Thor',
    tag: 'NVIDIA IGX THOR',
    description:
      'IGX Thor / Blackwell-class server for physical AI, large-model inference, and multi-pipeline edge workloads.',
  },
  {
    id: 'agx-orin',
    title: 'AGX',
    tag: 'NVIDIA AGX',
    description:
      'NVIDIA AGX platform for robotics, perception, and autonomous systems at the edge.',
  },
]

const Home = () => {
  const [bannerIndex, setBannerIndex] = useState(0)

  useEffect(() => {
    const prev = document.title
    document.title = 'Inventec NA'
    return () => {
      document.title = prev
    }
  }, [])

  useEffect(() => {
    if (HERO_BANNERS.length <= 1) return
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    const id = window.setInterval(() => {
      setBannerIndex((i) => (i + 1) % HERO_BANNERS.length)
    }, BANNER_ROTATE_MS)
    return () => window.clearInterval(id)
  }, [])

  const featuredCards = useMemo(() => {
    return FEATURED_ITEMS.map((item) => {
      const p = products.find((x) => x.id === item.id)
      if (!p) return null
      return {
        key: p.id,
        to: `/product/${p.id}`,
        image: p.imagePath,
        title: item.title,
        tag: item.tag,
        description: item.description,
        cta: 'View details',
      }
    }).filter(Boolean)
  }, [])

  return (
    <div className="home">
      <section
        className="hero"
        aria-label="Welcome"
        aria-roledescription="carousel"
      >
        <div className="hero-carousel" aria-hidden="true">
          {HERO_BANNERS.map((src, i) => (
            <div
              key={src}
              className={`hero-slide ${i === bannerIndex ? 'hero-slide--active' : ''}`}
            >
              <img
                src={src}
                alt=""
                className="hero-slide-img"
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
        </div>
        <div className="hero-overlay" />
        <h1 className="hero-sr-only">
          Inventec NABD — North America edge AI and industrial computing
        </h1>
        <div className="hero-banner-dots" role="tablist" aria-label="Banner slides">
          {HERO_BANNERS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === bannerIndex}
              aria-label={`Show banner ${i + 1} of ${HERO_BANNERS.length}`}
              className={`hero-banner-dot ${i === bannerIndex ? 'hero-banner-dot--active' : ''}`}
              onClick={() => setBannerIndex(i)}
            />
          ))}
        </div>
      </section>

      <section className="home-featured" aria-labelledby="home-featured-heading">
        <div className="home-featured-inner">
          <div className="home-featured-head">
            <p className="home-featured-kicker">Product spotlight</p>
            <h2 id="home-featured-heading">Featured platforms</h2>
            <p className="home-featured-lead">
              QC01, Edge Pro rack systems, and NVIDIA IGX Thor, IGX Orin, and NVIDIA AGX
              platforms—explore specs and downloads on each product page.
            </p>
          </div>

          <ul className="home-product-grid">
            {featuredCards.map((card) => (
              <li key={card.key}>
                <Link to={card.to} className="home-product-card">
                  <div className="home-product-thumb">
                    <img
                      src={card.image}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.png'
                      }}
                    />
                  </div>
                  <div className="home-product-body">
                    <span className="home-product-tag">{card.tag}</span>
                    <h3 className="home-product-name">{card.title}</h3>
                    <p className="home-product-desc">{card.description}</p>
                    <span className="home-product-cta">
                      {card.cta}
                      <span aria-hidden="true" className="home-product-cta-arrow">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="home-featured-footer">
            <Link to="/product" className="home-view-all">
              View all products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
