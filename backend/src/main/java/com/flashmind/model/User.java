package com.flashmind.model;

import java.time.LocalDateTime;

public class User {
    private Integer id;
    private String email;
    private String name;
    private String username;
    private String password;
    private LocalDateTime createdAt;

    // Constructors
    public User() {
    }

    public User(Integer id, String email, String name, String username, String password, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.username = username;
        this.password = password;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}