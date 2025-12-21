import "./Button.css";

export default function Button({ content, icon, position, className = "" }) {
  return (
    <button className={`button ${className}`}>
      {icon && position === "left" && <span className="icon-left">{icon}</span>}
      {content}
      {icon && position === "right" && (
        <span className="icon-right">{icon}</span>
      )}
    </button>
  );
}
