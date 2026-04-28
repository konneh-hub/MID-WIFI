function AboutPage() {
  return (
    <div>
      <section className="card">
        <h1>About MID-WIFI University</h1>
        <p>MID-WIFI is a modern university that blends academic excellence with technology-driven learning. Our goal is to prepare learners for careers in science, engineering, business, and digital innovation.</p>
      </section>
      <section className="grid-row" style={{ marginTop: '24px' }}>
        <div className="card">
          <h3>Our Mission</h3>
          <p>To empower students with knowledge, skills and real-world experience for a connected global future.</p>
        </div>
        <div className="card">
          <h3>Our Vision</h3>
          <p>Be a trusted center of higher learning where innovation, research, and community engagement thrive.</p>
        </div>
      </section>
      <section className="card" style={{ marginTop: '24px' }}>
        <h2>Campus Life</h2>
        <p>Students enjoy modern classrooms, research labs, student clubs, and an engaging events calendar. MID-WIFI encourages diversity, creativity, and collaboration across every program.</p>
      </section>
    </div>
  );
}

export default AboutPage;
