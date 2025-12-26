import React, { useState } from 'react';
import './CreateFlashcardModal.css';

const CreateFlashcardModal = ({ isOpen, onClose, onCreateFlashcard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!question.trim()) newErrors.question = 'Question is required';
    if (!answer.trim()) newErrors.answer = 'Answer is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onCreateFlashcard({ question, answer });
    setQuestion('');
    setAnswer('');
    setErrors({});
    onClose();
  };

  const handleCancel = () => {
    setQuestion('');
    setAnswer('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Create New Flash Card</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="question">Front(Question):</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                setErrors({...errors, question: ''});
              }}
              placeholder="Question"
              rows={4}
              className={errors.question ? 'input-error' : ''}
              autoFocus
            />
            {errors.question && <span className="error-message">{errors.question}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="answer">Back(Answer):</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setErrors({...errors, answer: ''});
              }}
              placeholder="Answer"
              rows={4}
              className={errors.answer ? 'input-error' : ''}
            />
            {errors.answer && <span className="error-message">{errors.answer}</span>}
          </div>
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
            >
              Create FlashCard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFlashcardModal;