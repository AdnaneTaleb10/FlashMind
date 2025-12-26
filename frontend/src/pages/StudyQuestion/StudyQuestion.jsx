import { useNavigate, useSearchParams } from "react-router-dom";
import "./StudyQuestion.css";

function StudyQuestion() {
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
        <p>"Bonjour" means what ?</p>
        <button onClick={() => navigate(`/study-answer?subject=${subject}`)}>
          Show Answer
        </button>
      </div>
    </div>
  );
}

export default StudyQuestion;
