import './FilterHistoryModal.css';
import { useState } from 'react';

function FilterHistoryModal({ isOpen, onClose, onApplyFilter }) {
  const [folder, setFolder] = useState('all');
  const [minPercentage, setMinPercentage] = useState(0);
  const [maxPercentage, setMaxPercentage] = useState(100);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilter({
      folder,
      minPercentage,
      maxPercentage
    });
  };

  const handleReset = () => {
    setFolder('all');
    setMinPercentage(0);
    setMaxPercentage(100);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Filter Study History</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="filter-section">
            <h3>By Folder</h3>
            <div className="radio-group">
              {['all', 'french', 'math', 'cs'].map((folderType) => (
                <label key={folderType}>
                  <input 
                    type="radio" 
                    name="folder" 
                    value={folderType}
                    checked={folder === folderType}
                    onChange={(e) => setFolder(e.target.value)}
                  />
                  {folderType === 'all' ? 'All Folders' : 
                   folderType === 'cs' ? 'Computer Science' : 
                   folderType.charAt(0).toUpperCase() + folderType.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>By Percentage</h3>
            <div className="percentage-inputs">
              <div className="input-group">
                <label>Min:</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={minPercentage}
                  onChange={(e) => setMinPercentage(parseInt(e.target.value))}
                />
                <span>{minPercentage}%</span>
              </div>
              <div className="input-group">
                <label>Max:</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={maxPercentage}
                  onChange={(e) => setMaxPercentage(parseInt(e.target.value))}
                />
                <span>{maxPercentage}%</span>
              </div>
            </div>
          </div>
          
          <div className="modal-buttons">
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="apply-btn">
              Apply Filter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterHistoryModal;