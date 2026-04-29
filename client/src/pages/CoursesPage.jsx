import { useEffect, useMemo, useState } from 'react';
import { fetchCourses, fetchDepartments } from '../services/api.js';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchCourses(), fetchDepartments()])
      .then(([coursesData, departmentsData]) => {
        setCourses(coursesData || []);
        setDepartments(departmentsData || []);
      })
      .catch(err => {
        console.error('CoursesPage: fetch error', err);
        setError('Unable to load course or department data.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return courses.filter(course => {
      const matchesDepartment = selectedDepartment ? course.department?._id === selectedDepartment : true;
      const matchesSearch = normalizedSearch
        ? [course.title, course.code, course.department?.name, course.description]
            .filter(Boolean)
            .some(value => value.toLowerCase().includes(normalizedSearch))
        : true;
      return matchesDepartment && matchesSearch;
    });
  }, [courses, selectedDepartment, searchTerm]);

  const handleDepartmentChange = event => {
    setSelectedDepartment(event.target.value);
    setIsFiltering(true);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setIsFiltering(true);
  };

  useEffect(() => {
    if (!isFiltering) return;
    const timeout = window.setTimeout(() => setIsFiltering(false), 200);
    return () => window.clearTimeout(timeout);
  }, [isFiltering]);

  return (
    <main className="courses-page">
      <div className="courses-shell">
        <section className="courses-hero">
          <div className="courses-hero-copy">
            <span className="courses-eyebrow">Academic Catalog</span>
            <h1>Courses Offered</h1>
            <p>
              Explore the MIDWIFERY University catalog with structured course details, department filters, and a professional academic presentation for every learner.
            </p>
          </div>

          <div className="courses-hero-stat">
            <span className="stat-label">Total course offerings</span>
            <strong className="stat-value">{courses.length}</strong>
            <p className="stat-note">Updated as departments and offerings change.</p>
          </div>
        </section>

        <section className="courses-filter-bar">
          <div className="filter-heading">
            <strong>Filter by Department</strong>
            <p>Refine the catalog instantly using department and keyword search.</p>
          </div>

          <div className="filter-controls">
            <label className="filter-group">
              <span className="filter-label">Search courses</span>
              <input
                className="filter-input"
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search course title, code, or description"
                aria-label="Search courses"
              />
            </label>

            <label className="filter-group">
              <span className="filter-label">Department</span>
              <select
                className="filter-select"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                aria-label="Filter by department"
              >
                <option value="">All departments</option>
                {departments.map(department => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        {error ? (
          <div className="courses-empty-state error-state">
            <h2>Unable to load catalog</h2>
            <p>{error}</p>
          </div>
        ) : isLoading ? (
          <div className="courses-grid courses-loading-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <article key={index} className="course-card skeleton-card">
                <div className="skeleton-line skeleton-title" />
                <div className="skeleton-line skeleton-meta" />
                <div className="skeleton-line skeleton-text" />
                <div className="skeleton-line skeleton-text" />
                <div className="skeleton-line skeleton-button" />
              </article>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="courses-empty-state">
            <h2>No courses match your search</h2>
            <p>Try another department or broaden your search terms to see more offerings.</p>
          </div>
        ) : (
          <div className={`courses-grid ${isFiltering ? 'filtering' : ''}`}>
            {filteredCourses.map(course => (
              <article key={course._id} className="course-card">
                <div className="course-card-header">
                  <div className="course-icon">📖</div>
                  <div>
                    <h2 className="course-title">{course.title}</h2>
                    <div className="course-meta">
                      <span className="course-code">{course.code}</span>
                      <span className="course-department">
                        {course.department?.name || 'General Studies'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="course-description">
                  {course.description
                    ? course.description.slice(0, 140) + (course.description.length > 140 ? '…' : '')
                    : 'A focused course designed to strengthen academic and clinical outcomes.'}
                </p>

                <div className="course-footer">
                  <span className="course-badge">Course Catalog</span>
                  <button type="button" className="details-button">
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default CoursesPage;
