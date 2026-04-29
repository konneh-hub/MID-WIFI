function AboutPage() {
  return (
    <div className="page-shell">
      <section className="page-hero" style={{
        backgroundImage: 'linear-gradient(rgba(15,76,92,0.72), rgba(15,76,92,0.45)), linear-gradient(135deg, #0F4C5C, #0B3544)',
        minHeight: '60vh',
        padding: '5rem 0 4rem'
      }}>
        <div className="hero-inner" style={{ gridTemplateColumns: '1fr' }}>
          <div className="hero-copy">
            <span className="hero-eyebrow">University Overview</span>
            <h1>About MIDWIFERY University</h1>
            <p className="hero-text">Discover our journey, mission, and commitment to academic excellence in healthcare education.</p>
          </div>
        </div>
      </section>

      <section className="section section-split">
        <div className="section-copy">
          <span className="section-eyebrow">Our Foundation</span>
          <h2>Who We Are</h2>
          <p>MIDWIFERY University is a modern institution that blends academic excellence with healthcare innovation. We are committed to preparing the next generation of midwives and healthcare leaders through rigorous academics, hands-on clinical experience, and community engagement.</p>
          <ul className="about-list">
            <li>Committed to academic excellence and innovation</li>
            <li>World-class faculty and research programs</li>
            <li>Comprehensive student support and mentorship</li>
            <li>Community-driven healthcare leadership</li>
          </ul>
        </div>
        <div className="section-media">
          <div className="media-card" style={{
            backgroundImage: 'linear-gradient(rgba(15,76,92,0.3), rgba(15,76,92,0.3)), url(data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 500 500%22%3E%3Crect fill=%22%230F4C5C%22 width=%22500%22 height=%22500%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3EAbout Us%3C/text%3E%3C/svg%3E)'
          }}>
            <div className="media-overlay">
              <span>Our Legacy</span>
              <strong>Building leaders in healthcare</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Our Purpose</span>
            <h2>Mission & Vision</h2>
          </div>
        </div>
        <div className="section-grid">
          <article className="card">
            <div className="program-card-icon">🎯</div>
            <h3>Our Mission</h3>
            <p className="muted">To empower students with knowledge, skills, and real-world experience to advance healthcare and midwifery practice globally.</p>
          </article>
          <article className="card">
            <div className="program-card-icon">🚀</div>
            <h3>Our Vision</h3>
            <p className="muted">Be a trusted center of healthcare education where innovation, research, and community engagement thrive.</p>
          </article>
          <article className="card">
            <div className="program-card-icon">🏆</div>
            <h3>Excellence</h3>
            <p className="muted">We pursue the highest standards in education, research, and student support across all programs.</p>
          </article>
          <article className="card">
            <div className="program-card-icon">🌍</div>
            <h3>Global Impact</h3>
            <p className="muted">We foster partnerships and engage in community service to create meaningful change worldwide.</p>
          </article>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--secondary)' }}>
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Campus Experience</span>
            <h2>Life at MIDWIFERY</h2>
          </div>
          <p>Students enjoy modern classrooms, research labs, student clubs, and an engaging events calendar. We encourage diversity, creativity, and collaboration.</p>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
