import { useState } from 'react';
import { X } from 'lucide-react';
import './StudyAnswer.css';

const StudyAnswer = ({ onNavigate, folder, card, onAnswer, onNext, cardNumber, totalCards }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Animation de flip au chargement
  useState(() => {
    setTimeout(() => setIsFlipped(true), 100);
  }, []);

  const handleCorrect = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer('correct');
      onAnswer(true);
    }
  };

  const handleWrong = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer('wrong');
      onAnswer(false);
    }
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setIsFlipped(false);
      setTimeout(() => {
        onNext();
      }, 300);
    }
  };

  return (
    <div className="answer-container">
      <div className="answer-card">
        <button onClick={() => onNavigate('dashboard')} className="close-button">
          <X size={24} color="#1f2937" />
        </button>

        <h3 className="answer-header">
          Studying {folder?.name || 'Folder'} ({cardNumber}/{totalCards})
        </h3>

        <div className="flip-card">
          <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
            <div className="flip-card-front">
              <div className="card-label">Question</div>
              <div className="card-content">
                {card?.question || 'Question'}
              </div>
            </div>
            <div className="flip-card-back">
              <div className="card-label">Answer</div>
              <div className="card-content">
                {card?.answer || 'Answer'}
              </div>
            </div>
          </div>
        </div>

        <div className="answer-actions">
          <button 
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`btn btn-primary btn-large ${selectedAnswer === null ? 'btn-disabled' : ''}`}>
            Next Card
          </button>
        </div>

        <div className="answer-buttons">
          <button 
            onClick={handleCorrect}
            disabled={selectedAnswer !== null}
            className={`btn btn-success ${selectedAnswer === 'correct' ? 'btn-selected' : ''} ${selectedAnswer !== null && selectedAnswer !== 'correct' ? 'btn-disabled' : ''}`}>
            Correct ✓
          </button>
          
          <button 
            onClick={handleWrong}
            disabled={selectedAnswer !== null}
            className={`btn btn-error ${selectedAnswer === 'wrong' ? 'btn-selected' : ''} ${selectedAnswer !== null && selectedAnswer !== 'wrong' ? 'btn-disabled' : ''}`}>
            Wrong ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyAnswer;