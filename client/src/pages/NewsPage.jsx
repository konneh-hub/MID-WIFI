import { useEffect, useState } from 'react';
import { fetchNews } from '../services/api.js';

function NewsPage() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then((data) => {
        setNews(data || []);
      })
      .catch((error) => {
        console.error('NewsPage: fetchNews error', error);
        setError('Unable to load news at the moment.');
      })
      .finally(() => setLoading(false));
  }, []);

  const featured = news[0];
  const recentNews = news.slice(1);

  return (
    <main className="news-page-shell">
      <section className="news-hero">
        <div>
          <p className="hero-eyebrow">News & Announcements</p>
          <h1>University updates, events, and campus stories</h1>
          <p>
            Stay informed with the latest news from MIDWIFERY University, including announcements,
            research progress, community events, and student achievements.
          </p>
        </div>
      </section>

      {error && <div className="empty-state"><p>{error}</p></div>}

      {loading && <div className="empty-state"><p>Loading news...</p></div>}

      {!loading && !error && featured && (
        <section className="news-featured">
          <article className="news-featured-card">
            <div className="news-featured-media" style={{ backgroundImage: featured.image ? `url(${featured.image})` : 'linear-gradient(135deg, rgba(15,76,92,0.12), rgba(224,164,88,0.12))' }}>
              {!featured.image && <span className="media-fallback">Featured</span>}
            </div>
            <div className="news-featured-copy">
              {featured.category && <span className="news-tag">{featured.category}</span>}
              <h2>{featured.title}</h2>
              <p>{featured.summary || 'Read the latest news and announcements from our campus.'}</p>
              <div className="news-meta">
                <span>Published {new Date(featured.publishedAt).toLocaleDateString()}</span>
                <a href={`/news/${featured._id}`} className="read-more">Read more</a>
              </div>
            </div>
          </article>
        </section>
      )}

      {!loading && !error && (
        <section className="news-grid"> 
          {recentNews.length > 0 ? (
            recentNews.map((item) => (
              <article key={item._id} className="news-card">
                <div className="news-card-media" style={{ backgroundImage: item.image ? `url(${item.image})` : 'linear-gradient(135deg, rgba(15,76,92,0.08), rgba(224,164,88,0.08))' }}>
                  {!item.image && <span className="media-fallback">News</span>}
                </div>
                <div className="news-card-body">
                  {item.category && <span className="news-card-tag">{item.category}</span>}
                  <h3>{item.title}</h3>
                  <p>{item.summary ? `${item.summary.substring(0, 130)}...` : 'Stay updated with the latest university announcements.'}</p>
                  <div className="card-footer">
                    <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                    <a href={`/news/${item._id}`} className="read-more">Read more</a>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h2>No news available</h2>
              <p>We’re updating this section regularly. Check back later for the latest stories.</p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default NewsPage;
