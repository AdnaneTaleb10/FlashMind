import './StudyHistory.css';
import { useState } from 'react';
import FilterHistoryModal from '../../components/modals/FilterHistoryModal/FilterHistoryModal';

function StudyHistory() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    folder: 'all',
    minPercentage: 0,
    maxPercentage: 100
  });

  const handleApplyFilter = (newFilters) => {
    setActiveFilters(newFilters);
    setShowFilterModal(false);
    
    // Afficher le filtre appliqué
    const folderName = newFilters.folder === 'all' ? 'All Folders' : 
                      newFilters.folder === 'cs' ? 'Computer Science' : 
                      newFilters.folder.charAt(0).toUpperCase() + newFilters.folder.slice(1);
    
    alert(`Filter applied:\n📁 Folder: ${folderName}\n📊 Range: ${newFilters.minPercentage}% - ${newFilters.maxPercentage}%`);
  };

  const handleBack = () => {
    window.history.back(); // Retour à la page précédente
  };

  // Données des sessions d'étude
  const studySessions = [
    { id: 1, folder: 'French', percentage: 85, lastRevision: '1 hour ago' },
    { id: 2, folder: 'Math', percentage: 65, lastRevision: '3 hours ago' },
    { id: 3, folder: 'Computer Science', percentage: 45, lastRevision: '18 hours ago' },
  ];

  // Filtrer les sessions selon les critères actifs
  const filteredSessions = studySessions.filter(session => {
    // Filtre par dossier
    if (activeFilters.folder !== 'all') {
      const sessionFolder = session.folder.toLowerCase().replace(' ', '');
      const filterFolder = activeFilters.folder;
      if (filterFolder === 'cs' && sessionFolder !== 'computerscience') return false;
      if (filterFolder !== 'cs' && sessionFolder !== filterFolder) return false;
    }
    
    // Filtre par pourcentage
    if (session.percentage < activeFilters.minPercentage || session.percentage > activeFilters.maxPercentage) {
      return false;
    }
    
    return true;
  });

  // Calculer les statistiques
  const totalSessions = filteredSessions.length;
  const averagePercentage = filteredSessions.length > 0 
    ? Math.round(filteredSessions.reduce((sum, session) => sum + session.percentage, 0) / filteredSessions.length)
    : 0;

  const handleReviewSession = (folderName) => {
    alert(`Starting review session for "${folderName}"`);
    // Navigation vers StudyQuestion
  };

  const handleViewResults = (folderName) => {
    alert(`Viewing results for "${folderName}"`);
    // Navigation vers SessionResults
  };

  return (
    <div className="study-history">
      <div className="header-section">
        <button className="back-button" onClick={handleBack}>×</button>
        <h1>FLASH MIND</h1>
        <div className="page-title">Study History</div>
      </div>

      {/* Statistiques */}
      <div className="stats-summary">
        <div className="stat-item">
          <span className="stat-label">Total Sessions:</span>
          <span className="stat-value">{totalSessions}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Score:</span>
          <span className="stat-value">{averagePercentage}%</span>
        </div>
        <div className="filter-status">
          <span className="filter-label">Active Filter:</span>
          <span className="filter-value">
            {activeFilters.folder === 'all' ? 'All Folders' : 
             activeFilters.folder === 'cs' ? 'Computer Science' : 
             activeFilters.folder.charAt(0).toUpperCase() + activeFilters.folder.slice(1)}
          </span>
        </div>
      </div>

      <div className="history-table">
        <table>
          <thead>
            <tr>
              <th>Folder's name</th>
              <th>Percentage</th>
              <th>Last revision</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-results">
                  No study sessions found with current filters
                </td>
              </tr>
            ) : (
              filteredSessions.map(session => (
                <tr key={session.id}>
                  <td className="folder-cell">{session.folder}</td>
                  <td className="percentage-cell">
                    <div className="percentage-bar">
                      <div 
                        className="percentage-fill"
                        style={{ width: `${session.percentage}%` }}
                      ></div>
                      <span className="percentage-text">{session.percentage}%</span>
                    </div>
                  </td>
                  <td className="time-cell">{session.lastRevision}</td>
                  <td className="actions-cell">
                    <button 
                      className="review-btn"
                      onClick={() => handleReviewSession(session.folder)}
                    >
                      Review
                    </button>
                    <button 
                      className="results-btn"
                      onClick={() => handleViewResults(session.folder)}
                    >
                      Results
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="actions">
        <button 
          className="filter-button" 
          onClick={() => setShowFilterModal(true)}
        >
          Filter History
        </button>
        <button 
          className="clear-filter-button"
          onClick={() => {
            setActiveFilters({ folder: 'all', minPercentage: 0, maxPercentage: 100 });
            alert('Filters cleared');
          }}
        >
          Clear Filters
        </button>
      </div>

      <FilterHistoryModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilter={handleApplyFilter}
      />
    </div>
  );
}

export default StudyHistory;