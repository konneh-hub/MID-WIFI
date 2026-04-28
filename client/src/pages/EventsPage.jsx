import { useEffect, useState } from 'react';
import { fetchEvents } from '../services/api.js';

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(setEvents).catch(console.error);
  }, []);

  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Events Calendar</h1>
          <p>Upcoming academic, cultural, and student life events.</p>
        </div>
      </section>
      <div className="section-grid">
        {events.map(event => (
          <article key={event._id} className="card">
            <h3>{event.title}</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
