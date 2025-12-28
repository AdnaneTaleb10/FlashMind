import { X } from 'lucide-react';
import './StudyAnswer.css';

const StudyAnswer = ({ onNavigate, folder }) => {
  return (
    <div className="answer-container">
      <div className="answer-card">
        <button 
          onClick={() => onNavigate('dashboard')}
          className="close-button">
          <X size={24} color="#1f2937" />
        </button>

        <h3 className="answer-header">Studying {folder?.name || 'French'}</h3>

        <div className="answer-content">
          "Bonjour" means "Good Morning"
        </div>

        <div className="answer-actions">
          <button 
            onClick={() => onNavigate('sessionResults')}
            className="btn btn-primary btn-large">
            Next Card
          </button>
        </div>

        <div className="answer-buttons">
          <button className="btn btn-success">Correct ✓</button>
          <button className="btn btn-error">Wrong ✕</button>
        </div>
      </div>
    </div>
  );
};

export default StudyAnswer;