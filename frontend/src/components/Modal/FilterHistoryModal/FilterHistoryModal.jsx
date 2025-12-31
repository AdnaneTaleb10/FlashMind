import { X } from 'lucide-react';
import './FilterHistoryModal.css';

const FilterHistoryModal = ({ onClose, filterType, setFilterType }) => {
  const handleFilterChange = (type) => {
    setFilterType(type);
    // Fermer automatiquement le modal après sélection
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">
          <X size={20} color="#1f2937" />
        </button>

        <h3 className="modal-title">Filter Study History</h3>

        <div className="filter-section">
          <label className="filter-label">Filter By :</label>
          
          <button 
            onClick={() => handleFilterChange('folder')}
            className={`filter-btn ${filterType === 'folder' ? 'filter-btn-active' : ''}`}>
            By Folder Name (A-Z)
          </button>
          
          <button 
            onClick={() => handleFilterChange('percentage')}
            className={`filter-btn ${filterType === 'percentage' ? 'filter-btn-active' : ''}`}>
            By Percentage (High to Low)
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterHistoryModal;