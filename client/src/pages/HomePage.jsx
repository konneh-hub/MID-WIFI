import { useEffect, useState } from 'react';
import { fetchNews, fetchCourses, fetchEvents } from '../services/api.js';

function HomePage() {
  const [news, setNews] = useState([]);
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchNews().then(setNews).catch(console.error);
    fetchCourses().then(setCourses).catch(console.error);
    fetchEvents().then(setEvents).catch(console.error);
  }, []);

  return (
    <div>
      <section className="page-hero">
        <div className="hero-card">
          <span>Welcome to MID-WIFI University</span>
          <h1>Connect to education that leads your future.</h1>
          <p>Explore programs, discover vibrant campus life, and join a community built for innovation and impact.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="cta-button">Apply Now</button>
            <button className="cta-button" style={{ background: '#fff', color: 'var(--primary)', border: '1px solid var(--primary)' }}>Explore Courses</button>
          </div>
        </div>
        <div className="card">
          <h3>Why choose MID-WIFI?</h3>
          <ul>
            <li>Innovative academic programs</li>
            <li>Modern campus and labs</li>
            <li>Research-driven faculty</li>
            <li>Career support for every student</li>
          </ul>
        </div>
      </section>

      <section className="section-title" style={{ marginTop: '40px' }}>
        <h2>Featured Courses</h2>
        <span>{courses.length} programs available</span>
      </section>
      <div className="section-grid">
        {courses.slice(0, 3).map(course => (
          <article key={course._id} className="card">
            <h3>{course.title}</h3>
            <p>{course.description || 'Modern course for driven learners.'}</p>
            <p><strong>Code:</strong> {course.code}</p>
          </article>
        ))}
      </div>

      <section className="section-title" style={{ marginTop: '40px' }}>
        <h2>Latest Announcements</h2>
        <span>{news.length} updates</span>
      </section>
      <div className="section-grid">
        {news.slice(0, 3).map(item => (
          <article key={item._id} className="card">
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>

      <section className="section-title" style={{ marginTop: '40px' }}>
        <h2>Upcoming Events</h2>
        <span>{events.length} events</span>
      </section>
      <div className="grid-row" style={{ marginTop: '16px' }}>
        {events.slice(0, 3).map(event => (
          <div key={event._id} className="card">
            <h3>{event.title}</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
