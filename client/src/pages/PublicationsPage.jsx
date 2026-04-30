function PublicationsPage() {
  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Publications</h1>
          <p>Explore our research publications and academic contributions.</p>
        </div>
      </section>

      <div className="section-grid">
        <article className="card">
          <div className="program-card-icon">📚</div>
          <h3>Recent Publications</h3>
          <p className="muted">Our faculty and students regularly publish in top-tier journals and conferences, contributing to the advancement of knowledge in their respective fields.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">📖</div>
          <h3>Research Journals</h3>
          <p className="muted">MIDWIFERY University publishes several academic journals covering various disciplines and interdisciplinary topics.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">🔓</div>
          <h3>Access Publications</h3>
          <p className="muted">Publications are available through our institutional repository, providing open access to research outputs and ensuring maximum dissemination of knowledge.</p>
        </article>
      </div>
    </div>
  );
}

export default PublicationsPage;