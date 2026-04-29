import { useEffect, useState } from 'react';
import { fetchEvents } from '../services/api.js';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents()
      .then(data => setEvents(data || []))
      .catch(err => {
        console.error('EventsPage: fetchEvents error', err);
        setError('Unable to load events right now.');
      });
  }, []);

  return (
    <div>
      <section className="section-title">
        <div>
          <h1 className="page-heading">Events Calendar</h1>
          <p className="body-text">Upcoming academic, cultural, and student life events.</p>
        </div>
      </section>

      {error && <p className="error-message">{error}</p>}
      {!error && events.length === 0 && <p>No scheduled events available.</p>}

      <div className="section-grid">
        {events.map(event => (
          <article key={event._id} className="card">
            <div className="program-card-icon">📅</div>
            <h3 className="card-title">{event.title}</h3>
            <p className="body-text"><strong>{new Date(event.date).toLocaleDateString()}</strong></p>
            <p className="body-text">{event.location}</p>
            <p className="muted small-text">{event.description ? event.description.substring(0, 80) + '...' : 'University event details.'}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
