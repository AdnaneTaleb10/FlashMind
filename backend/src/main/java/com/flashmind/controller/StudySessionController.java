package com.flashmind.controller;

import com.flashmind.service.FolderService;
import com.flashmind.service.StudySessionService;
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
import java.util.Map;

@RestController
@RequestMapping("/api/study")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Tag(name = "Study Sessions", description = "Study session management - Start sessions, track progress, and view history")
public class StudySessionController {

    @Autowired
    private StudySessionService studySessionService;

    @Autowired
    private FolderService folderService;

    @Operation(
            summary = "Start a new study session",
            description = "Initialize a study session for a specific folder. Returns all flashcards in the folder for studying. Folder must be owned by authenticated user and contain at least one flashcard."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Study session started successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input or folder has no flashcards"),
            @ApiResponse(responseCode = "401", description = "User not authenticated"),
            @ApiResponse(responseCode = "403", description = "User doesn't own this folder"),
            @ApiResponse(responseCode = "404", description = "Folder not found")
    })
    @PostMapping("/sessions")
    public ResponseEntity<?> startStudySession(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Folder to study",
                    required = true,
                    content = @Content(
                            schema = @Schema(example = "{\"folderId\": 1}")
                    )
            )
            @RequestBody Map<String, Integer> request,
            HttpSession session) {
        try {
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            Integer folderId = request.get("folderId");

            if (folderId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Folder ID is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            if (!folderService.isUserOwner(userId, folderId)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You don't have permission to study this folder");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            Map<String, Object> response = studySessionService.startStudySession(userId, folderId);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while starting study session");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @Operation(
            summary = "End a study session",
            description = "Complete a study session and save the score. Session must belong to authenticated user."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Study session ended successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input - score is required"),
            @ApiResponse(responseCode = "401", description = "User not authenticated"),
            @ApiResponse(responseCode = "403", description = "Session doesn't belong to this user"),
            @ApiResponse(responseCode = "404", description = "Study session not found")
    })
    @PostMapping("/sessions/{sessionId}/end")
    public ResponseEntity<?> endStudySession(
            @Parameter(description = "ID of the study session to end", required = true)
            @PathVariable Integer sessionId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Score achieved in the session",
                    required = true,
                    content = @Content(
                            schema = @Schema(example = "{\"score\": 8}")
                    )
            )
            @RequestBody Map<String, Integer> request,
            HttpSession session) {
        try {
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            Integer score = request.get("score");

            if (score == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Score is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            var studySession = studySessionService.getStudySessionById(sessionId);
            if (!studySession.getUserId().equals(userId)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You don't have permission to end this session");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            Map<String, Object> response = studySessionService.endStudySession(sessionId, score);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while ending study session");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @Operation(
            summary = "Get study session history",
            description = "Retrieve all past study sessions for the authenticated user, ordered by date (newest first)"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved study sessions"),
            @ApiResponse(responseCode = "401", description = "User not authenticated")
    })
    @GetMapping("/sessions")
    public ResponseEntity<?> getStudySessions(HttpSession session) {
        try {
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            var sessions = studySessionService.getUserStudySessions(userId);

            return ResponseEntity.ok(sessions);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while fetching study sessions");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}