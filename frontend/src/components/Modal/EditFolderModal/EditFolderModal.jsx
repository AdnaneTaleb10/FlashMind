
import { useState } from 'react';
import { X } from 'lucide-react';
import './EditFolderModal.css';

const EditFolderModal = ({ folder, onSave, onClose }) => {
  const [name, setName] = useState(folder.name);

  const handleSave = () => {
    if (name.trim()) {
      onSave({ ...folder, name: name.trim() });
      onClose();
    }
  };

  const isValid = name.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">
          <X size={20} color="#1f2937" />
        </button>

        <h3 className="modal-title">Edit Folder</h3>

        <div className="modal-form">
          <label className="modal-label">Folder Name :</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="folder's name"
            className="modal-input"
            autoFocus
          />
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="btn btn-cancel">
            Cancel
          </button>
          
          <button 
            onClick={handleSave}
            disabled={!isValid}
            className={`btn btn-primary ${!isValid ? 'btn-disabled' : ''}`}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFolderModal;