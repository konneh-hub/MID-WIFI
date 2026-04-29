import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPrograms } from '../services/api.js';

const capitalize = value =>
  value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : '';

function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get('type')?.toLowerCase();

  useEffect(() => {
    fetchPrograms()
      .then(data => {
        const rawPrograms = data || [];
        const filteredPrograms = typeFilter
          ? rawPrograms.filter(program => (program.type || '').toLowerCase() === typeFilter)
          : rawPrograms;
        setPrograms(filteredPrograms);
      })
      .catch(err => {
        console.error('ProgramsPage: fetchPrograms error', err);
        setError('Unable to load programs right now.');
      });
  }, [typeFilter]);

  const visiblePrograms = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    if (!search) {
      return programs;
    }

    return programs.filter(program => {
      const title = (program.title || '').toLowerCase();
      const code = (program.code || '').toLowerCase();
      const type = (program.type || '').toLowerCase();
      const description = (program.description || '').toLowerCase();
      return title.includes(search) || code.includes(search) || type.includes(search) || description.includes(search);
    });
  }, [programs, searchTerm]);

  const pageTitle = typeFilter ? `${capitalize(typeFilter)} Programs` : 'Academic Programs';
  const filterLabel = typeFilter ? `Filtered by: ${capitalize(typeFilter)}` : null;

  const handleClearFilter = () => {
    setSearchParams({});
    setSearchTerm('');
  };

  const totalCount = programs.length;
  const visibleCount = visiblePrograms.length;

  const getDurationText = program => {
    if (program.duration) {
      return `${program.duration} ${program.durationUnit || 'Years'}`;
    }
    return 'Duration varies';
  };

  return (
    <div className="programs-page">
      <section className="programs-hero">
        <div className="programs-hero-copy">
          <span className="hero-eyebrow">Academic Catalog</span>
          <h1>{pageTitle}</h1>
          <p className="hero-text">
            {typeFilter
              ? `Explore our curated ${capitalize(typeFilter)} pathways with clear structure, academic focus, and practical relevance.`
              : 'Browse our complete academic programs catalog, spanning undergraduate and postgraduate pathways designed for future health leaders.'}
          </p>
        </div>

        <div className="programs-hero-stat">
          <span className="stat-label">Programs available</span>
          <strong className="stat-value">{totalCount}</strong>
          <p className="stat-note">
            {typeFilter
              ? `${capitalize(typeFilter)} programs tailored for rigorous scholarship and professional impact.`
              : 'A cohesive catalog of all available university programs and academic tracks.'}
          </p>
        </div>
      </section>

      <section className="programs-filter-context">
        <div className="filter-row">
          <p className="programs-summary">
            {typeFilter
              ? `Showing ${visibleCount} of ${totalCount} ${capitalize(typeFilter)} programs`
              : `Browse ${visibleCount} academic programs`}
          </p>

          {filterLabel && (
            <div className="filter-pill-group">
              <span className="filter-pill">{filterLabel}</span>
              <button type="button" className="filter-clear" onClick={handleClearFilter}>
                Reset filter
              </button>
            </div>
          )}
        </div>

        <div className="programs-search-shell">
          <label htmlFor="program-search" className="sr-only">
            Search programs
          </label>
          <input
            id="program-search"
            type="search"
            className="programs-search"
            placeholder="Search by program name, code, type, or keyword"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <section className="programs-grid">
        {error ? (
          <div className="empty-state">
            <h2>Unable to load programs</h2>
            <p>{error}</p>
          </div>
        ) : visibleCount === 0 ? (
          <div className="empty-state">
            <h2>No matching programs</h2>
            <p>Try a different search term or clear the filter to explore more academic options.</p>
          </div>
        ) : (
          visiblePrograms.map(program => (
            <article key={program._id || program.code || program.title} className="program-card">
              <div className="program-card-header">
                <div className="program-card-icon">📚</div>
                <div>
                  <h3 className="program-card-title">{program.title}</h3>
                  <div className="meta-row">
                    <span className="meta-badge">{program.code || 'N/A'}</span>
                    <span className="meta-type">{capitalize(program.type || 'Program')}</span>
                  </div>
                </div>
              </div>

              <div className="program-card-duration">
                <span className="duration-label">Duration</span>
                <strong>{getDurationText(program)}</strong>
              </div>

              <p className="program-card-description">
                {program.description
                  ? program.description.length > 120
                    ? `${program.description.slice(0, 120).trim()}...`
                    : program.description
                  : 'An expertly designed academic program with strong practical and theoretical grounding.'}
              </p>

              <div className="program-card-footer">
                <button type="button" className="view-details-button">
                  View details
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default ProgramsPage;
