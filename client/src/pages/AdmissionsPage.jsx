function AdmissionsPage() {
  return (
    <div>
      <section className="card">
        <h1>Admissions Information</h1>
        <p>Join MID-WIFI University by exploring our admissions process, program requirements, and application timeline.</p>
      </section>
      <section className="grid-row" style={{ marginTop: '24px' }}>
        <div className="card">
          <h3>Application process</h3>
          <p>Complete the online application, upload supporting transcripts, and review deadlines for your chosen program.</p>
        </div>
        <div className="card">
          <h3>Eligibility</h3>
          <p>Students must meet academic and English proficiency requirements. Contact our admissions team if you need guidance.</p>
        </div>
      </section>
      <section className="note-box" style={{ marginTop: '24px' }}>
        <h3>Next steps</h3>
        <p>Visit our Contact page to request more information or ask about scholarship and financial aid opportunities.</p>
      </section>
    </div>
  );
}

export default AdmissionsPage;
