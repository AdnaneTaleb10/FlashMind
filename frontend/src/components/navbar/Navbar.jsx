import "./Navbar.css";
import Button from "../button/Button";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>FlashMind</h1>
      </div>

      <div className="navbar-actions">
        <Button className="sign-in" content="Sign In" />
        <Button className="sign-up" content="Sign Up" />
      </div>
    </nav>
  );
}
