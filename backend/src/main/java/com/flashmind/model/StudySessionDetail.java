package com.flashmind.model;

import java.time.LocalDateTime;

public class StudySessionDetail {
    private Integer id;
    private Integer sessionId;
    private Integer flashcardId;
    private Boolean isCorrect;
    private LocalDateTime answeredAt;

    // Constructors
    public StudySessionDetail() {
    }

    public StudySessionDetail(Integer id, Integer sessionId, Integer flashcardId, Boolean isCorrect, LocalDateTime answeredAt) {
        this.id = id;
        this.sessionId = sessionId;
        this.flashcardId = flashcardId;
        this.isCorrect = isCorrect;
        this.answeredAt = answeredAt;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
    }

    public Integer getFlashcardId() {
        return flashcardId;
    }

    public void setFlashcardId(Integer flashcardId) {
        this.flashcardId = flashcardId;
    }

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public LocalDateTime getAnsweredAt() {
        return answeredAt;
    }

    public void setAnsweredAt(LocalDateTime answeredAt) {
        this.answeredAt = answeredAt;
    }

    @Override
    public String toString() {
        return "StudySessionDetail{" +
                "id=" + id +
                ", sessionId=" + sessionId +
                ", flashcardId=" + flashcardId +
                ", isCorrect=" + isCorrect +
                ", answeredAt=" + answeredAt +
                '}';
    }
}
