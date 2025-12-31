package com.flashmind.service;

import com.flashmind.dao.UserDao;
import com.flashmind.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    // Register a new user
    public User registerUser(User user) {
        // Validate email doesn't exist
        if (userDao.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        // Validate username doesn't exist
        if (userDao.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }

        // Validate email format
        if (!isValidEmail(user.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }

        // Validate password length
        if (user.getPassword() == null || user.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters");
        }

        // TODO: In production, hash the password here
        // user.setPassword(hashPassword(user.getPassword()));

        // Create user
        userDao.createUser(user);

        return user;
    }

    // Get user by ID
    public User getUserById(Integer id) {
        return userDao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));
    }

    // Get user by email
    public User getUserByEmail(String email) {
        return userDao.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }

    // Get user by username
    public User getUserByUsername(String username) {
        return userDao.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));
    }

    // Get all users
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    public User updateUserProfile(Integer userId, User updatedUser) {
        // Check if user exists
        User existingUser = getUserById(userId);

        // Only update email if provided
        if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
            // Check if email is changing
            if (!existingUser.getEmail().equals(updatedUser.getEmail())) {
                if (userDao.existsByEmail(updatedUser.getEmail())) {
                    throw new IllegalArgumentException("Email already in use");
                }
                existingUser.setEmail(updatedUser.getEmail());
            }
        }

        // Only update username if provided
        if (updatedUser.getUsername() != null && !updatedUser.getUsername().isEmpty()) {
            // Check if username is changing
            if (!existingUser.getUsername().equals(updatedUser.getUsername())) {
                if (userDao.existsByUsername(updatedUser.getUsername())) {
                    throw new IllegalArgumentException("Username already taken");
                }
                existingUser.setUsername(updatedUser.getUsername());
            }
        }

        // Only update name if provided
        if (updatedUser.getName() != null && !updatedUser.getName().isEmpty()) {
            existingUser.setName(updatedUser.getName());
        }

        userDao.updateUser(existingUser);

        return existingUser;
    }

    // Change password
    public void changePassword(Integer userId, String currentPassword, String newPassword) {
        // Get user
        User user = getUserById(userId);

        // Verify current password
        if (!user.getPassword().equals(currentPassword)) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        // Validate new password
        if (newPassword == null || newPassword.length() < 6) {
            throw new IllegalArgumentException("New password must be at least 6 characters");
        }

        // Update password in database
        userDao.updatePassword(userId, newPassword);
    }

    // Delete user
    public void deleteUser(Integer userId) {
        // Check if user exists
        getUserById(userId);

        // TODO: In production, delete all related data first
        // - Delete folders
        // - Delete flash cards
        // - Delete study sessions

        userDao.deleteUser(userId);
    }

    // Check if email exists
    public boolean emailExists(String email) {
        return userDao.existsByEmail(email);
    }

    // Check if username exists
    public boolean usernameExists(String username) {
        return userDao.existsByUsername(username);
    }

    // Authenticate user (simple version)
    public Optional<User> authenticateUser(String username, String password) {
        Optional<User> userOpt = userDao.findByUsername(username);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // TODO: In production, compare hashed passwords
            if (user.getPassword().equals(password)) {
                return Optional.of(user);
            }
        }

        return Optional.empty();
    }

    // Helper method to validate email
    private boolean isValidEmail(String email) {
        return email != null && email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    }
}