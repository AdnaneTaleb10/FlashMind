// src/pages/StudyAnswer/StudyAnswer.jsx
import './StudyAnswer.css';

function StudyAnswer() {
  return (
    <div className="study-screen">
      <div className="header">
        <h1>FLASH MIND</h1>
        <div className="subtitle">Studying French</div>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="answer">
            "Bonjour" means "Good Morning"
          </div>
        </div>
      </div>

      <div className="footer">
        <button className="next-card-btn">Next Card</button>
        <div className="feedback-buttons">
          <button className="correct-btn">Correct ✔</button>
          <button className="wrong-btn">Wrong ✘</button>
        </div>
      </div>
    </div>
  );
}

export default StudyAnswer;