import { useEffect, useMemo, useState } from 'react';
import { fetchFaculties, fetchDepartments } from '../services/api.js';

function FacultyPage() {
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchFaculties(), fetchDepartments()])
      .then(([facData, deptData]) => {
        setFaculties(facData || []);
        setDepartments(deptData || []);
      })
      .catch(err => {
        console.error('FacultyPage: fetch error', err);
        setError('Unable to load faculties at this time.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const facultyDepartments = useMemo(() => {
    const map = {};
    departments.forEach(department => {
      const facultyId = department.faculty?._id || department.faculty;
      if (!facultyId) return;
      map[facultyId] = map[facultyId] || [];
      map[facultyId].push(department);
    });
    return map;
  }, [departments]);

  const filteredFaculties = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) {
      return faculties;
    }

    return faculties.filter(faculty => {
      const title = faculty.name?.toLowerCase() || '';
      const dean = faculty.dean?.toLowerCase() || '';
      const description = faculty.description?.toLowerCase() || '';
      return (
        title.includes(normalized) ||
        dean.includes(normalized) ||
        description.includes(normalized)
      );
    });
  }, [faculties, searchTerm]);

  return (
    <main className="faculties-page">
      <div className="faculties-shell">
        <section className="faculties-hero">
          <div className="faculties-hero-copy">
            <span className="faculties-eyebrow">Academic Structure</span>
            <h1>Faculties</h1>
            <p>
              Discover the university’s faculty organization, each academic division, and the departments that shape teaching and research.
            </p>
          </div>

          <div className="faculties-stat-card">
            <p className="stat-label">Total faculties</p>
            <strong className="stat-value">{faculties.length}</strong>
            <p className="stat-note">Structured for strategic leadership and academic excellence.</p>
          </div>
        </section>

        <section className="faculties-filter-bar">
          <div className="filter-group">
            <label htmlFor="faculty-search" className="filter-label">
              Search faculties
            </label>
            <input
              id="faculty-search"
              type="search"
              className="filter-input"
              placeholder="Search by faculty name, dean, or focus"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-summary">
            <span>
              Showing {filteredFaculties.length} of {faculties.length} faculties
            </span>
          </div>
        </section>

        {error ? (
          <div className="faculties-empty-state error-state">
            <h2>Unable to load faculty data</h2>
            <p>{error}</p>
          </div>
        ) : isLoading ? (
          <div className="faculties-grid faculties-loading-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <article key={index} className="faculty-card faculty-skeleton">
                <div className="skeleton-line skeleton-title" />
                <div className="skeleton-line skeleton-subtitle" />
                <div className="skeleton-line skeleton-text" />
                <div className="skeleton-line skeleton-text" />
                <div className="skeleton-line skeleton-button" />
              </article>
            ))}
          </div>
        ) : filteredFaculties.length === 0 ? (
          <div className="faculties-empty-state">
            <h2>No faculties match your search</h2>
            <p>Try a broader term or remove the search to see all faculties.</p>
          </div>
        ) : (
          <section className="faculties-grid">
            {filteredFaculties.map(faculty => {
              const facultyDepts = facultyDepartments[faculty._id] || [];
              return (
                <article key={faculty._id} className="faculty-card">
                  <div className="faculty-card-header">
                    <div className="faculty-icon">🏛️</div>
                    <div>
                      <h2 className="faculty-title">{faculty.name}</h2>
                      {faculty.dean && <p className="faculty-dean">Dean: {faculty.dean}</p>}
                    </div>
                  </div>

                  <p className="faculty-description">
                    {faculty.description
                      ? faculty.description.slice(0, 160) + (faculty.description.length > 160 ? '…' : '')
                      : 'A distinguished faculty leading academic priorities, research initiatives, and student development.'}
                  </p>

                  <div className="faculty-dept-preview">
                    <div className="preview-title">Departments</div>
                    {facultyDepts.length > 0 ? (
                      <ul className="preview-list">
                        {facultyDepts.slice(0, 4).map(dept => (
                          <li key={dept._id}>
                            <a href="#" className="dept-item">
                              {dept.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="preview-note">No department preview is available yet.</p>
                    )}
                  </div>

                  <button type="button" className="faculty-action">
                    View Faculty Details
                  </button>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

export default FacultyPage;
