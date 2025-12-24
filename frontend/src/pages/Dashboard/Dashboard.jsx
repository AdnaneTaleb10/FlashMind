// Mettez à jour votre Dashboard.jsx pour utiliser des liens
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const flashcards = 42;
  const folders = [
    { name: "Computer Science", cards: 12 },
    { name: "Math", cards: 15 },
  ];

  const sessions = [
    { subject: "French", score: 85, time: "1 hour ago", color: "green" },
    { subject: "Math", score: 65, time: "3 hours ago", color: "yellow" },
    { subject: "Computer Science", score: 45, time: "18 hours ago", color: "red" },
  ];

  return (
    <div className="dashboard">
      {/* Top bar */}
      <header className="top-bar">
        <h1>FLASH MIND</h1>
        <div className="user-icon">👤</div>
      </header>

      <div className="container">
        <h2>Your Space</h2>

        {/* Stats */}
        <div className="stats">
          <div className="stat-card">
            <span>{flashcards}</span>
            <p>Flashcards</p>
          </div>

          <div className="stat-card">
            <span>{folders.length}</span>
            <p>Folders</p>
          </div>
        </div>

        {/* Folders */}
        <div className="box">
          <h3>Your Folders</h3>
          {folders.map((f, i) => (
            <div className="folder-row" key={i}>
              <div>
                📁 {f.name} <span>{f.cards} Cards</span>
              </div>
              <div className="actions">
                <button onClick={() => navigate('/study-question')}>Study</button>
                <button>Edit</button>
                <button className="danger">Delete</button>
              </div>
            </div>
          ))}
          <div className="footer">
            <button>Show Folders</button>
            <button onClick={() => navigate('/create-folder')}>Create Folder</button>
          </div>
        </div>

        {/* History */}
        <div className="box">
          <h3>Recent Study Sessions</h3>
          {sessions.map((s, i) => (
            <div className="session-row" key={i}>
              <span className={`dot ${s.color}`}></span>
              <span>{s.subject}</span>
              <span>{s.score}%</span>
              <span>{s.time}</span>
            </div>
          ))}
          <button className="center">Show History</button>
        </div>
      </div>
    </div>
  );
}