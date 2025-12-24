// src/pages/StudyQuestion/StudyQuestion.jsx
import './StudyQuestion.css';

function StudyQuestion() {
  return (
    <div className="study-screen">
      <div className="header">
        <h1>FLASH MIND</h1>
        <div className="subtitle">Studying French</div>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="question">
            "Bonjour" means what ?
          </div>
        </div>
      </div>

      <div className="footer">
        <button className="show-answer-btn">Show Answer</button>
      </div>
    </div>
  );
}

export default StudyQuestion;