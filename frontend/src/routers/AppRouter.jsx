import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import StudyQuestion from '../pages/StudyQuestion/StudyQuestion';
import StudyAnswer from '../pages/StudyAnswer/StudyAnswer';
import FolderView from '../pages/FolderView/FolderView';
import StudyHistory from '../pages/StudyHistory/StudyHistory';
import SessionResults from '../pages/SessionResults/SessionResults';

function AppRouter() {
  return (
    <Routes>
      {/* Redirection vers Dashboard par défaut */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Routes principales */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/study-question" element={<StudyQuestion />} />
      <Route path="/study-answer" element={<StudyAnswer />} />
      <Route path="/folder-view" element={<FolderView />} />
      <Route path="/study-history" element={<StudyHistory />} />
      <Route path="/session-results" element={<SessionResults />} />
      
      {/* Route 404 - Page non trouvée */}
      <Route path="*" element={
        <div style={styles.notFoundPage}>
          <div style={styles.notFoundContent}>
            <h1 style={styles.notFoundTitle}>404</h1>
            <p style={styles.notFoundText}>Page not found</p>
            <a href="/dashboard" style={styles.backButton}>
              Back to Dashboard
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
}

// Styles inline pour la page 404
const styles = {
  notFoundPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  notFoundContent: {
    background: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  notFoundTitle: {
    fontSize: '5rem',
    color: '#e74c3c',
    marginBottom: '10px',
    lineHeight: '1',
  },
  notFoundText: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '30px',
  },
  backButton: {
    display: 'inline-block',
    backgroundColor: '#4a90e2',
    color: 'white',
    padding: '12px 30px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  }
};

export default AppRouter;