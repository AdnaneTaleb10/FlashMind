import { useState } from 'react';
import { User } from 'lucide-react';
import Dashboard from './pages/Dashboard/Dashboard';
import FolderView from './pages/FolderView/FolderView';
import StudyQuestion from './pages/StudyQuestion/StudyQuestion';
import StudyAnswer from './pages/StudyAnswer/StudyAnswer';
import StudyHistory from './pages/StudyHistory/StudyHistory';
import SessionResults from './pages/SessionResults/SessionResults';
import CreateFolderModal from './components/Modal/CreateFolderModal/CreateFolderModal';
import CreateFlashcardModal from './components/Modal/CreateFlashcardModal/CreateFlashcardModal';
import FilterHistoryModal from './components/Modal/FilterHistoryModal/FilterHistoryModal';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentModal, setCurrentModal] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleNavigate = (page, folder = null) => {
    setCurrentPage(page);
    if (folder) setSelectedFolder(folder);
  };

  const handleOpenModal = (modal) => {
    setCurrentModal(modal);
  };

  const handleCloseModal = () => {
    setCurrentModal(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} onOpenModal={handleOpenModal} />;
      case 'folderView':
        return <FolderView onNavigate={handleNavigate} onOpenModal={handleOpenModal} />;
      case 'studyQuestion':
        return <StudyQuestion onNavigate={handleNavigate} folder={selectedFolder} />;
      case 'studyAnswer':
        return <StudyAnswer onNavigate={handleNavigate} folder={selectedFolder} />;
      case 'studyHistory':
  return <StudyHistory onNavigate={handleNavigate} onOpenModal={handleOpenModal} />;
      case 'sessionResults':
        return <SessionResults onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} onOpenModal={handleOpenModal} />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">FLASH MIND</h1>
        <div className="user-icon">
          <User size={22} color="white" />
        </div>
      </header>

      <main className="app-main">
        {renderPage()}
      </main>

      {currentModal === 'createFolder' && <CreateFolderModal onClose={handleCloseModal} />}
      {currentModal === 'createFlashcard' && <CreateFlashcardModal onClose={handleCloseModal} />}
      {currentModal === 'filterHistory' && <FilterHistoryModal onClose={handleCloseModal} />}
    </div>
  );
};

export default App;