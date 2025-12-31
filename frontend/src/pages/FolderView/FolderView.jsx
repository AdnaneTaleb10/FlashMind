import { Folder, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './FolderView.css';

const FolderView = () => {
  const navigate = useNavigate();
  const {
    folders,
    setEditingFolder,
    setCurrentModal,
    setConfirmAction,
    deleteFolder,
    startStudySession,
  } = useApp();

  const handleEdit = (folder) => {
    setEditingFolder(folder);
    setCurrentModal('editFolder');
  };

  const handleDelete = (folder) => {
    setConfirmAction({
      message: `Are you sure you want to delete "${folder.name}"? This will also delete all flashcards in this folder and related study history.`,
      onConfirm: () => {
        deleteFolder(folder);
        setCurrentModal(null);
      }
    });
    setCurrentModal('confirm');
  };

  const handleStartStudy = (folder) => {
    startStudySession(folder);
    navigate('/app/study/question');
  };

  return (
      <div className="folder-view-container">
        <div className="folder-view-header">
          <h2 className="folder-view-title">All Folders ({folders.length})</h2>

          <button onClick={() => navigate('/app')} className="back-button">
            ← Back
          </button>
        </div>

        {folders.length === 0 ? (
            <div className="empty-state-large">
              <Folder size={64} color="#cbd5e1" />
              <p>No folders yet</p>
              <button onClick={() => setCurrentModal('createFolder')} className="btn btn-primary">
                Create Your First Folder
              </button>
            </div>
        ) : (
            <div className="folders-card">
              <div className="folders-list">
                {folders.map(folder => (
                    <div key={folder.id} className="folder-row">
                      <div
                          className="folder-info-clickable"
                          onClick={() => navigate(`/app/folders/${folder.id}`)}
                      >
                        <Folder size={22} color="#667eea" />
                        <span className="folder-name">{folder.name}</span>
                      </div>

                      <p className="folder-card-info">
                        {folder.cards?.length || 0} flashcards
                      </p>

                      <div className="folder-actions">
                        <button
                            onClick={() => handleStartStudy(folder)}
                            disabled={!folder.cards || folder.cards.length === 0}
                            className="btn btn-primary"
                            style={{
                              opacity: folder.cards?.length > 0 ? 1 : 0.5,
                              cursor: folder.cards?.length > 0 ? 'pointer' : 'not-allowed'
                            }}
                        >
                          Study
                        </button>
                        <button onClick={() => handleEdit(folder)} className="btn btn-secondary">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(folder)} className="btn btn-danger">
                          Delete
                        </button>
                      </div>
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>
  );
};

export default FolderView;