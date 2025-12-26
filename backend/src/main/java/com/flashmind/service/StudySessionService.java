package com.flashmind.service;

import com.flashmind.dao.FlashCardDao;
import com.flashmind.dao.FolderDao;
import com.flashmind.dao.StudySessionDao;
import com.flashmind.dao.StudySessionDetailDao;
import com.flashmind.model.FlashCard;
import com.flashmind.model.StudySession;
import com.flashmind.model.StudySessionDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StudySessionService {

    @Autowired
    private StudySessionDao studySessionDao;

    @Autowired
    private StudySessionDetailDao studySessionDetailDao;

    @Autowired
    private FolderDao folderDao;

    @Autowired
    private FlashCardDao flashCardDao;

    // Start a new study session
    public Map<String, Object> startStudySession(Integer userId, Integer folderId) {
        // Validate folder exists
        if (!folderDao.findById(folderId).isPresent()) {
            throw new IllegalArgumentException("Folder not found with id: " + folderId);
        }

        // Get all flashcards in the folder
        List<FlashCard> cards = flashCardDao.findByFolderId(folderId);

        if (cards.isEmpty()) {
            throw new IllegalArgumentException("This folder has no flashcards to study");
        }

        // Create study session
        StudySession session = new StudySession();
        session.setUserId(userId);
        session.setFolderId(folderId);

        StudySession createdSession = studySessionDao.createStudySession(session);

        // Prepare response
        Map<String, Object> response = new HashMap<>();
        response.put("sessionId", createdSession.getId());
        response.put("cards", cards);
        response.put("totalCards", cards.size());

        return response;
    }

    // End study session and save score
    public Map<String, Object> endStudySession(Integer sessionId, Integer score) {
        // Validate session exists
        StudySession session = studySessionDao.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Study session not found with id: " + sessionId));

        // Get total cards in session
        int totalCards = flashCardDao.countByFolderId(session.getFolderId());

        // Prepare response
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Session saved successfully");
        response.put("sessionId", sessionId);
        response.put("score", score);
        response.put("totalCards", totalCards);

        return response;
    }

    // Get study session by ID
    public StudySession getStudySessionById(Integer id) {
        return studySessionDao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Study session not found with id: " + id));
    }

    // Get all study sessions for a user
    public List<StudySession> getUserStudySessions(Integer userId) {
        return studySessionDao.findByUserId(userId);
    }

    // Get study session details
    public List<StudySessionDetail> getSessionDetails(Integer sessionId) {
        return studySessionDetailDao.findBySessionId(sessionId);
    }

    // Record answer for a flashcard
    public StudySessionDetail recordAnswer(Integer sessionId, Integer flashcardId, Boolean isCorrect) {
        // Validate session exists
        if (!studySessionDao.findById(sessionId).isPresent()) {
            throw new IllegalArgumentException("Study session not found with id: " + sessionId);
        }

        // Validate flashcard exists
        if (!flashCardDao.findById(flashcardId).isPresent()) {
            throw new IllegalArgumentException("Flashcard not found with id: " + flashcardId);
        }

        // Create detail
        StudySessionDetail detail = new StudySessionDetail();
        detail.setSessionId(sessionId);
        detail.setFlashcardId(flashcardId);
        detail.setIsCorrect(isCorrect);

        return studySessionDetailDao.createDetail(detail);
    }

    // Get session score
    public Map<String, Object> getSessionScore(Integer sessionId) {
        int correctAnswers = studySessionDetailDao.countCorrectBySessionId(sessionId);
        int totalAnswers = studySessionDetailDao.countBySessionId(sessionId);

        Map<String, Object> score = new HashMap<>();
        score.put("sessionId", sessionId);
        score.put("correctAnswers", correctAnswers);
        score.put("totalAnswers", totalAnswers);
        score.put("percentage", totalAnswers > 0 ? (correctAnswers * 100.0 / totalAnswers) : 0);

        return score;
    }
}