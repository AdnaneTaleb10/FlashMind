// src/routers/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudyQuestion from "../pages/StudyQuestion/StudyQuestion";
import StudyAnswer from "../pages/StudyAnswer/StudyAnswer";
import FolderView from "../pages/FolderView/FolderView";
import StudyHistory from "../pages/StudyHistory/StudyHistory";
import SessionResults from "../pages/SessionResults/SessionResults";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/study-question" element={<StudyQuestion />} />
        <Route path="/study-answer" element={<StudyAnswer />} />
        <Route path="/folder-view" element={<FolderView />} />
        <Route path="/study-history" element={<StudyHistory />} />
        <Route path="/session-results" element={<SessionResults />} />
      </Routes>
    </BrowserRouter>
  );
}