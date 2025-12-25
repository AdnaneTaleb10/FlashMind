import './CreateFolderModal.css';

function CreateFolderModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const folderName = formData.get('folderName');
    
    if (folderName && folderName.trim()) {
      onCreate(folderName.trim());
      e.target.reset();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Folder</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Folder Name :</label>
            <input 
              type="text" 
              name="folderName"
              placeholder="folder's name"
              required
              autoFocus
            />
          </div>
          
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
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

export default CreateFolderModal;