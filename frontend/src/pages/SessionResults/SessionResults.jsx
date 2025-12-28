import { X } from 'lucide-react';
import './SessionResults.css';

const SessionResults = ({ onNavigate }) => {
  return (
    <div className="results-container">
      <div className="results-card">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="close-button">
          <X size={24} color="#1f2937" />
        </button>

        <h3 className="results-title">Session Completed</h3>

        <div className="results-message">Great Job !</div>

        <div className="results-stats">
          <div className="result-item">
            <span className="result-icon">🎯</span>
            <span className="result-label">Score: <strong>85%</strong></span>
          </div>
          <div className="result-item">
            <span className="result-icon">✓</span>
            <span className="result-label">Correct answers : <strong>15</strong></span>
          </div>
          <div className="result-item">
            <span className="result-icon">✕</span>
            <span className="result-label">Wrong answers : <strong>4</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionResults;