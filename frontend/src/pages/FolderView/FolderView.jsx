import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./FolderView.css";

const FolderView = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const folder = searchParams.get("folder");

  const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);

  const flashcards = {
    french: [
      { id: 1, q: "Bonjour", a: "Hello" },
      { id: 2, q: "Merci", a: "Thank you" }
    ],
    math: [
      { id: 1, q: "2 + 2", a: "4" },
      { id: 2, q: "5 × 3", a: "15" }
    ]
  };

  return (
    <div className="folder-view">
      <header className="header">
        <h1>FLASH MIND</h1>
      </header>

      <div className="folder-content">
        <h2>Folders</h2>

        <div className="folders">
          <button onClick={() => navigate("/folder-view?folder=french")}>
            📁 French
          </button>
          <button onClick={() => navigate("/folder-view?folder=math")}>
            📁 Math
          </button>
        </div>

        <div className="flashcards-section">
          <h3>
            {folder ? `Flashcards in "${folder}"` : "Select a folder"}
          </h3>

          {folder && (
            <div className="flashcards">
              {flashcards[folder]?.map((c) => (
                <div key={c.id} className="card">
                  <strong>{c.q}</strong>
                  <p>{c.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="actions">
          <button
            disabled={!folder}
            className={!folder ? "disabled" : ""}
            onClick={() => setIsFlashcardModalOpen(true)}
          >
            + Add Flashcard
          </button>

          <button onClick={() => navigate("/study-question")}>
            ▶ Start Study
          </button>
        </div>

        {isFlashcardModalOpen && (
          <div className="modal">
            <div className="modal-box">
              <h3>Create Flashcard</h3>
              <input placeholder="Question" />
              <input placeholder="Answer" />
              <button onClick={() => setIsFlashcardModalOpen(false)}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderView;
