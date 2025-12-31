import { Folder } from 'lucide-react';
import './FolderView.css';

const FolderView = ({ folders, onNavigate, onEdit, onDelete, onStartStudy }) => {
  return (
    <div className="folder-view-container">
      <div className="folder-view-card">
        <div className="folder-view-header">
          <Folder size={24} color="#1f2937" />
          <h3 className="folder-view-title">Your Folders</h3>
        </div>

        {folders.length === 0 ? (
          <div className="empty-state">
            No folders yet. Create one to get started!
          </div>
        ) : (
          <div className="folders-list">
            {folders.map((folder, index) => (
              <div key={folder.id} className={`folder-row ${index === folders.length - 1 ? 'no-border' : ''}`}>
                <div 
                  className="folder-info-clickable"
                  onClick={() => onNavigate('folderDetails', folder)}
                >
                  <Folder size={20} color="#6b7280" />
                  <span className="folder-name">{folder.name}</span>
                </div>
                
                <div className="folder-actions">
                  <span className="folder-date">{folder.date}</span>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartStudy(folder);
                    }}
                    disabled={folder.cards.length === 0}
                    className={`btn btn-primary ${folder.cards.length === 0 ? 'btn-disabled' : ''}`}>
                    Study
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(folder);
                    }}
                    className="btn btn-primary">
                    Edit
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(folder);
                    }}
                    className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="folder-view-footer">
          <button onClick={() => onNavigate('dashboard')} className="btn btn-secondary">
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderView;