function GalleryPage() {
  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Media Gallery</h1>
          <p>Capturing moments and showcasing our vibrant university community.</p>
        </div>
      </section>

      <div className="content-section">
        <div className="card">
          <div className="program-card-icon">🏫</div>
          <h2>Campus Life</h2>
          <p className="muted">Photos and videos of student life and campus events.</p>
        </div>

        <div className="card">
          <div className="program-card-icon">🎓</div>
          <h2>Academic Events</h2>
          <p className="muted">Lectures, conferences, and graduation ceremonies.</p>
        </div>

        <div className="card">
          <div className="program-card-icon">🌍</div>
          <h2>Community Impact</h2>
          <p className="muted">Community contributions and global initiatives.</p>
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;