package com.flashmind.service;

import com.flashmind.dao.FolderDao;
import com.flashmind.dao.StudySessionDao;
import com.flashmind.dao.StudySessionDetailDao;
import com.flashmind.dao.UserDao;
import com.flashmind.model.StudySession;
import com.flashmind.model.StudySessionDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudySessionService {

    @Autowired
    private StudySessionDao studySessionDao;

    @Autowired
    private StudySessionDetailDao studySessionDetailDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private FolderDao folderDao;

    // Create a new study session
    public StudySession createStudySession(StudySession studySession) {
        // Validate user exists
        if (!userDao.findById(studySession.getUserId()).isPresent()) {
            throw new IllegalArgumentException("User not found with id: " + studySession.getUserId());
        }

        // Validate folder exists
        if (!folderDao.findById(studySession.getFolderId()).isPresent()) {
            throw new IllegalArgumentException("Folder not found with id: " + studySession.getFolderId());
        }

        // Create study session
        studySessionDao.createStudySession(studySession);

        return studySession;
    }

    // Get study session by ID
    public StudySession getStudySessionById(Integer id) {
        return studySessionDao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Study session not found with id: " + id));
    }

    // Get all study sessions for a user
    public List<StudySession> getUserStudySessions(Integer userId) {
        // Validate user exists
        if (!userDao.findById(userId).isPresent()) {
            throw new IllegalArgumentException("User not found with id: " + userId);
        }

        return studySessionDao.findByUserId(userId);
    }

    // Get all study sessions for a folder
    public List<StudySession> getFolderStudySessions(Integer folderId) {
        // Validate folder exists
        if (!folderDao.findById(folderId).isPresent()) {
            throw new IllegalArgumentException("Folder not found with id: " + folderId);
        }

        return studySessionDao.findByFolderId(folderId);
    }

    // Get all study sessions
    public List<StudySession> getAllStudySessions() {
        return studySessionDao.findAll();
    }

    // Delete study session
    public void deleteStudySession(Integer sessionId) {
        // Check if session exists
        getStudySessionById(sessionId);

        // Delete all session details first
        studySessionDetailDao.deleteBySessionId(sessionId);

        // Delete the session
        studySessionDao.deleteStudySession(sessionId);
    }

    // Get session count for a user
    public int getUserSessionCount(Integer userId) {
        return studySessionDao.countByUserId(userId);
    }

    // Get session count for a folder
    public int getFolderSessionCount(Integer folderId) {
        return studySessionDao.countByFolderId(folderId);
    }

    // Add a detail to a study session
    public StudySessionDetail addSessionDetail(Integer sessionId, StudySessionDetail detail) {
        // Validate session exists
        getStudySessionById(sessionId);

        detail.setSessionId(sessionId);
        studySessionDetailDao.createDetail(detail);

        return detail;
    }

    // Get all details for a session
    public List<StudySessionDetail> getSessionDetails(Integer sessionId) {
        // Validate session exists
        getStudySessionById(sessionId);

        return studySessionDetailDao.findBySessionId(sessionId);
    }

    // Get session statistics
    public SessionStats getSessionStatistics(Integer sessionId) {
        // Validate session exists
        getStudySessionById(sessionId);

        int totalAnswers = studySessionDetailDao.countBySessionId(sessionId);
        int correctAnswers = studySessionDetailDao.countCorrectBySessionId(sessionId);
        int incorrectAnswers = totalAnswers - correctAnswers;

        double accuracy = totalAnswers > 0 ? (correctAnswers * 100.0 / totalAnswers) : 0;

        return new SessionStats(totalAnswers, correctAnswers, incorrectAnswers, accuracy);
    }

    // Inner class for session statistics
    public static class SessionStats {
        private int totalAnswers;
        private int correctAnswers;
        private int incorrectAnswers;
        private double accuracy;

        public SessionStats(int totalAnswers, int correctAnswers, int incorrectAnswers, double accuracy) {
            this.totalAnswers = totalAnswers;
            this.correctAnswers = correctAnswers;
            this.incorrectAnswers = incorrectAnswers;
            this.accuracy = accuracy;
        }

        // Getters
        public int getTotalAnswers() { return totalAnswers; }
        public int getCorrectAnswers() { return correctAnswers; }
        public int getIncorrectAnswers() { return incorrectAnswers; }
        public double getAccuracy() { return accuracy; }
    }
}