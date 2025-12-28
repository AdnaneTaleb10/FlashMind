import './StudyHistory.css';

const StudyHistory = ({ onOpenModal }) => {
  const studySessions = [
    { subject: 'French', percentage: 85, time: '1 hour ago', color: '#22c55e' },
    { subject: 'Math', percentage: 65, time: '3 hours ago', color: '#eab308' },
    { subject: 'Computer Science', percentage: 45, time: '18 hours ago', color: '#ef4444' }
  ];

  return (
    <div className="history-container">
      <div className="history-card">
        <h3 className="history-title">Study History</h3>

        <div className="history-table-header">
          <span className="header-folder">Folder's name</span>
          <span className="header-percentage">Percentage</span>
          <span className="header-revision">Last revision</span>
        </div>

        {studySessions.map((session, index) => (
          <div key={index} className={`history-item ${index === studySessions.length - 1 ? 'no-border' : ''}`}>
            <div className="history-folder">
              <div className="history-dot" style={{ background: session.color }}></div>
              <span className="history-subject">{session.subject}</span>
            </div>
            
            <span className="history-percentage">{session.percentage}%</span>
            
            <span className="history-time">{session.time}</span>
          </div>
        ))}

        <div className="history-footer">
          <button 
            onClick={() => onOpenModal('filterHistory')}
            className="btn btn-primary">
            Filter History
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyHistory;