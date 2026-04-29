function AnnouncementsPage() {
  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Announcements</h1>
          <p>Stay updated with important university announcements and notices.</p>
        </div>
      </section>

      <div className="content-section">
        <div className="card">
          <div className="program-card-icon">📅</div>
          <h2>Academic Calendar Updates</h2>
          <p className="muted">Important dates, deadlines, and schedule changes.</p>
        </div>

        <div className="card">
          <div className="program-card-icon">📋</div>
          <h2>Policy Changes</h2>
          <p className="muted">Updates to university policies and procedures.</p>
        </div>

        <div className="card">
          <div className="program-card-icon">⚠️</div>
          <h2>Important Notices</h2>
          <p className="muted">Emergency announcements and critical information.</p>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsPage;