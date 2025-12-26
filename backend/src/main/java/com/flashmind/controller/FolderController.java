package com.flashmind.controller;

import com.flashmind.model.Folder;
import com.flashmind.service.FolderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Folders", description = "Folder management API - Create, read, update, and delete flashcard folders")
public class FolderController {

    @Autowired
    private FolderService folderService;

    @Operation(
            summary = "Get all folders",
            description = "Retrieve all folders belonging to the authenticated user, ordered by creation date (newest first)"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved folders"),
            @ApiResponse(responseCode = "401", description = "User not authenticated")
    })
    @GetMapping
    public ResponseEntity<?> getUserFolders(HttpSession session) {
        try {
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            List<Folder> folders = folderService.getUserFolders(userId);
            return ResponseEntity.ok(folders);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while fetching folders");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @Operation(
            summary = "Get recent folders",
            description = "Get the 3 most recently created folders for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved recent folders"),
            @ApiResponse(responseCode = "401", description = "User not authenticated")
    })
    @GetMapping("/recent")
    public ResponseEntity<?> getRecentFolders(HttpSession session) {
        try {
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            List<Folder> folders = folderService.getUserFolders(userId);
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

    @Operation(
            summary = "Create a new folder",
            description = "Create a new flashcard folder for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Folder created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input - folder name is required"),
            @ApiResponse(responseCode = "401", description = "User not authenticated")
    })
    @PostMapping
    public ResponseEntity<?> createFolder(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Folder details",
                    required = true,
                    content = @Content(
                            schema = @Schema(example = "{\"name\": \"Spanish Vocabulary\"}")
                    )
            )
            @RequestBody Map<String, String> request,
            HttpSession session) {
        try {
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

            Folder folder = new Folder();
            folder.setUserId(userId);
            folder.setFolderName(folderName);

            Folder createdFolder = folderService.createFolder(folder);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdFolder);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while creating folder");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @Operation(
            summary = "Update a folder",
            description = "Rename an existing folder (must be owned by authenticated user)"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Folder updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input"),
            @ApiResponse(responseCode = "401", description = "User not authenticated"),
            @ApiResponse(responseCode = "403", description = "User doesn't own this folder"),
            @ApiResponse(responseCode = "404", description = "Folder not found")
    })
    @PutMapping("/{folderId}")
    public ResponseEntity<?> updateFolder(
            @Parameter(description = "ID of the folder to update", required = true)
            @PathVariable Integer folderId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "New folder name",
                    required = true,
                    content = @Content(
                            schema = @Schema(example = "{\"name\": \"Advanced Spanish\"}")
                    )
            )
            @RequestBody Map<String, String> request,
            HttpSession session) {
        try {
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

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

    @Operation(
            summary = "Delete a folder",
            description = "Delete a folder and all its flashcards (must be owned by authenticated user)"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Folder deleted successfully"),
            @ApiResponse(responseCode = "401", description = "User not authenticated"),
            @ApiResponse(responseCode = "403", description = "User doesn't own this folder"),
            @ApiResponse(responseCode = "404", description = "Folder not found")
    })
    @DeleteMapping("/{folderId}")
    public ResponseEntity<?> deleteFolder(
            @Parameter(description = "ID of the folder to delete", required = true)
            @PathVariable Integer folderId,
            HttpSession session) {
        try {
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            if (!folderService.isUserOwner(userId, folderId)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You don't have permission to delete this folder");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

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