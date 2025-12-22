package com.flashmind.model;

import java.time.LocalDateTime;

public class FlashCard {
    private Integer id;
    private Integer folderId;
    private String frontText;
    private String backText;
    private LocalDateTime createdAt;

    // Constructors
    public FlashCard() {
    }

    public FlashCard(Integer id, Integer folderId, String frontText, String backText, LocalDateTime createdAt) {
        this.id = id;
        this.folderId = folderId;
        this.frontText = frontText;
        this.backText = backText;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getFolderId() {
        return folderId;
    }

    public void setFolderId(Integer folderId) {
        this.folderId = folderId;
    }

    public String getFrontText() {
        return frontText;
    }

    public void setFrontText(String frontText) {
        this.frontText = frontText;
    }

    public String getBackText() {
        return backText;
    }

    public void setBackText(String backText) {
        this.backText = backText;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "FlashCard{" +
                "id=" + id +
                ", folderId=" + folderId +
                ", frontText='" + frontText + '\'' +
                ", backText='" + backText + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}