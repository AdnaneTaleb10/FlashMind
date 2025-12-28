import { useState } from 'react';
import { Folder, CreditCard, ArrowLeft } from 'lucide-react';
import './FolderView.css';

const FolderView = ({ onNavigate, onOpenModal }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  
  const folders = [
    { id: 1, name: 'French', cards: [
      { id: 1, date: '2025/11/24' },
      { id: 2, date: '2025/11/24' },
      { id: 3, date: '2025/11/24' },
      { id: 4, date: '2025/11/24' }
    ]},
    { id: 2, name: 'Computer Science', cards: [
      { id: 1, date: '2025/11/24' },
      { id: 2, date: '2025/11/24' }
    ]}
  ];

  const handleAddFlashcard = () => {
    if (!selectedFolder) {
      alert('Please select a folder first');
      return;
    }
    onOpenModal('createFlashcard');
  };

  const currentFolder = selectedFolder || folders[0];

  return (
    <div className="folder-view-container">
      <div className="folder-selector">
        <label className="folder-selector-label">Select Folder:</label>
        <select 
          className="folder-select"
          value={selectedFolder?.id || ''}
          onChange={(e) => {
            const folder = folders.find(f => f.id === parseInt(e.target.value));
            setSelectedFolder(folder);
          }}
        >
          <option value="">Choose a folder...</option>
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>{folder.name}</option>
          ))}
        </select>
      </div>

      <div className="folder-view-card">
        <div className="folder-view-header">
          <Folder size={24} color="#3b82f6" />
          <h3 className="folder-view-title">{currentFolder.name}</h3>
        </div>

        {currentFolder.cards.map((card, index) => (
          <div key={card.id} className={`card-item ${index === currentFolder.cards.length - 1 ? 'no-border' : ''}`}>
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

        <div className="folder-view-footer">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="btn btn-secondary">
            <ArrowLeft size={16} />
            Back
          </button>
          
          <button 
            onClick={handleAddFlashcard}
            className={`btn btn-primary ${!selectedFolder ? 'btn-disabled' : ''}`}>
            + Add Flashcard
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderView;