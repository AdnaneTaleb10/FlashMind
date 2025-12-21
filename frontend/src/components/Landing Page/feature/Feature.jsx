import "./Feature.css";

export default function Feature({ image, title, description }) {
  return (
    <div className="feature">
      <img src={image} alt={title} className="feature-image" />
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}