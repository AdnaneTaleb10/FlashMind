import { Folder } from 'lucide-react';
import './FolderView.css';

const FolderView = ({ onNavigate }) => {
  const folders = [
    { id: 1, name: 'Math', date: '2025/11/24' },
    { id: 2, name: 'History', date: '2025/11/24' },
    { id: 3, name: 'Science', date: '2025/11/24' }
  ];

  const handleFolderClick = (folder) => {
    onNavigate('folderDetails', folder);
  };

  return (
    <div className="folder-view-container">
      <div className="folder-view-card">
        <div className="folder-view-header">
          <Folder size={24} color="#1f2937" />
          <h3 className="folder-view-title">Your Folders</h3>
        </div>

        <div className="folders-list">
          {folders.map((folder, index) => (
            <div 
              key={folder.id} 
              className={`folder-row ${index === folders.length - 1 ? 'no-border' : ''}`}
            >
              <div 
                className="folder-info-clickable"
                onClick={() => handleFolderClick(folder)}
              >
                <Folder size={20} color="#6b7280" />
                <span className="folder-name">{folder.name}</span>
              </div>
              
              <div className="folder-actions">
                <span className="folder-date">{folder.date}</span>
                
                <button className="btn btn-primary">Edit</button>
                
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="folder-view-footer">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="btn btn-secondary">
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderView;