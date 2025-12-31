import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';
import './StudyQuestion.css';

const StudyQuestion = () => {
  const navigate = useNavigate();
  const { studySession, selectedFolder } = useApp();

  const card = studySession.cards[studySession.currentCardIndex];
  const cardNumber = studySession.currentCardIndex + 1;
  const totalCards = studySession.cards.length;

  return (
      <div className="study-container">
        <div className="study-card">
          <button onClick={() => navigate('/app')} className="close-button">
            <X size={24} color="#1f2937" />
          </button>

          <h3 className="study-header">
            Studying {selectedFolder?.name || 'Folder'} ({cardNumber}/{totalCards})
          </h3>

          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div className="card-label">Question</div>
                <div className="card-content">
                  {card?.question || 'Question'}
                </div>
              </div>
            </div>
          </div>

          <div className="study-footer">
            <button
                onClick={() => navigate('/app/study/answer')}
                className="btn btn-primary btn-large">
              Show Answer
            </button>
          </div>
        </div>
      </div>
  );
};

export default StudyQuestion;