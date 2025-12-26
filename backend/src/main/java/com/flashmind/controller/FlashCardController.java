package com.flashmind.controller;

import com.flashmind.model.FlashCard;
import com.flashmind.service.FlashCardService;
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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FlashCardController {

    @Autowired
    private FlashCardService flashCardService;

    @Autowired
    private FolderService folderService;

    /**
     * Get all flashcards in a folder
     * GET /api/folders/{folderId}/cards
     * Response: [{"id": 1, "frontText": "...", "backText": "...", "createdAt": "..."}]
     */
    @GetMapping("/api/folders/{folderId}/cards")
    public ResponseEntity<?> getFolderCards(@PathVariable Integer folderId, HttpSession session) {
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
                error.put("error", "You don't have permission to access this folder");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            // Get all cards in the folder
            List<FlashCard> cards = flashCardService.getFolderFlashCards(folderId);

            return ResponseEntity.ok(cards);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while fetching flashcards");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Create a new flashcard in a folder
     * POST /api/folders/{folderId}/cards
     * Body: {"frontText": "Question", "backText": "Answer"}
     * Response: {"id": 1, "frontText": "...", "backText": "...", "createdAt": "..."}
     */
    @PostMapping("/api/folders/{folderId}/cards")
    public ResponseEntity<?> createFlashCard(
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
                error.put("error", "You don't have permission to add cards to this folder");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            String frontText = request.get("frontText");
            String backText = request.get("backText");

            if (frontText == null || frontText.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Front text is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            if (backText == null || backText.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Back text is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            // Create flashcard
            FlashCard flashCard = new FlashCard();
            flashCard.setFolderId(folderId);
            flashCard.setFrontText(frontText);
            flashCard.setBackText(backText);

            FlashCard createdCard = flashCardService.createFlashCard(flashCard);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdCard);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while creating flashcard");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Update a flashcard
     * PUT /api/cards/{cardId}
     * Body: {"frontText": "Updated Question", "backText": "Updated Answer"}
     * Response: {"id": 1, "frontText": "...", "backText": "...", "createdAt": "..."}
     */
    @PutMapping("/api/cards/{cardId}")
    public ResponseEntity<?> updateFlashCard(
            @PathVariable Integer cardId,
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

            // Get the card to check folder ownership
            FlashCard existingCard = flashCardService.getFlashCardById(cardId);

            // Check if user owns the folder that contains this card
            if (!folderService.isUserOwner(userId, existingCard.getFolderId())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You don't have permission to update this flashcard");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            String frontText = request.get("frontText");
            String backText = request.get("backText");

            if (frontText == null || frontText.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Front text is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            if (backText == null || backText.trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Back text is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            // Update flashcard
            FlashCard updatedCard = new FlashCard();
            updatedCard.setFrontText(frontText);
            updatedCard.setBackText(backText);

            FlashCard card = flashCardService.updateFlashCard(cardId, updatedCard);

            return ResponseEntity.ok(card);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while updating flashcard");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    /**
     * Delete a flashcard
     * DELETE /api/cards/{cardId}
     * Response: {"message": "Flashcard deleted successfully"}
     */
    @DeleteMapping("/api/cards/{cardId}")
    public ResponseEntity<?> deleteFlashCard(@PathVariable Integer cardId, HttpSession session) {
        try {
            // Get userId from session
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Get the card to check folder ownership
            FlashCard existingCard = flashCardService.getFlashCardById(cardId);

            // Check if user owns the folder that contains this card
            if (!folderService.isUserOwner(userId, existingCard.getFolderId())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You don't have permission to delete this flashcard");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

            // Delete flashcard
            flashCardService.deleteFlashCard(cardId);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Flashcard deleted successfully");

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while deleting flashcard");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}