package com.flashmind.controller;

import com.flashmind.model.User;
import com.flashmind.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Important: allowCredentials for sessions
public class UserController {

    @Autowired
    private UserService userService;

    // ==================== 1. Authentication Endpoints ====================

    /**
     * Register a new user
     * POST /api/auth/register
     */
    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request, HttpSession session) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            String confirmPassword = request.get("confirmPassword");
            String name = request.get("name");
            String username = request.get("username");

            // Validate passwords match
            if (!password.equals(confirmPassword)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Passwords do not match");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            // Create user
            User user = new User();
            user.setEmail(email);
            user.setPassword(password);
            user.setName(name);
            user.setUsername(username);

            User registeredUser = userService.registerUser(user);

            // Auto-login: Store userId in session
            session.setAttribute("userId", registeredUser.getId());
            session.setAttribute("username", registeredUser.getUsername());

            // Response
            Map<String, Object> response = new HashMap<>();
            response.put("id", registeredUser.getId());
            response.put("email", registeredUser.getEmail());
            response.put("username", registeredUser.getUsername());
            response.put("name", registeredUser.getName());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred during registration");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Login user
     * POST /api/auth/login
     */
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpSession session) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");

            if (email == null || password == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Email and password are required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            // Find user by email
            User user = userService.getUserByEmail(email);

            // Check password (TODO: use hashed passwords in production)
            if (!user.getPassword().equals(password)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Store userId in session (this is the key part!)
            session.setAttribute("userId", user.getId());
            session.setAttribute("username", user.getUsername());

            // Response
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("email", user.getEmail());
            response.put("username", user.getUsername());
            response.put("name", user.getName());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred during login");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Logout user
     * POST /api/auth/logout
     */
    @PostMapping("/auth/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        try {
            // Destroy the session
            session.invalidate();

            Map<String, String> response = new HashMap<>();
            response.put("message", "Logged out");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred during logout");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // ==================== 2. User Profile Endpoints ====================

    /**
     * Get current user profile
     * GET /api/users/profile
     */
    @GetMapping("/users/profile")
    public ResponseEntity<?> getUserProfile(HttpSession session) {
        try {
            // Get userId from session
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            User user = userService.getUserById(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("email", user.getEmail());
            response.put("username", user.getUsername());
            response.put("name", user.getName());
            response.put("createdAt", user.getCreatedAt());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Update user profile (name/username)
     * PUT /api/users/profile
     */
    @PutMapping("/users/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody Map<String, String> updates, HttpSession session) {
        try {
            // Get userId from session
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            String name = updates.get("name");
            String username = updates.get("username");

            User updatedUser = new User();
            updatedUser.setName(name);
            updatedUser.setUsername(username);

            User user = userService.updateUserProfile(userId, updatedUser);

            // Update session username if changed
            session.setAttribute("username", user.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId());
            response.put("email", user.getEmail());
            response.put("username", user.getUsername());
            response.put("name", user.getName());
            response.put("message", "Profile updated");

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Change password
     * PUT /api/users/password
     */
    @PutMapping("/users/password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> passwords, HttpSession session) {
        try {
            // Get userId from session
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            String currentPassword = passwords.get("currentPassword");
            String newPassword = passwords.get("newPassword");

            if (currentPassword == null || newPassword == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Current password and new password are required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            // Get user
            User user = userService.getUserById(userId);

            // Verify current password (TODO: use hashed passwords)
            if (!user.getPassword().equals(currentPassword)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Current password is incorrect");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Validate new password
            if (newPassword.length() < 6) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "New password must be at least 6 characters");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            // Update password (TODO: hash password before saving)
            user.setPassword(newPassword);
            userService.updateUserProfile(userId, user);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Password updated");

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Check if user is authenticated (helper endpoint)
     * GET /api/auth/check
     */
    @GetMapping("/auth/check")
    public ResponseEntity<?> checkAuth(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");

        Map<String, Object> response = new HashMap<>();
        response.put("authenticated", userId != null);

        if (userId != null) {
            response.put("userId", userId);
            response.put("username", session.getAttribute("username"));
        }

        return ResponseEntity.ok(response);
    }
}