import './FolderView.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CreateFlashcardModal from '../../components/modals/CreateFlashcardModal/CreateFlashcardModal';

function FolderView() {
  const navigate = useNavigate();
  const [showCreateFlashcardModal, setShowCreateFlashcardModal] = useState(false);
  
  const [cards, setCards] = useState([
    { id: 1, text: 'Card 1', date: '2025/11/24', checked: false },
    { id: 2, text: 'Card 2', date: '2025/11/24', checked: false },
    { id: 3, text: 'Card 3', date: '2025/11/24', checked: false },
    { id: 4, text: 'Card 4', date: '2025/11/24', checked: false },
  ]);

  const handleCheckboxChange = (id) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, checked: !card.checked } : card
    ));
  };

  const handleDeleteCard = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this card?');
    if (confirmDelete) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  const handleAddFlashcard = () => {
    setShowCreateFlashcardModal(true);
  };

  const handleSaveFlashcard = (flashcardData) => {
    // Utiliser flashcardData pour créer une nouvelle carte
    const newCard = {
      id: cards.length + 1,
      text: flashcardData.front.length > 20 
        ? flashcardData.front.substring(0, 20) + '...' 
        : flashcardData.front,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '/'),
      checked: false,
      details: flashcardData // Stocker les détails complets
    };
    
    setCards([...cards, newCard]);
    setShowCreateFlashcardModal(false);
    
    // Afficher un message de confirmation
    alert(`Flashcard created successfully!\n\nQuestion: ${flashcardData.front}\nAnswer: ${flashcardData.back}`);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleEdit = (id) => {
    const cardToEdit = cards.find(card => card.id === id);
    const newText = prompt('Edit card text:', cardToEdit?.text);
    if (newText && newText.trim() !== '') {
      setCards(cards.map(card => 
        card.id === id ? { ...card, text: newText } : card
      ));
    }
  };

  const handleStudyFolder = () => {
    navigate('/study-question?subject=French');
  };

  const handleSelectAll = () => {
    const allChecked = cards.every(card => card.checked);
    setCards(cards.map(card => ({ ...card, checked: !allChecked })));
  };

  const handleDeleteSelected = () => {
    const selectedCards = cards.filter(card => card.checked);
    if (selectedCards.length === 0) {
      alert('No cards selected!');
      return;
    }
    
    const confirmDelete = window.confirm(`Delete ${selectedCards.length} selected card(s)?`);
    if (confirmDelete) {
      setCards(cards.filter(card => !card.checked));
    }
  };

  return (
    <div className="folder-view">
      <div className="folder-header">
        <button className="back-button" onClick={handleBack}>×</button>
        <h1>FLASH MIND</h1>
        <div className="folder-title">French</div>
      </div>

      <div className="cards-controls">
        <button className="select-all-btn" onClick={handleSelectAll}>
          {cards.every(card => card.checked) ? 'Deselect All' : 'Select All'}
        </button>
        <button className="delete-selected-btn" onClick={handleDeleteSelected}>
          Delete Selected ({cards.filter(card => card.checked).length})
        </button>
      </div>

      <div className="cards-list">
        {cards.length === 0 ? (
          <div className="empty-state">
            No flashcards in this folder. Add some to get started!
          </div>
        ) : (
          cards.map(card => (
            <div key={card.id} className={`card-item ${card.checked ? 'selected' : ''}`}>
              <div className="card-left">
                <input 
                  type="checkbox" 
                  checked={card.checked}
                  onChange={() => handleCheckboxChange(card.id)}
                />
                <div className="card-info">
                  <div className="card-text">{card.text}</div>
                  <div className="card-date">{card.date}</div>
                </div>
              </div>
              <div className="card-right">
                <button className="edit-btn" onClick={() => handleEdit(card.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteCard(card.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="folder-actions">
        <button className="back-btn" onClick={handleBack}>Back</button>
        <button className="study-btn" onClick={handleStudyFolder}>Study</button>
        <button className="add-btn" onClick={handleAddFlashcard}>+ Add Flashcard</button>
      </div>

      <CreateFlashcardModal
        isOpen={showCreateFlashcardModal}
        onClose={() => setShowCreateFlashcardModal(false)}
        onSave={handleSaveFlashcard}
      />
    </div>
  );
}

export default FolderView;