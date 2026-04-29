import { useEffect, useState, useRef } from 'react';
import { fetchDepartments, fetchPrograms } from '../services/api.js';
import Card from '../components/Card.jsx';

function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const gridRef = useRef(null);

  useEffect(() => {
    Promise.all([fetchDepartments(), fetchPrograms()])
      .then(([deptData, progData]) => {
        setDepartments(deptData || []);
        setPrograms(progData || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('DepartmentsPage: fetch error', err);
        setError('Unable to load departments right now.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.department-card');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('visible');
              }, index * 100);
            }
          });
        },
        { threshold: 0.1 }
      );

      cards.forEach(card => observer.observe(card));
      return () => observer.disconnect();
    }
  }, [loading]);

  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="departments-hero">
        <div className="hero-content">
          <h1 className="hero-title">Faculties & Departments</h1>
          <p className="hero-description">
            Explore our academic structure, where dedicated departments drive innovation in healthcare education and research.
          </p>
          <div className="stats-badge">
            <span className="stats-number">{departments.length}</span>
            <span className="stats-label">Total Departments</span>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="section">
        <div className="departments-grid" ref={gridRef}>
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="department-card skeleton">
                <div className="skeleton-header"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-programs">
                  <div className="skeleton-program"></div>
                  <div className="skeleton-program"></div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
            </div>
          ) : departments.length === 0 ? (
            <div className="empty-state">
              <p>No departments available currently.</p>
            </div>
          ) : (
            departments.map(dept => {
              const deptPrograms = programs.filter(prog => prog.department === dept._id);
              return (
                <div key={dept._id} className="department-card">
                  <div className="department-header">
                    <h3 className="department-name">{dept.name}</h3>
                    <div className="department-icon">🏛️</div>
                  </div>
                  <p className="department-description">
                    {dept.description || 'A dedicated department focused on advancing healthcare education and research.'}
                  </p>
                  {deptPrograms.length > 0 && (
                    <div className="programs-section">
                      <h4 className="programs-title">Programs Offered</h4>
                      <ul className="programs-list">
                        {deptPrograms.slice(0, 4).map(prog => (
                          <li key={prog._id} className="program-item">
                            <span className="program-title">{prog.title}</span>
                            <span className="program-badge">{prog.type}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

export default DepartmentsPage;

