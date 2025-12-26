import { useNavigate, useSearchParams } from "react-router-dom";
import "./StudyAnswer.css";

function StudyAnswer() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const subject = params.get("subject") || "French";

  return (
    <div className="study">
      <header className="study-header">
        <h1>FLASH MIND</h1>
        <span className="close" onClick={() => navigate("/dashboard")}>✖</span>
      </header>

      <div className="card">
        <h3>Studying {subject}</h3>
        <p>"Bonjour" means "Good Morning"</p>

        <button onClick={() => navigate(`/study-question?subject=${subject}`)}>
          Next Card
        </button>

        <div className="feedback">
          <button className="correct">Correct ✓</button>
          <button className="wrong">Wrong ✗</button>
        </div>
      </div>
    </div>
  );
}

export default StudyAnswer;
