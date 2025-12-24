package com.flashmind.controller;

import com.flashmind.model.Folder;
import com.flashmind.service.FolderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/folders")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FolderController {

    @Autowired
    private FolderService folderService;

    /**
     * Get all folders for the authenticated user
     * GET /api/folders
     * Response: [{"id": 1, "name": "...", "totalCards": 5, "createdAt": "..."}]
     */
    @GetMapping
    public ResponseEntity<?> getUserFolders(HttpSession session) {
        try {
            // Get userId from session
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Get all user's folders
            List<Folder> folders = folderService.getUserFolders(userId);

            return ResponseEntity.ok(folders);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while fetching folders");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Get 3 most recent folders
     * GET /api/folders/recent
     * Response: [{"id": 1, "name": "...", "totalCards": 5, "createdAt": "..."}]
     */
    @GetMapping("/recent")
    public ResponseEntity<?> getRecentFolders(HttpSession session) {
        try {
            // Get userId from session
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Get all user's folders
            List<Folder> folders = folderService.getUserFolders(userId);

            // Return only the first 3 (most recent)
            List<Folder> recentFolders = folders.size() > 3
                    ? folders.subList(0, 3)
                    : folders;

            return ResponseEntity.ok(recentFolders);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while fetching recent folders");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Create a new folder
     * POST /api/folders
     * Body: {"name": "Spanish Vocabulary"}
     * Response: {"id": 1, "name": "...", "totalCards": 0, "createdAt": "..."}
     */
    @PostMapping
    public ResponseEntity<?> createFolder(@RequestBody Map<String, String> request, HttpSession session) {
        try {
            // Get userId from session
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            String folderName = request.get("name");

            if (folderName == null || folderName.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Folder name is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            // Create folder
            Folder folder = new Folder();
            folder.setUserId(userId);
            folder.setFolderName(folderName);

            Folder createdFolder = folderService.createFolder(folder);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdFolder);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();  // ADD THIS
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            e.printStackTrace();  // ADD THIS
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while creating folder");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Update/Rename a folder
     * PUT /api/folders/{folderId}
     * Body: {"name": "Updated Name"}
     * Response: {"id": 1, "name": "...", "totalCards": 5, "createdAt": "..."}
     */
    @PutMapping("/{folderId}")
    public ResponseEntity<?> updateFolder(
            @PathVariable Integer folderId,
            @RequestBody Map<String, String> request,
            HttpSession session) {
        try {
            // Get userId from session
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Check if user owns this folder
            if (!folderService.isUserOwner(userId, folderId)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You don't have permission to update this folder");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            String folderName = request.get("name");

            if (folderName == null || folderName.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Folder name is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            // Update folder
            Folder updatedFolder = new Folder();
            updatedFolder.setFolderName(folderName);

            Folder folder = folderService.updateFolder(folderId, updatedFolder);

            return ResponseEntity.ok(folder);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while updating folder");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Delete a folder (and all its flashcards)
     * DELETE /api/folders/{folderId}
     * Response: {"message": "Folder deleted successfully"}
     */
    @DeleteMapping("/{folderId}")
    public ResponseEntity<?> deleteFolder(@PathVariable Integer folderId, HttpSession session) {
        try {
            // Get userId from session
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Check if user owns this folder
            if (!folderService.isUserOwner(userId, folderId)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You don't have permission to delete this folder");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            // Delete folder (and all its flashcards)
            folderService.deleteFolder(folderId);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Folder deleted successfully");

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while deleting folder");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}