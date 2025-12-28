import { X } from 'lucide-react';
import './FilterHistoryModal.css';

const FilterHistoryModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="filter-modal-content">
        <button onClick={onClose} className="modal-close">
          <X size={20} color="#1f2937" />
        </button>

        <h3 className="modal-title">Filter Study History</h3>

        <div className="filter-section">
          <label className="filter-label">Filter By :</label>
          
          <button className="filter-btn filter-btn-active">
            By Folder
          </button>
          
          <button className="filter-btn">
            By Percentage
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterHistoryModal;