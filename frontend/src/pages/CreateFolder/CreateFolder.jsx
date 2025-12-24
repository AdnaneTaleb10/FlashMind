import { useState } from 'react';
import './CreateFolder.css';

function CreateFolder() {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!folderName.trim()) {
      setError('Folder name is required');
      return;
    }
    console.log('Creating folder:', folderName);
    // Ici vous ajouterez l'appel API
  };

  const handleCancel = () => {
    console.log('Cancelled');
    // Ici vous naviguerez vers le dashboard
  };

  return (
    <div className="create-folder-container">
      <div className="modal">
        <h2>Create New Folder</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="folderName">Folder Name:</label>
            <input
              type="text"
              id="folderName"
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                if (error) setError('');
              }}
              placeholder="folder's name"
            />
            {error && <div className="error">{error}</div>}
          </div>

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateFolder;