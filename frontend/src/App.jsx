import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateFlashcard from "./pages/CreateFlashcard";
import CreateFolder from "./pages/CreateFolder";
import StudyQuestion from "./pages/StudyQuestion";
import StudyAnswer from "./pages/StudyAnswer";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Route par défaut */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Pages de création */}
          <Route path="/create-flashcard" element={<CreateFlashcard />} />
          <Route path="/create-folder" element={<CreateFolder />} />
          
          {/* Pages d'étude */}
          <Route path="/study-question" element={<StudyQuestion />} />
          <Route path="/study-answer" element={<StudyAnswer />} />
          
          {/* Route 404 */}
          <Route path="*" element={<div className="not-found">Page non trouvée</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;