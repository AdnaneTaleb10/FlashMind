import { useParams, useNavigate } from 'react-router-dom';
import { Folder, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './FolderDetails.css';

const FolderDetails = () => {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const {
    folders,
    setSelectedFolder,
    setCurrentModal,
    setEditingCard,
    setConfirmAction,
    deleteCard,
  } = useApp();

  const folder = folders.find(f => f.id === folderId);

  if (!folder) {
    return (
        <div className="folder-details-container">
          <p>Folder not found</p>
          <button onClick={() => navigate('/app/folders')} className="btn btn-primary">
            Back to Folders
          </button>
        </div>
    );
  }

  const handleEditCard = (card) => {
    setEditingCard({ folderId: folder.id, card });
    setCurrentModal('editCard');
  };

  const handleDeleteCard = (card) => {
    setConfirmAction({
      message: 'Are you sure you want to delete this flashcard?',
      onConfirm: () => {
        deleteCard(folder.id, card);
        setCurrentModal(null);
      }
    });
    setCurrentModal('confirm');
  };

  const handleCreateCard = () => {
    setSelectedFolder(folder);
    setCurrentModal('createFlashcard');
  };

  return (
      <div className="folder-details-container">
        <div className="folder-details-header">
          <button onClick={() => navigate('/app/folders')} className="back-button">
            ← Back
          </button>
          <div className="folder-details-title">
            <Folder size={24} color="#667eea" />
            <h2>{folder.name}</h2>
          </div>
        </div>

        <div className="folder-stats">
          <p>{folder.cards?.length || 0} flashcards</p>
          <button onClick={handleCreateCard} className="btn btn-primary">
            <Plus size={16} /> Add Flashcard
          </button>
        </div>

        {!folder.cards || folder.cards.length === 0 ? (
            <div className="empty-state-large">
              <p>No flashcards yet</p>
              <button onClick={handleCreateCard} className="btn btn-primary">
                Create Your First Flashcard
              </button>
            </div>
        ) : (
            <div className="cards-list">
              {folder.cards.map((card, index) => (
                  <div key={card.id} className="card-item">
                    <div className="card-number">#{index + 1}</div>
                    <div className="card-content">
                      <div className="card-question">
                        <strong>Q:</strong> {card.question}
                      </div>
                      <div className="card-answer">
                        <strong>A:</strong> {card.answer}
                      </div>
                    </div>
                    <div className="card-actions">
                      <button onClick={() => handleEditCard(card)} className="btn btn-secondary">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteCard(card)} className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default FolderDetails;