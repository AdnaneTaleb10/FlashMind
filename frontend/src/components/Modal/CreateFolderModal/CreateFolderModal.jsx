import { useState } from 'react';
import { X } from 'lucide-react';
import './CreateFolderModal.css';

const CreateFolderModal = ({ onClose, onCreate }) => {
  const [folderName, setFolderName] = useState('');

  const handleCreate = () => {
    if (folderName.trim()) {
      onCreate(folderName.trim());
      onClose();
    }
  };

  const isValid = folderName.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">
          <X size={20} color="#1f2937" />
        </button>

        <h3 className="modal-title">Create New Folder</h3>

        <div className="modal-form">
          <label className="modal-label">Folder Name :</label>
          <input 
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="folder's name"
            className="modal-input"
            onKeyPress={(e) => e.key === 'Enter' && isValid && handleCreate()}
            autoFocus
          />
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn btn-cancel">
            Cancel
          </button>
          
          <button 
            onClick={handleCreate}
            disabled={!isValid}
            className={`btn btn-primary ${!isValid ? 'btn-disabled' : ''}`}>
            Create Folder
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;