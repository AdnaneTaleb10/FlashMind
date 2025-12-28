import { Folder, CreditCard } from 'lucide-react';
import './FolderDetails.css';

const FolderDetails = ({ onNavigate, onOpenModal, folder }) => {
  const cards = [
    { id: 1, date: '2025/11/24' },
    { id: 2, date: '2025/11/24' },
    { id: 3, date: '2025/11/24' },
    { id: 4, date: '2025/11/24' }
  ];

  return (
    <div className="folder-details-container">
      <div className="folder-details-card">
        <div className="folder-details-header">
          <Folder size={24} color="#1f2937" />
          <h3 className="folder-details-title">{folder?.name || 'French'}</h3>
        </div>

        <div className="cards-list">
          {cards.map((card, index) => (
            <div key={card.id} className={`card-item ${index === cards.length - 1 ? 'no-border' : ''}`}>
              <div className="card-info">
                <CreditCard size={18} color="#6b7280" />
                <span className="card-name">Card {card.id}</span>
              </div>
              
              <div className="card-actions">
                <span className="card-date">{card.date}</span>
                
                <button className="btn btn-primary">Edit</button>
                
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="folder-details-footer">
          <button 
            onClick={() => onNavigate('folderView')}
            className="btn btn-secondary">
            ← Back
          </button>
          
          <button 
            onClick={() => onOpenModal('createFlashcard')}
            className="btn btn-primary">
            + Add Flashcard
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderDetails;
