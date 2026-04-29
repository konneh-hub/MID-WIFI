function Hero({ title, subtitle, backgroundImage, children, className = '' }) {
  return (
    <section className={`hero ${className}`.trim()}>
      {backgroundImage && (
        <div className="hero-bg" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      )}
      <div className="hero-content">
        <div className="container">
          {title && <h1 className="hero-title">{title}</h1>}
          {subtitle && <p className="body-text">{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export default Hero;
