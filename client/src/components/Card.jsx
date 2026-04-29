function CardComponent({ image, title, description, link, className = '', children }) {
  const cardElement = (
    <div className={`card ${className}`.trim()}>
      {image && <div className="card-image" style={{ backgroundImage: `url(${image})` }}></div>}
      <div className="card-body">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="body-text">{description}</p>}
        {children}
      </div>
    </div>
  );

  if (link) {
    return <a href={link} style={{ textDecoration: 'none' }}>{cardElement}</a>;
  }

  return cardElement;
}

export default CardComponent;