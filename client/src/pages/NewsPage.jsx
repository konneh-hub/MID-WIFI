import { useEffect, useState } from 'react';
import { fetchNews } from '../services/api.js';

function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews().then(setNews).catch(console.error);
  }, []);

  return (
    <div>
      <section className="section-title">
        <div>
          <h1>News & Announcements</h1>
          <p>Latest university updates and important announcements.</p>
        </div>
      </section>
      <div className="section-grid">
        {news.map(item => (
          <article key={item._id} className="card">
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <p className="muted">Published {new Date(item.publishedAt).toLocaleDateString()}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;
