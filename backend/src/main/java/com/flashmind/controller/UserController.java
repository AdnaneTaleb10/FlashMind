package com.flashmind.controller;

import com.flashmind.model.User;
import com.flashmind.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Tag(name = "Authentication & User Profile", description = "User authentication, registration, and profile management")
public class UserController {

    @Autowired
    private UserService userService;

    // ==================== 1. Authentication Endpoints ====================

    @Operation(
            summary = "Register a new user",
            description = "Create a new user account with email, username, password, and name. Auto-login after registration."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User registered successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input or email/username already exists")
    })
    @PostMapping("/auth/register")
    public ResponseEntity<?> register(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "User registration details",
                    required = true,
                    content = @Content(
                            schema = @Schema(example = "{\"email\": \"user@example.com\", \"password\": \"password123\", \"confirmPassword\": \"password123\", \"name\": \"John Doe\", \"username\": \"johndoe\"}")
                    )
            )
            @RequestBody Map<String, String> request,
            HttpSession session) {
        try {
            String email = request.get("email");
            String password = request.get("password");
            String confirmPassword = request.get("confirmPassword");
            String name = request.get("name");
            String username = request.get("username");

            if (!password.equals(confirmPassword)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Passwords do not match");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            User user = new User();
            user.setEmail(email);
            user.setPassword(password);
            user.setName(name);
            user.setUsername(username);

            User registeredUser = userService.registerUser(user);

            session.setAttribute("userId", registeredUser.getId());
            session.setAttribute("username", registeredUser.getUsername());

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

    @Operation(
            summary = "Login user",
            description = "Authenticate user with email and password. Creates a session on success."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful"),
            @ApiResponse(responseCode = "400", description = "Email and password are required"),
            @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Login credentials",
                    required = true,
                    content = @Content(
                            schema = @Schema(example = "{\"email\": \"user@example.com\", \"password\": \"password123\"}")
                    )
            )
            @RequestBody Map<String, String> credentials,
            HttpSession session) {
        try {
            String email = credentials.get("email");
            String password = credentials.get("password");

            if (email == null || password == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Email and password are required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            User user = userService.getUserByEmail(email);

            if (!user.getPassword().equals(password)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            session.setAttribute("userId", user.getId());
            session.setAttribute("username", user.getUsername());

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

    @Operation(
            summary = "Logout user",
            description = "End the current user session"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Logout successful")
    })
    @PostMapping("/auth/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        try {
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

    @Operation(
            summary = "Get current user profile",
            description = "Retrieve profile information for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Profile retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "User not authenticated"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/users/profile")
    public ResponseEntity<?> getUserProfile(HttpSession session) {
        try {
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

    @Operation(
            summary = "Update user profile",
            description = "Update name and/or username for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Profile updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input or username already taken"),
            @ApiResponse(responseCode = "401", description = "User not authenticated")
    })
    @PutMapping("/users/profile")
    public ResponseEntity<?> updateUserProfile(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Updated profile information",
                    required = true,
                    content = @Content(
                            schema = @Schema(example = "{\"name\": \"Jane Doe\", \"username\": \"janedoe\"}")
                    )
            )
            @RequestBody Map<String, String> updates,
            HttpSession session) {
        try {
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

    @Operation(
            summary = "Change password",
            description = "Update password for the authenticated user. Requires current password for verification."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Password updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input or password too short"),
            @ApiResponse(responseCode = "401", description = "User not authenticated or current password incorrect")
    })
    @PutMapping("/users/password")
    public ResponseEntity<?> changePassword(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Current and new password",
                    required = true,
                    content = @Content(
                            schema = @Schema(example = "{\"currentPassword\": \"oldpass123\", \"newPassword\": \"newpass123\"}")
                    )
            )
            @RequestBody Map<String, String> passwords,
            HttpSession session) {
        try {
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

            User user = userService.getUserById(userId);

            if (!user.getPassword().equals(currentPassword)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Current password is incorrect");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            if (newPassword.length() < 6) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "New password must be at least 6 characters");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

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

    @Operation(
            summary = "Check authentication status",
            description = "Check if the current session is authenticated"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Authentication status returned")
    })
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