import "./Navbar.css";
import Button from "../../button/Button";
import { useNavigate} from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>FlashMind</h1>
      </div>

      <div className="navbar-actions">
        <Button className="sign-in" content="Sign In" onClick={() => navigate('/signin')} />
        <Button className="sign-up" content="Sign Up" onClick={() => navigate('/signup')} />
      </div>
    </nav>
  );
}
