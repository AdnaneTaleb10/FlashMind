import { CreditCard, Folder } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ onNavigate, onOpenModal }) => {
  const folders = [
    { id: 1, name: 'Computer Science', cards: 12 },
    { id: 2, name: 'Math', cards: 15 }
  ];

  const studySessions = [
    { subject: 'French', percentage: 85, time: '1 hour ago', color: '#22c55e' },
    { subject: 'Math', percentage: 65, time: '3 hours ago', color: '#eab308' },
    { subject: 'Computer Science', percentage: 45, time: '18 hours ago', color: '#ef4444' }
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Your Space</h2>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-header">
            <CreditCard size={20} color="#3b82f6" />
            <span className="stat-number">42</span>
          </div>
          <div className="stat-label">Flashcards</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <Folder size={20} color="#3b82f6" />
            <span className="stat-number">6</span>
          </div>
          <div className="stat-label">Folders</div>
        </div>
      </div>

      <div className="section-card">
        <h3 className="section-title">Your Folders</h3>

        {folders.map((folder, index) => (
          <div key={folder.id} className={`folder-item ${index === folders.length - 1 ? 'no-border' : ''}`}>
            <div className="folder-info">
              <Folder size={20} color="#6b7280" />
              <span className="folder-name">{folder.name}</span>
            </div>
            
            <div className="folder-actions">
              <span className="folder-cards">{folder.cards} Cards</span>
              
              <button 
                onClick={() => onNavigate('studyQuestion', folder)}
                className="btn btn-primary">
                study
              </button>
              
              <button className="btn btn-primary">Edit</button>
              
              <button className="btn btn-primary">Delete</button>
            </div>
          </div>
        ))}

        <div className="section-footer">
          <button 
            onClick={() => onNavigate('folderView')}
            className="btn btn-primary">
            Show Folders
          </button>
          
          <button 
            onClick={() => onOpenModal('createFolder')}
            className="btn btn-primary">
            Create Folder
          </button>
        </div>
      </div>

      <div className="section-card">
        <h3 className="section-title">Recent Study Sessions</h3>

        {studySessions.map((session, index) => (
          <div key={index} className={`session-item ${index === studySessions.length - 1 ? 'no-border' : ''}`}>
            <div className="session-info">
              <div className="session-dot" style={{ background: session.color }}></div>
              <span className="session-subject">{session.subject}</span>
            </div>
            
            <span className="session-percentage">{session.percentage}%</span>
            
            <span className="session-time">{session.time}</span>
          </div>
        ))}

        <div className="section-footer-center">
          <button 
            onClick={() => onNavigate('studyHistory')}
            className="btn btn-primary">
            Show History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;