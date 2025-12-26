import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import CreateFolderModal from "../../components/modals/CreateFolderModal/CreateFolderModal";
import CreateFlashcardModal from "../../components/modals/CreateFlashcardModal/CreateFlashcardModal";
import FilterHistoryModal from "../../components/modals/FilterHistoryModal/FilterHistoryModal";

function Dashboard() {
  const navigate = useNavigate();

  const [folders, setFolders] = useState([
    { id: 1, name: "Computer Science", flashcardCount: 12 },
    { id: 2, name: "Math", flashcardCount: 15 }
  ]);

  const [flashcards, setFlashcards] = useState([]);

  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleCreateFolder = (folderName) => {
    const newFolder = {
      id: Date.now(),
      name: folderName,
      flashcardCount: 0
    };
    setFolders([...folders, newFolder]);
  };

  const handleCreateFlashcard = (flashcard) => {
    const newFlashcard = {
      id: Date.now(),
      ...flashcard
    };
    setFlashcards([...flashcards, newFlashcard]);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>FLASH MIND</h1>
        <div className="user-icon">👤</div>
      </header>

      <div className="dashboard-container">
        <h2>Your Space</h2>

        <div className="stats">
          <div className="stat-card">
            {flashcards.length}<br />Flashcards
          </div>
          <div className="stat-card">
            {folders.length}<br />Folders
          </div>
        </div>

        <div className="box">
          <h3>Your Folders</h3>

          {folders.map((f) => (
            <div key={f.id} className="folder-row">
              <span>📁 {f.name}</span>
              <span>{f.flashcardCount} Cards</span>
              <button onClick={() => navigate(`/study-question?subject=${f.name}`)}>study</button>
              <button onClick={() => navigate(`/folder-view?folder=${f.name}`)}>Edit</button>
              <button>Delete</button>
            </div>
          ))}

          <div className="box-actions">
            <button onClick={() => navigate("/folder-view?folder=" + folders[0].name)}>
              Show Folders
            </button>
            <button onClick={() => setIsFolderModalOpen(true)}>
              Create Folder
            </button>
          </div>
        </div>

        <div className="box">
          <h3>Recent Study Sessions</h3>

          <div className="session-row">
            <span className="dot green"></span> French <span>85%</span> <span>1 hour ago</span>
          </div>

          <button onClick={() => setIsFilterModalOpen(true)}>
            Show History
          </button>
        </div>
      </div>

      {/* Modals */}
      <CreateFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onCreateFolder={handleCreateFolder}
      />

      <CreateFlashcardModal
        isOpen={isFlashcardModalOpen}
        onClose={() => setIsFlashcardModalOpen(false)}
        onCreateFlashcard={handleCreateFlashcard}
      />

      <FilterHistoryModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilter={(f) => console.log(f)}
        folders={folders}
      />
    </div>
  );
}

export default Dashboard;
