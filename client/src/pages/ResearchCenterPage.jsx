function ResearchCenterPage() {
  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Research Center</h1>
          <p>Advancing knowledge through innovative research initiatives.</p>
        </div>
      </section>

      <div className="section-grid">
        <article className="card">
          <div className="program-card-icon">🔬</div>
          <h3>Research Facilities</h3>
          <p className="muted">Our state-of-the-art research facilities include modern laboratories, computing resources, and specialized equipment to support cutting-edge research across disciplines.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">📊</div>
          <h3>Research Areas</h3>
          <p className="muted">We focus on Artificial Intelligence, Sustainable Energy, Biotechnology, Environmental Science, and Social Sciences to address complex global challenges.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">🤝</div>
          <h3>Collaborative Research</h3>
          <p className="muted">We encourage interdisciplinary collaboration and partnerships with industry, government, and other academic institutions to address complex global challenges.</p>
        </article>
      </div>
    </div>
  );
}

export default ResearchCenterPage;