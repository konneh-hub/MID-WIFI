function Section({ title, subtitle, eyebrow, children, className = '', split = false }) {
  return (
    <section className={`section ${split ? 'section-split' : ''} ${className}`.trim()}>
      {(title || subtitle || eyebrow) && (
        <div className="section-header">
          <div>
            {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
          </div>
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export default Section;
