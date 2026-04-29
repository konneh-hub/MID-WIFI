function InnovationPage() {
  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Innovation Hub Projects</h1>
          <p>Showcasing groundbreaking projects from our innovation ecosystem.</p>
        </div>
      </section>

      <div className="section-grid">
        <article className="card">
          <div className="program-card-icon">🚀</div>
          <h3>Startup Incubation</h3>
          <p className="muted">Our Innovation Hub provides mentorship, resources, and funding opportunities for student and faculty startups.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">🔄</div>
          <h3>Technology Transfer</h3>
          <p className="muted">We facilitate the transfer of university research into commercial applications, benefiting both the academic community and industry partners.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">🤝</div>
          <h3>Collaborative Innovation</h3>
          <p className="muted">Cross-disciplinary teams work on solving real-world problems through innovative approaches and cutting-edge technologies.</p>
        </article>
      </div>
    </div>
  );
}

export default InnovationPage;