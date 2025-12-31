import { X } from 'lucide-react';
import './SessionResults.css';

const SessionResults = ({ onNavigate, answers }) => {
  const totalCards = answers.length;
  const correctAnswers = answers.filter(answer => answer === true).length;
  const wrongAnswers = totalCards - correctAnswers;
  const score = totalCards > 0 ? Math.round((correctAnswers / totalCards) * 100) : 0;

  return (
    <div className="results-container">
      <div className="results-card">
        <button onClick={() => onNavigate('dashboard')} className="close-button">
          <X size={24} color="#1f2937" />
        </button>

        <h3 className="results-title">Session Completed</h3>

        <div className="results-message" style={{ 
          color: score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444' 
        }}>
          {score >= 80 ? 'Great Job !' : score >= 60 ? 'Good Work !' : 'Keep Practicing !'}
        </div>

        <div className="results-stats">
          <div className="result-item">
            <span className="result-icon">🎯</span>
            <span className="result-label">Score: <strong>{score}%</strong></span>
          </div>
          <div className="result-item">
            <span className="result-icon">✓</span>
            <span className="result-label">Correct answers : <strong>{correctAnswers}</strong></span>
          </div>
          <div className="result-item">
            <span className="result-icon">✕</span>
            <span className="result-label">Wrong answers : <strong>{wrongAnswers}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionResults;