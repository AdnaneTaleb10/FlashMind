import React, { useState } from 'react';
import './FilterHistoryModal.css';

const FilterHistoryModal = ({ isOpen, onClose, onApplyFilter, folders = [] }) => {
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [percentageRange, setPercentageRange] = useState({ min: 0, max: 100 });

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilter({
      folder: selectedFolder,
      minPercentage: percentageRange.min,
      maxPercentage: percentageRange.max
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedFolder('all');
    setPercentageRange({ min: 0, max: 100 });
  };

  const handleCancel = () => {
    onClose();
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), percentageRange.max);
    setPercentageRange(prev => ({ ...prev, min: value }));
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), percentageRange.min);
    setPercentageRange(prev => ({ ...prev, max: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container filter-modal">
        <div className="modal-header">
          <h2>Filter Study History</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="filter-section">
            <h3 className="filter-title">By Folder</h3>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="folder"
                  value="all"
                  checked={selectedFolder === 'all'}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                />
                <span className="radio-label">All Folders</span>
              </label>
              
              {folders.map(folder => (
                <label key={folder.id} className="radio-option">
                  <input
                    type="radio"
                    name="folder"
                    value={folder.id}
                    checked={selectedFolder === folder.id}
                    onChange={(e) => setSelectedFolder(e.target.value)}
                  />
                  <span className="radio-label">{folder.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="filter-section">
            <h3 className="filter-title">By Percentage</h3>
            <div className="slider-group">
              <div className="slider-control">
                <label>Min: {percentageRange.min}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={percentageRange.min}
                  onChange={handleMinChange}
                  className="slider"
                />
              </div>
              
              <div className="slider-control">
                <label>Max: {percentageRange.max}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={percentageRange.max}
                  onChange={handleMaxChange}
                  className="slider"
                />
              </div>
              
              <div className="percentage-display">
                <span>Range: {percentageRange.min}% - {percentageRange.max}%</span>
              </div>
            </div>
          </div>
          
          <div className="modal-actions">
            <button 
              type="button" 
              className="btn-reset"
              onClick={handleReset}
            >
              Reset
            </button>
            <div className="action-group">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-primary"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterHistoryModal;