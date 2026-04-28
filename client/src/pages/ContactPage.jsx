import { useState } from 'react';
import { sendContact } from '../services/api.js';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await sendContact(form);
      setStatus('Message sent. We will contact you shortly.');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Unable to send message. Please try again later.');
    }
  };

  return (
    <div>
      <section className="section-title">
        <div>
          <h1>Contact Us</h1>
          <p>Reach out to MID-WIFI University for questions about programs, admissions, or campus life.</p>
        </div>
      </section>
      <div className="grid-row" style={{ marginTop: '24px' }}>
        <div className="card">
          <h2>Get in touch</h2>
          <p>Email: info@midwifi.edu</p>
          <p>Phone: +1 555 0100</p>
          <p>Address: 123 University Way, Knowledge City</p>
        </div>
        <div className="card">
          <h2>Send a message</h2>
          <form className="form-grid" onSubmit={handleSubmit}>
            <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
            <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
            <button className="submit-button" type="submit">Send message</button>
          </form>
          {status && <p style={{ marginTop: '16px' }}>{status}</p>}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
