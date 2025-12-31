import { CreditCard, Folder } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './Dashboard.css';
import { getTimeAgo } from '../../utils/helpers';
import {useState , useEffect} from "react";
import {getDashboardData} from "../../services/dashboardService.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    /*
    folders,
    sessions,
    */
    setCurrentModal,
    startStudySession,
    setEditingFolder,
    setConfirmAction,
    deleteFolder,
  } = useApp();
/*
  const totalCards = folders.reduce((sum, folder) => sum + (folder.cards?.length || 0), 0);
  const totalFolders = folders.length;
*/

  const [folders, setFolders] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    totalCards: 0,
    totalFolders: 0,
    totalSessions: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Get userId from localStorage (assuming you store it after login)
      const userId = localStorage.getItem('userId');

      if (!userId) {
        toast.error('User not found', {
          description: 'Please log in again.'
        });
        return;
      }

      const data = await getDashboardData(userId);

      // Update state with backend data
      setFolders(data.recentFolders || []);
      setSessions(data.recentSessions || []);
      setStats({
        totalCards: data.stats?.totalCards || 0,
        totalFolders: data.stats?.totalFolders || 0,
        totalSessions: data.stats?.totalSessions || 0
      });

    } catch (error) {
      console.error('Dashboard fetch error:', error);
      toast.error('Failed to load dashboard', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const recentSessions = sessions.slice(-3).reverse();
  const displayedFolders = folders.slice(0, 3);


  const handleEditFolder = (folder) => {
    setEditingFolder(folder);
    setCurrentModal('editFolder');
  };

  const handleDeleteFolder = (folder) => {
    setConfirmAction({
      message: `Are you sure you want to delete "${folder.name}"? This will also delete all flashcards in this folder and related study history.`,
      onConfirm: () => {
        deleteFolder(folder);
        setCurrentModal(null);
      }
    });
    setCurrentModal('confirm');
  };

  const handleStartStudy = (folder) => {
    startStudySession(folder);
    navigate('/app/study/question');
  };

  return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">Your Space</h2>

        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-header">
              <CreditCard size={20} color="#3b82f6" />
              <span className="stat-number">{stats.totalCards}</span>
            </div>
            <div className="stat-label">Flashcards</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <Folder size={20} color="#3b82f6" />
              <span className="stat-number">{stats.totalFolders}</span>
            </div>
            <div className="stat-label">Folders</div>
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-title">Your Folders</h3>

          {displayedFolders.length === 0 ? (
              <div className="empty-state">
                No folders yet. Create one to get started!
              </div>
          ) : (
              displayedFolders.map((folder, index) => (
                  <div key={folder.id} className={`folder-item ${index === displayedFolders.length - 1 ? 'no-border' : ''}`}>
                    <div
                        className="folder-info"
                        onClick={() => navigate(`/app/folders/${folder.id}`)}
                        style={{ cursor: 'pointer' }}>
                      <Folder size={20} color="#6b7280" />
                      <span className="folder-name">{folder.name}</span>
                    </div>

                    <div className="folder-actions">
                      <span className="folder-cards">{folder.cards?.length || 0} Cards</span>

                      <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartStudy(folder);
                          }}
                          disabled={!folder.cards || folder.cards.length === 0}
                          className="btn btn-primary"
                          style={{
                            opacity: folder.cards?.length > 0 ? 1 : 0.5,
                            cursor: folder.cards?.length > 0 ? 'pointer' : 'not-allowed'
                          }}>
                        study
                      </button>

                      <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditFolder(folder);
                          }}
                          className="btn btn-primary">
                        Edit
                      </button>

                      <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFolder(folder);
                          }}
                          className="btn btn-primary">
                        Delete
                      </button>
                    </div>
                  </div>
              ))
          )}

          <div className="section-footer">
            <button onClick={() => navigate('/app/folders')} className="btn btn-primary">
              Show Folders
            </button>

            <button onClick={() => setCurrentModal('createFolder')} className="btn btn-primary">
              Create Folder
            </button>
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-title">Recent Study Sessions</h3>

          {recentSessions.length === 0 ? (
              <div className="empty-state">
                No study sessions yet. Start studying to see your progress!
              </div>
          ) : (
              recentSessions.map((session, index) => (
                  <div key={index} className={`session-item ${index === recentSessions.length - 1 ? 'no-border' : ''}`}>
                    <div className="session-info">
                      <div
                          className="session-dot"
                          style={{
                            background: session.percentage >= 80 ? '#22c55e' : session.percentage >= 60 ? '#eab308' : '#ef4444'
                          }}>
                      </div>
                      <span className="session-subject">{session.folderName}</span>
                    </div>

                    <span className="session-percentage">{session.percentage}%</span>

                    <span className="session-time">{getTimeAgo(session.timestamp)}</span>
                  </div>
              ))
          )}

          <div className="section-footer-center">
            <button onClick={() => navigate('/app/history')} className="btn btn-primary">
              Show History
            </button>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;