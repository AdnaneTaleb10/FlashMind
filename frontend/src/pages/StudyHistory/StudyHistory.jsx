import { useMemo } from 'react';
import { X } from 'lucide-react';
import './StudyHistory.css';

const StudyHistory = ({ sessions, onNavigate, onOpenModal, filterType}) => {
  const sortedSessions = useMemo(() => {
    let sorted = [...sessions];
    if (filterType === 'percentage') {
      sorted.sort((a, b) => b.percentage - a.percentage);
    } else if (filterType === 'folder') {
      sorted.sort((a, b) => a.folderName.localeCompare(b.folderName));
    } else {
      sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    return sorted;
  }, [sessions, filterType]);

  return (
    <div className="history-container">
      <div className="history-card">
        <button onClick={() => onNavigate('dashboard')} className="close-button">
          <X size={24} color="#1f2937" />
        </button>

        <h3 className="history-title">Study History</h3>

        <div className="history-table-header">
          <span className="header-folder">Folder's name</span>
          <span className="header-percentage">Percentage</span>
          <span className="header-revision">Last revision</span>
        </div>

        {sortedSessions.length === 0 ? (
          <div className="empty-state">
            No study sessions yet. Complete a study session to see your history!
          </div>
        ) : (
          sortedSessions.map((session, index) => (
            <div key={index} className={`history-item ${index === sortedSessions.length - 1 ? 'no-border' : ''}`}>
              <div className="history-folder">
                <div 
                  className="history-dot" 
                  style={{ 
                    background: session.percentage >= 80 ? '#22c55e' : session.percentage >= 60 ? '#eab308' : '#ef4444' 
                  }}>
                </div>
                <span className="history-subject">{session.folderName}</span>
              </div>
              
              <span className="history-percentage">{session.percentage}%</span>
              
              <span className="history-time">{session.timeAgo}</span>
            </div>
          ))
        )}

        <div className="history-footer">
          <button onClick={() => onOpenModal('filterHistory')} className="btn btn-primary">
            Filter History
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyHistory;