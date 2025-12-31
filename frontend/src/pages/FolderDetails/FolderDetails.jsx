import { Folder, CreditCard } from 'lucide-react';
import './FolderDetails.css';

const FolderDetails = ({ folder, onNavigate, onOpenModal, onEditCard, onDeleteCard }) => {
  return (
    <div className="folder-details-container">
      <div className="folder-details-card">
        <div className="folder-details-header">
          <Folder size={24} color="#1f2937" />
          <h3 className="folder-details-title">{folder?.name || 'Folder'}</h3>
        </div>

        {folder?.cards.length === 0 ? (
          <div className="empty-state">
            No flashcards yet. Add one to get started!
          </div>
        ) : (
          <div className="cards-list">
            {folder?.cards.map((card, index) => (
              <div key={card.id} className={`card-item ${index === folder.cards.length - 1 ? 'no-border' : ''}`}>
                <div className="card-info">
                  <CreditCard size={18} color="#6b7280" />
                  <span className="card-name">Card {index + 1}</span>
                </div>
                
                <div className="card-actions">
                  <span className="card-date">{card.date}</span>
                  
                  <button onClick={() => onEditCard(folder.id, card)} className="btn btn-primary">
                    Edit
                  </button>
                  
                  <button onClick={() => onDeleteCard(folder.id, card)} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="folder-details-footer">
          <button onClick={() => onNavigate('folderView')} className="btn btn-secondary">
            ← Back
          </button>
          
          <button onClick={() => onOpenModal('createFlashcard')} className="btn btn-primary">
            + Add Flashcard
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderDetails;