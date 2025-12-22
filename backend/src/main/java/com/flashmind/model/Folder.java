package com.flashmind.model;

import java.time.LocalDateTime;

public class Folder {
    private Integer id;
    private Integer userId;
    private String folderName;
    private LocalDateTime createdAt;
    private Integer totalCards;

    // Constructors
    public Folder() {
    }

    public Folder(Integer id, Integer userId, String folderName, LocalDateTime createdAt, Integer totalCards) {
        this.id = id;
        this.userId = userId;
        this.folderName = folderName;
        this.createdAt = createdAt;
        this.totalCards = totalCards;
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

    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getTotalCards() {
        return totalCards;
    }

    public void setTotalCards(Integer totalCards) {
        this.totalCards = totalCards;
    }

    @Override
    public String toString() {
        return "Folder{" +
                "id=" + id +
                ", userId=" + userId +
                ", folderName='" + folderName + '\'' +
                ", createdAt=" + createdAt +
                ", totalCards=" + totalCards +
                '}';
    }
}