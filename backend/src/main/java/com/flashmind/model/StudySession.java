package com.flashmind.model;

import java.time.LocalDateTime;

public class StudySession {
    private Integer id;
    private Integer userId;
    private Integer folderId;
    private LocalDateTime date;

    // Constructors
    public StudySession() {
    }

    public StudySession(Integer id, Integer userId, Integer folderId, LocalDateTime date) {
        this.id = id;
        this.userId = userId;
        this.folderId = folderId;
        this.date = date;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getFolderId() {
        return folderId;
    }

    public void setFolderId(Integer folderId) {
        this.folderId = folderId;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "StudySession{" +
                "id=" + id +
                ", userId=" + userId +
                ", folderId=" + folderId +
                ", date=" + date +
                '}';
    }
}