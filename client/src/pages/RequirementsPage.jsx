function RequirementsPage() {
  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Admission Requirements</h1>
          <p>Learn about the requirements for joining our academic community.</p>
        </div>
      </section>

      <div className="section-grid">
        <article className="card">
          <div className="program-card-icon">📋</div>
          <h3>General Requirements</h3>
          <p className="muted">Completed application form, official transcripts, test scores, recommendations, personal statement, and English proficiency proof for international students.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">🎓</div>
          <h3>Undergraduate Requirements</h3>
          <p className="muted">High school diploma or equivalent with minimum GPA requirements. Specific program requirements may vary.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">📚</div>
          <h3>Graduate Requirements</h3>
          <p className="muted">Bachelor's degree from accredited institution with minimum GPA. Some programs require work experience or specific prerequisites.</p>
        </article>
      </div>
    </div>
  );
}

export default RequirementsPage;