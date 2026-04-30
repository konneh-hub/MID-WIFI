import { useState, useEffect } from 'react';
import studentsImg from '../assets/students.avif';

const categories = [
  {
    id: 'Campus Life',
    title: 'Campus Life',
    description: 'Vibrant student experiences and daily campus moments',
    image: studentsImg
  },
  {
    id: 'Academic Events',
    title: 'Academic Events',
    description: 'Lectures, conferences, and scholarly gatherings',
    image: studentsImg // placeholder
  },
  {
    id: 'Community Impact',
    title: 'Community Impact',
    description: 'Our contributions to society and global initiatives',
    image: studentsImg // placeholder
  }
];

function GalleryPage() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media');
      if (!response.ok) throw new Error('Failed to fetch media');
      const data = await response.json();
      setMediaItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item, index) => {
    setSelectedMedia(item);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const nextMedia = () => {
    const nextIndex = (currentIndex + 1) % mediaItems.length;
    setSelectedMedia(mediaItems[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevMedia = () => {
    const prevIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    setSelectedMedia(mediaItems[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedMedia) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextMedia();
      if (e.key === 'ArrowLeft') prevMedia();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, currentIndex]);

  const filteredMedia = selectedCategory ? mediaItems.filter(item => item.category === selectedCategory) : mediaItems;

  if (loading) return <div className="gallery-page-shell"><p>Loading gallery...</p></div>;
  if (error) return <div className="gallery-page-shell"><p>Error: {error}</p></div>;

  return (
    <main className="gallery-page-shell">
      <section className="gallery-hero">
        <div className="gallery-hero-content">
          <h1>Media Gallery</h1>
          <p>Capturing the essence of our university community through moments that inspire and connect.</p>
        </div>
      </section>

      <section className="gallery-categories">
        <h2>Explore Categories</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <article key={category.id} className="category-card" style={{ backgroundImage: `url(${category.image})` }} onClick={() => setSelectedCategory(category.id)}>
              <div className="category-overlay">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            </article>
          ))}
        </div>
        {selectedCategory && (
          <button onClick={() => setSelectedCategory(null)} className="clear-filter-btn">Show All Media</button>
        )}
      </section>

      <section className="gallery-grid-section">
        <h2>{selectedCategory ? `${selectedCategory} Media` : 'All Media'}</h2>
        <div className="media-grid">
          {filteredMedia.map((item, index) => (
            <div key={item._id} className="media-item" onClick={() => openModal(item, index)}>
              {item.fileType === 'video' ? (
                <video src={item.fileUrl} alt={item.title} />
              ) : (
                <img src={item.fileUrl} alt={item.title} />
              )}
              <div className="media-overlay">
                {item.fileType === 'video' && <span className="play-icon">▶</span>}
                <span className="view-icon">👁</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedMedia && (
        <div className="lightbox-modal" onClick={closeModal}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.fileType === 'video' ? (
              <video src={selectedMedia.fileUrl} controls autoPlay />
            ) : (
              <img src={selectedMedia.fileUrl} alt={selectedMedia.title} />
            )}
            <button className="close-btn" onClick={closeModal}>×</button>
            <button className="nav-btn prev" onClick={prevMedia}>‹</button>
            <button className="nav-btn next" onClick={nextMedia}>›</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default GalleryPage;