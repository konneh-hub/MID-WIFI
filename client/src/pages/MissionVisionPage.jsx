import midwiferyImg from '../assets/midwifery.jpg';

function MissionVisionPage() {
  return (
    <main className="mission-page-shell">
      <section className="mission-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(15,76,92,0.46), rgba(15,76,92,0.16)), url(${midwiferyImg})` }}>
        <div className="mission-hero-copy">
          <span className="hero-eyebrow">Mission & Vision</span>
          <h1>Inspiring purpose, guiding excellence, shaping tomorrow.</h1>
          <p>
            Discover the principles and aspirations that empower our community and define the future of learning.
          </p>
        </div>
      </section>

      <section className="mission-intro">
        <p>Guiding principles that shape our institution and future.</p>
      </section>

      <section className="mission-grid">
        <article className="mission-card">
          <div className="mission-icon">🎯</div>
          <h2>Mission</h2>
          <p>
            Deliver transformative education grounded in academic excellence, inclusivity, and civic responsibility so students become capable, confident, and ethical leaders.
          </p>
        </article>

        <article className="mission-card">
          <div className="mission-icon">🌟</div>
          <h2>Vision</h2>
          <p>
            Be a world-class institution where research, innovation, and community engagement come together to create meaningful impact and opportunity.
          </p>
        </article>

        <article className="mission-card">
          <div className="mission-icon">💛</div>
          <h2>Core Values</h2>
          <p>
            We champion integrity, curiosity, collaboration, creativity, and respect—building a culture that celebrates diversity and shared purpose.
          </p>
        </article>
      </section>
    </main>
  );
}

export default MissionVisionPage;
