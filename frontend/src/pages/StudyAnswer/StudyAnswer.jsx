import './StudyAnswer.css';
import { useNavigate, useLocation } from 'react-router-dom';

function StudyAnswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subject = searchParams.get('subject') || 'French';

  const handleNextCard = () => {
    navigate(`/study-question?subject=${subject}`);
  };

  const handleCorrect = () => {
    // Logique pour marquer comme correct
    navigate(`/study-question?subject=${subject}`);
  };

  const handleWrong = () => {
    // Logique pour marquer comme incorrect
    navigate(`/study-question?subject=${subject}`);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="study-answer">
      <header className="study-header">
        <button className="back-button" onClick={handleBack}>×</button>
        <h1>FLASH MIND</h1>
        <div className="subject-info">Studying {subject}</div>
      </header>

      <main className="answer-content">
        <div className="answer-box">
          "Bonjour" means "Good Morning"
        </div>
        
        <div className="answer-actions">
          <button className="next-card-button" onClick={handleNextCard}>
            Next Card
          </button>
          
          <div className="feedback-buttons">
            <button className="correct-button" onClick={handleCorrect}>
              Correct
            </button>
            <button className="wrong-button" onClick={handleWrong}>
              Wrong X
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudyAnswer;