import { useState } from 'react';
import { X } from 'lucide-react';
import './CreateFolderModal.css';

const CreateFolderModal = ({ onClose }) => {
  const [folderName, setFolderName] = useState('');

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
          />
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn btn-cancel">
            Cancel
          </button>
          
          <button className="btn btn-primary">
            Create FlashCard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;