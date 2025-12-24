// src/pages/CreateFlashcard/CreateFlashcard.jsx
import React, { useState } from "react";
import "./CreateFlashcard.css";  // ← CORRECTION ICI

const CreateFlashcard = ({ onCreate, onCancel }) => {  // ← Nom du composant changé aussi
  const [formData, setFormData] = useState({
    front: '',
    back: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.front.trim()) {
      newErrors.front = 'La question est requise';
    }
    
    if (!formData.back.trim()) {
      newErrors.back = 'La réponse est requise';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onCreate(formData);
    }
  };

  const handleCancelClick = () => {
    setFormData({ front: '', back: '' });
    setErrors({});
    onCancel();
  };

  return (
    <div className="create-flashcard-page">
      <div className="create-flashcard-container">
        <div className="create-flashcard-header">
          <h2>Create New Flash Card</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="flashcard-form">
          <div className="form-group">
            <label htmlFor="front">Front (Question):</label>
            <textarea
              id="front"
              name="front"
              value={formData.front}
              onChange={handleChange}
              placeholder="Entrez votre question ici..."
              className={`form-textarea ${errors.front ? 'error' : ''}`}
              rows={4}
            />
            {errors.front && <span className="error-message">{errors.front}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="back">Back (Answer):</label>
            <textarea
              id="back"
              name="back"
              value={formData.back}
              onChange={handleChange}
              placeholder="Entrez la réponse ici..."
              className={`form-textarea ${errors.back ? 'error' : ''}`}
              rows={4}
            />
            {errors.back && <span className="error-message">{errors.back}</span>}
          </div>
          
          <div className="create-flashcard-actions">
            <button type="button" className="btn-cancel" onClick={handleCancelClick}>
              Cancel
            </button>
            <button type="submit" className="btn-create">
              Create FlashCard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFlashcard;