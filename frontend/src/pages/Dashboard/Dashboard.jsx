import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleCreateFolder = () => {
    navigate('/folder-view?mode=create');
  };

  const handleStudy = (subject) => {
    navigate(`/study-question?subject=${subject}`);
  };

  const handleShowHistory = () => {
    navigate('/study-history');
  };

  return (
    <div className="dashboard">
      <h1>FLASH MIND</h1>
      <h2>Your Space</h2>

      <div className="stats">
        <div className="stat-item">
          <div className="stat-number">42</div>
          <div className="stat-label">Flashcards</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">6</div>
          <div className="stat-label">Folders</div>
        </div>
      </div>

      <div className="folders-section">
        <h3>Your Folders</h3>
        <div className="folder-item">
          <div className="folder-left">
            <span className="folder-name">Computer Science</span>
            <span className="card-count">12 Cards</span>
          </div>
          <div className="folder-actions">
            <button onClick={() => handleStudy('Computer Science')}>study</button>
            <button>Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
        <div className="folder-item">
          <div className="folder-left">
            <span className="folder-name">Math</span>
            <span className="card-count">15 Cards</span>
          </div>
          <div className="folder-actions">
            <button onClick={() => handleStudy('Math')}>study</button>
            <button>Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
        <div className="folder-buttons">
          <button>Show Folders</button>
          <button onClick={handleCreateFolder}>Create Folder</button>
        </div>
      </div>

      <div className="sessions-section">
        <h3>Recent Study Sessions</h3>
        <div className="session-item">
          <span className="session-name">French</span>
          <span className="session-percentage">85%</span>
          <span className="session-time">1 hour ago</span>
        </div>
        <div className="session-item">
          <span className="session-name">Math</span>
          <span className="session-percentage">65%</span>
          <span className="session-time">3 hours ago</span>
        </div>
        <div className="session-item">
          <span className="session-name">Computer Science</span>
          <span className="session-percentage">45%</span>
          <span className="session-time">18 hours ago</span>
        </div>
        <button className="show-history-btn" onClick={handleShowHistory}>Show History</button>
      </div>
    </div>
  );
}

export default Dashboard;