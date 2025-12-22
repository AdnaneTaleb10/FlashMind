package com.flashmind.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/connection")
    public String testConnection() {
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return "✅ Database connection successful! Result: " + result;
        } catch (Exception e) {
            return "❌ Database connection failed: " + e.getMessage();
        }
    }

    @GetMapping("/users-count")
    public String getUsersCount() {
        try {
            Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM users", Integer.class);
            return "✅ Users table exists! Total users: " + count;
        } catch (Exception e) {
            return "❌ Error: " + e.getMessage();
        }
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hello from FlashMind Backend! 🚀";
    }
}