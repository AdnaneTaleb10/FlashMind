
import { useState } from 'react';
import { X } from 'lucide-react';
import './CreateFlashcardModal.css';

const CreateFlashcardModal = ({ onClose, onCreate }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleCreate = () => {
    if (question.trim() && answer.trim()) {
      onCreate(question.trim(), answer.trim());
      onClose();
    }
  };

  const isValid = question.trim().length > 0 && answer.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-wide" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">
          <X size={20} color="#1f2937" />
        </button>

        <h3 className="modal-title">Create New Flash Card</h3>

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
            onClick={handleCreate}
            disabled={!isValid}
            className={`btn btn-primary ${!isValid ? 'btn-disabled' : ''}`}>
            Create FlashCard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFlashcardModal;