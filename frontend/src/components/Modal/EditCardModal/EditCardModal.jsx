
import { useState } from 'react';
import { X } from 'lucide-react';
import './EditCardModal.css';

const EditCardModal = ({ card, onSave, onClose }) => {
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);

  const handleSave = () => {
    if (question.trim() && answer.trim()) {
      onSave({ ...card, question: question.trim(), answer: answer.trim() });
      onClose();
    }
  };

  const isValid = question.trim() && answer.trim();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-wide" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">
          <X size={20} color="#1f2937" />
        </button>

        <h3 className="modal-title">Edit Flash Card</h3>

        <div className="modal-form">
          <div className="form-group">
            <label className="modal-label">Front(Question) :</label>
            <input 
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Question"
              className="modal-input"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="modal-label">Back(Answer) :</label>
            <input 
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Answer"
              className="modal-input"
            />
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn btn-cancel">
            Cancel
          </button>
          
          <button 
            onClick={handleSave}
            disabled={!isValid}
            className={`btn btn-primary ${!isValid ? 'btn-disabled' : ''}`}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCardModal;