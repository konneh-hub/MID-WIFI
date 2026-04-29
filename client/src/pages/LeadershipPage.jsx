function LeadershipPage() {
  return (
    <div>
      <section className="section-title">
        <div>
          <h1>University Leadership</h1>
          <p>Meet the dedicated leaders guiding our institution.</p>
        </div>
      </section>

      <div className="section-grid">
        <article className="card">
          <div className="program-card-icon">👩‍💼</div>
          <h3>President</h3>
          <p className="muted"><strong>Dr. Sarah Johnson</strong> brings over 25 years of experience in higher education administration and academic leadership with a Ph.D. in Educational Leadership.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">👨‍🏫</div>
          <h3>Provost</h3>
          <p className="muted"><strong>Dr. Michael Chen</strong> oversees academic affairs and student success initiatives with expertise in curriculum development and student engagement.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">🏛️</div>
          <h3>Board of Trustees</h3>
          <p className="muted">Our Board consists of distinguished leaders from education, business, and community sectors who provide strategic guidance and oversight for the university's long-term success.</p>
        </article>
      </div>
    </div>
  );
}

export default LeadershipPage;