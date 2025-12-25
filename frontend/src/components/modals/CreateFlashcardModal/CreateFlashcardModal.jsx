import { useState } from 'react';
import './CreateFlashcardModal.css';

function CreateFlashcardModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    front: '',
    back: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.front.trim()) {
      newErrors.front = 'Please enter a question';
    }
    if (!formData.back.trim()) {
      newErrors.back = 'Please enter an answer';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onCreate(formData);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleClose = () => {
    setFormData({ front: '', back: '' });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Flash Card</h2>
          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Front (Question) :</label>
            <textarea
              name="front"
              value={formData.front}
              onChange={handleChange}
              placeholder="Question"
              rows={4}
              className={errors.front ? 'error' : ''}
              autoFocus
            />
            {errors.front && <div className="error-message">{errors.front}</div>}
          </div>

          <div className="form-group">
            <label>Back (Answer) :</label>
            <textarea
              name="back"
              value={formData.back}
              onChange={handleChange}
              placeholder="Answer"
              rows={4}
              className={errors.back ? 'error' : ''}
            />
            {errors.back && <div className="error-message">{errors.back}</div>}
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create FlashCard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateFlashcardModal;