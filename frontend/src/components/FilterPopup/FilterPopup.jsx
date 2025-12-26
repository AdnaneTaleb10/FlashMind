import React from 'react';
import './FilterPopup.css';

function FilterPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="filter-popup-overlay" onClick={onClose}>
      <div className="filter-popup-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Titre avec croix à droite */}
        <div className="popup-header">
          <div className="title-container">
            <h2 className="popup-main-title">Filter Study History</h2>
          </div>
          <button className="close-x-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Container principal */}
        <div className="filter-content">
          {/* Premier bouton */}
          <button className="filter-option-btn filter-by-date">
            Filter By Date
          </button>
          
          {/* Texte "Filter By:" aligné à gauche maximum */}
          <div className="filter-by-text">
            Filter By:
          </div>
          
          {/* Deuxième bouton */}
          <button className="filter-option-btn filter-by-percentage">
            Filter By Percentage
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;