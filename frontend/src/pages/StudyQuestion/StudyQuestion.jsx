import { X } from 'lucide-react';
import './StudyQuestion.css';

const StudyQuestion = ({ onNavigate, folder, card, cardNumber, totalCards }) => {
  return (
    <div className="study-container">
      <div className="study-card">
        <button onClick={() => onNavigate('dashboard')} className="close-button">
          <X size={24} color="#1f2937" />
        </button>

        <h3 className="study-header">
          Studying {folder?.name || 'Folder'} ({cardNumber}/{totalCards})
        </h3>

        <div className="study-content">
          {card?.question || 'Question'}
        </div>

        <div className="study-footer">
          <button onClick={() => onNavigate('studyAnswer', folder)} className="btn btn-primary btn-large">
            Show Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyQuestion;