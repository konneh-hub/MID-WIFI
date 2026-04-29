function FeesPage() {
  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Fees & Payments</h1>
          <p>Information about tuition fees and payment options.</p>
        </div>
      </section>

      <div className="section-grid">
        <article className="card">
          <div className="program-card-icon">💰</div>
          <h3>Tuition Fees</h3>
          <p className="muted">Tuition fees vary by program and level of study. Please refer to specific program pages for detailed fee information.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">💳</div>
          <h3>Payment Options</h3>
          <p className="muted">Full payment at registration, installment plans, scholarship and financial aid options, and payment deadlines with late fees.</p>
        </article>

        <article className="card">
          <div className="program-card-icon">🎓</div>
          <h3>Financial Aid</h3>
          <p className="muted">We offer various forms of financial assistance including scholarships, grants, work-study programs, and student loans to help make education accessible.</p>
        </article>
      </div>
    </div>
  );
}

export default FeesPage;