function AdmissionsPage() {
  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Admissions Information</h1>
          <p>Join MIDWIFERY University by exploring our admissions process and requirements.</p>
        </div>
      </section>

      <div className="section-grid">
        <article className="card">
          <div className="program-card-icon">📝</div>
          <h3>Application Process</h3>
          <p className="muted">Complete online application, upload transcripts, and meet deadlines. Our streamlined process makes it easy to join our community.</p>
        </article>
        <article className="card">
          <div className="program-card-icon">📋</div>
          <h3>Eligibility Requirements</h3>
          <p className="muted">Meet academic and English requirements. Contact admissions for personalized guidance on your application journey.</p>
        </article>
        <article className="card">
          <div className="program-card-icon">🎓</div>
          <h3>Next Steps</h3>
          <p className="muted">Visit our Contact page for more information about scholarships and financial aid. We're here to support your educational goals.</p>
        </article>
      </div>
    </div>
  );
}

export default AdmissionsPage;
