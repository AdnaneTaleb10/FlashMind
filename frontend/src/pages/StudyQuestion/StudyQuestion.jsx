import './StudyQuestion.css';
import { useNavigate, useLocation } from 'react-router-dom';

function StudyQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subject = searchParams.get('subject') || 'French';

  const handleShowAnswer = () => {
    navigate(`/study-answer?subject=${subject}`);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="study-question">
      <header className="study-header">
        <button className="back-button" onClick={handleBack}>×</button>
        <h1>FLASH MIND</h1>
        <div className="subject-info">Studying {subject}</div>
      </header>

      <main className="question-content">
        <div className="question-box">
          "Bonjour" means what ?
        </div>
        <button className="show-answer-button" onClick={handleShowAnswer}>
          Show Answer
        </button>
      </main>
    </div>
  );
}

export default StudyQuestion;