import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterHistoryModal from '../../components/modals/FilterHistoryModal/index.js';
import './StudyHistory.css';

const StudyHistory = () => {
  const navigate = useNavigate();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Données de l'historique
  const studyHistory = [
    { id: 1, folderName: 'French', percentage: 85, lastRevision: '1 hour ago' },
    { id: 2, folderName: 'Math', percentage: 65, lastRevision: '3 hours ago' },
    { id: 3, folderName: 'Computer Science', percentage: 45, lastRevision: '18 hours ago' }
  ];

  const folders = [
    { id: 'french', name: 'French' },
    { id: 'math', name: 'Math' },
    { id: 'cs', name: 'Computer Science' }
  ];

  const handleApplyFilter = (filterOptions) => {
    console.log('Filter applied:', filterOptions);
    // Ici vous pourriez filtrer les données
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 80) return '#27ae60';
    if (percentage >= 60) return '#f39c12';
    return '#e74c3c';
  };

  return (
    <div className="study-history">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>FLASH MIND</h1>
        </div>
      </header>

      <main className="history-content">
        {/* Page Title */}
        <div className="page-title-container">
          <h2 className="page-title">Study History</h2>
        </div>

        {/* History Table */}
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th className="folder-header">Folder's name</th>
                <th className="percentage-header">Percentage</th>
                <th className="revision-header">Last revision</th>
              </tr>
            </thead>
            <tbody>
              {studyHistory.map((item) => (
                <tr key={item.id} className="history-row">
                  <td className="folder-cell">
                    <div className="folder-info">
                      <span className="folder-icon">📁</span>
                      <span className="folder-name">{item.folderName}</span>
                    </div>
                  </td>
                  <td className="percentage-cell">
                    <div 
                      className="percentage-badge"
                      style={{ 
                        backgroundColor: getPercentageColor(item.percentage),
                        color: 'white'
                      }}
                    >
                      {item.percentage}%
                    </div>
                  </td>
                  <td className="revision-cell">
                    <span className="revision-time">{item.lastRevision}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="history-actions">
          <button 
            className="btn filter-btn"
            onClick={() => setIsFilterModalOpen(true)}
          >
            Filter History
          </button>
          
          <button 
            className="btn back-btn"
            onClick={() => navigate('/dashboard')}
          >
            ← Back
          </button>
        </div>
      </main>

      {/* Filter Modal */}
      <FilterHistoryModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilter={handleApplyFilter}
        folders={folders}
      />
    </div>
  );
};

export default StudyHistory;