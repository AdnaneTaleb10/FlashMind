import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudyHistory.css';
import FilterPopup from '../../components/FilterPopup/FilterPopup'; 

function StudyHistory() {
  const navigate = useNavigate(); // navigation vers UserInfo
  const historyData = [
    { folder: 'French', percentage: '85%', lastRevision: '1 hour ago' },
    { folder: 'Math', percentage: '65%', lastRevision: '3 hours ago' },
    { folder: 'Computer Science', percentage: '45%', lastRevision: '18 hours ago' },
  ];

  // État du pop-up
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  // Ouvrir le pop-up
  const openFilterPopup = () => setShowFilterPopup(true);

  // Fermer le pop-up
  const closeFilterPopup = () => setShowFilterPopup(false);

  // Appliquer le filtre
  const handleApplyFilter = () => {
    console.log('Filtre appliqué !');
  };

  return (
    <div className="study-history-container">
      {/* Header bleu */}
      <div className="blue-header">
        <h1 className="flash-mind-title">FLASH MIND</h1>

        {/* Logo blanc → ouvre UserInfo */}
        <span
          className="white-icon"
          onClick={() => navigate('/userinfo')}
          style={{ cursor: 'pointer' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="28" height="28">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
          </svg>
        </span>
      </div>

      {/* Contenu principal */}
      <div className="content-wrapper-history">
        <div className="history-card">
          <h2 className="history-title">Study History</h2>

          {/* En-têtes */}
          <div className="table-header">
            <div className="header-cell folder-cell">Folder's Name</div>
            <div className="header-cell percentage-cell">Percentage</div>
            <div className="header-cell revision-cell">Last Revision</div>
          </div>

          {/* Lignes du tableau */}
          <div className="history-table">
            {historyData.map((item, index) => (
              <div className="table-row" key={index}>
                <div className="data-cell folder-cell">{item.folder}</div>
                <div className="data-cell percentage-cell">{item.percentage}</div>
                <div className="data-cell revision-cell">{item.lastRevision}</div>
              </div>
            ))}
          </div>

          {/* Bouton Filter History */}
          <div className="filter-button-container">
            <button className="filter-history-btn" onClick={openFilterPopup}>
              Filter History
            </button>
          </div>
        </div>
      </div>

      {/* Pop-up de filtrage */}
      <FilterPopup
        isOpen={showFilterPopup}
        onClose={closeFilterPopup}
        onApply={handleApplyFilter}
      />
    </div>
  );
}

export default StudyHistory;
