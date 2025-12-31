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

  const folder = folders.find(f => f.id === parseInt(folderId));

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
      <div className="folder-details-page">
        <div className="folder-details-card">

          {/* Header */}
          <div className="folder-details-header">
            <div className="folder-details-title">
              <Folder size={22} />
              <h2>{folder.name}</h2>
            </div>
          </div>

          {/* Content */}
          {!folder.cards || folder.cards.length === 0 ? (
              <div className="empty-state">
                <p>No flashcards yet. Click “Add Flashcard” to create your first one.</p>
              </div>
          ) : (
              <div className="cards-list">
                {folder.cards.map((card, index) => (
                    <div key={card.id} className="card-row">
                      <div className="card-name">Card {index + 1}</div>
                      <div className="card-date">{card.date}</div>
                      <div className="card-actions">
                        <button
                            onClick={() => handleEditCard(card)}
                            className="btn btn-edit"
                        >
                          Edit
                        </button>
                        <button
                            onClick={() => handleDeleteCard(card)}
                            className="btn btn-delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                ))}
              </div>
          )}

          {/* Footer */}
          <div className="folder-details-footer">
            <button
                onClick={() => navigate('/app/folders')}
                className="btn btn-outline"
            >
              ← Back
            </button>

            <div className="footer-right">
          <span className="card-count">
            {folder.cards?.length || 0} flashcards
          </span>
              <button
                  onClick={handleCreateCard}
                  className="btn btn-primary"
              >
                <Plus size={16} /> Add Flashcard
              </button>
            </div>
          </div>

        </div>
      </div>
  );

};

export default FolderDetails;