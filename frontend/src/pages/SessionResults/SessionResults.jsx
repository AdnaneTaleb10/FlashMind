import './SessionResults.css';
import { useNavigate } from 'react-router-dom';

function SessionResults() {
  const navigate = useNavigate();

  const handleReviewWrongAnswers = () => {
    navigate('/study-question?subject=Review&mode=wrong');
  };

  const handleNewSession = () => {
    navigate('/study-question');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="session-results">
      <h1>FLASH MIND</h1>
      <div className="results-title">Session Completed</div>
      <div className="results-subtitle">Great Job !</div>

      <div className="results-stats">
        <div className="stat-item">
          <span className="stat-label">Score:</span>
          <span className="stat-value">85%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Correct answer:</span>
          <span className="stat-value">15</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Wrong answers:</span>
          <span className="stat-value">4</span>
        </div>
      </div>

      <div className="action-buttons">
        <button className="review-btn" onClick={handleReviewWrongAnswers}>
          Review Wrong Answers
        </button>
        <button className="new-session-btn" onClick={handleNewSession}>
          New Study Session
        </button>
        <button className="dashboard-btn" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default SessionResults;