package com.flashmind.controller;

import com.flashmind.service.FolderService;
import com.flashmind.service.StudySessionService;
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
public class StudySessionController {

    @Autowired
    private StudySessionService studySessionService;

    @Autowired
    private FolderService folderService;

    /**
     * Start a new study session
     * POST /api/study/sessions
     * Body: {"folderId": 1}
     * Response: {"sessionId": 1, "cards": [...], "totalCards": 10}
     */
    @PostMapping("/sessions")
    public ResponseEntity<?> startStudySession(@RequestBody Map<String, Integer> request, HttpSession session) {
        try {
            // Get userId from session
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

            // Check if user owns this folder
            if (!folderService.isUserOwner(userId, folderId)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You don't have permission to study this folder");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            // Start study session
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

    /**
     * End study session and save score
     * POST /api/study/sessions/{sessionId}/end
     * Body: {"score": 8}
     * Response: {"message": "Session saved", "sessionId": 1, "score": 8, "totalCards": 10}
     */
    @PostMapping("/sessions/{sessionId}/end")
    public ResponseEntity<?> endStudySession(
            @PathVariable Integer sessionId,
            @RequestBody Map<String, Integer> request,
            HttpSession session) {
        try {
            // Get userId from session
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

            // Verify the session belongs to the user
            var studySession = studySessionService.getStudySessionById(sessionId);
            if (!studySession.getUserId().equals(userId)) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You don't have permission to end this session");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            // End study session
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

    /**
     * Get past study sessions
     * GET /api/study/sessions
     * Response: [{"id": 1, "date": "...", "folderId": 1}]
     */
    @GetMapping("/sessions")
    public ResponseEntity<?> getStudySessions(HttpSession session) {
        try {
            // Get userId from session
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Get all study sessions for user
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