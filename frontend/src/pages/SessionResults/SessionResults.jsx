import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SessionResults.css";

const SessionResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { correct = 0, wrong = 0 } = location.state || {};
  const total = correct + wrong;
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);

  return (
    <div className="session-results">
      <header className="app-header">
        <h1>FLASH MIND</h1>
      </header>

      <main className="results-content">
        <h2>Session Completed</h2>

        <div className="stats">
          <div>Score: {score}%</div>
          <div>Correct: {correct}</div>
          <div>Wrong: {wrong}</div>
        </div>

        <div className="actions">
          <button onClick={() => navigate("/study-question")}>
            New Session
          </button>
          <button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default SessionResults;
