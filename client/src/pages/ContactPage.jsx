import { useEffect, useState } from 'react';
import { sendContact } from '../services/api.js';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 40);
    return () => window.clearTimeout(timer);
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please complete all fields before sending.' });
      return;
    }

    setLoading(true);

    try {
      await sendContact(form);
      setStatus({ type: 'success', message: 'Message sent. We will contact you shortly.' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Unable to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`contact-page-shell${mounted ? ' mounted' : ''}`}>
      <section className="contact-hero">
        <div className="contact-hero-copy">
          <p className="eyebrow">Contact Us</p>
          <h1>Get in touch with MIDWIFI University</h1>
          <p>
            Reach out to our admissions team, student services, or campus administration for
            questions about programs, applications, events, and support resources.
          </p>
        </div>
      </section>

      <section className="contact-layout">
        <div className="contact-card contact-info-card">
          <div className="contact-card-header">
            <div className="contact-card-icon" aria-hidden="true">📬</div>
            <div>
              <h2>Get in touch</h2>
              <p>Our team is ready to answer your inquiry.</p>
            </div>
          </div>

          <div className="info-list">
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <p className="info-label">Email</p>
                <a href="mailto:info@midwifi.edu">info@midwifi.edu</a>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <p className="info-label">Phone</p>
                <a href="tel:+15550100">+1 555 0100</a>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <p className="info-label">Address</p>
                <address>123 University Way, Knowledge City</address>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <div>
                <p className="info-label">Office hours</p>
                <p>Mon – Fri, 8:30 AM – 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="quick-links">
            <a href="/admissions">Admissions</a>
            <a href="/programs">Programs</a>
            <a href="/research-center">Support</a>
          </div>
        </div>

        <div className="contact-card contact-form-card">
          <div className="contact-card-header">
            <div className="contact-card-icon" aria-hidden="true">💬</div>
            <div>
              <h2>Send a message</h2>
              <p>Tell us how we can help and we’ll respond as soon as possible.</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="your.email@university.edu"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                rows="6"
                placeholder="Describe your inquiry or request here..."
                value={form.message}
                onChange={handleChange}
                required
              />
              <div className="character-count">{form.message.length}/500</div>
            </div>

            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}

            <button className="form-button" type="submit" disabled={loading}>
              {loading ? 'Sending message…' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      <section className="contact-map-placeholder">
        <div>
          <h3>Location map coming soon</h3>
          <p>A future map section will help visitors find our campus and support centers.</p>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
