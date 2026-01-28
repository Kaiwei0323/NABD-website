import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/video/traffic.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to Inventec North America</h1>
          <p className="hero-description">
            We design high-performance, AI-ready edge devices for real-time processing, low-latency computing, and seamless deployment — optimized for industries like healthcare, manufacturing, retail, transportation, and smart cities
          </p>
          <a
            href="https://www.sagire.ai/edgeaiplatforms"
            target="_blank"
            rel="noopener noreferrer"
            className="order-button"
          >
            Order Now
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
