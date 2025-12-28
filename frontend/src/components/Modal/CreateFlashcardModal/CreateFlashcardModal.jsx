import { useState } from 'react';
import { X } from 'lucide-react';
import './CreateFlashcardModal.css';

const CreateFlashcardModal = ({ onClose }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
          
          <button className="btn btn-primary">
            Create FlashCard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFlashcardModal;