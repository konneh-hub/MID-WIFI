function PartnershipsPage() {
  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Global Partnerships</h1>
          <p>Collaborating with institutions worldwide for academic excellence.</p>
        </div>
      </section>

      <div className="section-grid">
        <article className="card">
          <div className="program-card-icon">🌍</div>
          <h3>International Collaborations</h3>
          <p className="muted">MIDWIFERY University maintains partnerships with leading institutions across the globe, including exchange programs, joint research initiatives, and collaborative degree programs.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">🏢</div>
          <h3>Industry Partnerships</h3>
          <p className="muted">We work closely with industry leaders to ensure our curriculum remains relevant and our students gain practical experience through internships, co-op programs, and industry-sponsored projects.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">🤝</div>
          <h3>Community Engagement</h3>
          <p className="muted">Our partnerships extend to local communities through outreach programs, continuing education, and collaborative initiatives that address regional challenges and opportunities.</p>
        </article>
      </div>
    </div>
  );
}

export default PartnershipsPage;