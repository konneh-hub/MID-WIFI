function HistoryPage() {
  return (
    <div>
      <section className="section-title">
        <div>
          <h1>History & Heritage</h1>
          <p>Discover the rich history and traditions of MIDWIFERY University.</p>
        </div>
      </section>

      <div className="section-grid">
        <article className="card">
          <div className="program-card-icon">🏛️</div>
          <h3>Founding Story</h3>
          <p className="muted">Established in 1995, MIDWIFERY University began as a small community college with a vision to provide accessible, high-quality education to students from diverse backgrounds.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">📅</div>
          <h3>Major Milestones</h3>
          <p className="muted">Founded in 1995 as a community college, achieved university status in 2005, opened new campus facilities in 2010, launched online programs in 2015, and celebrated 25th anniversary in 2020.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">🎭</div>
          <h3>Heritage & Traditions</h3>
          <p className="muted">Our university maintains strong traditions including the annual Founders' Day celebration, academic excellence awards, and community service initiatives that honor our commitment to education and service.</p>
        </article>
      </div>
    </div>
  );
}

export default HistoryPage;