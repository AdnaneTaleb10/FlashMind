package com.flashmind.controller;

import com.flashmind.model.FlashCard;
import com.flashmind.service.FlashCardService;
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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Tag(name = "Flashcards", description = "Flashcard management API - Create, read, update, and delete flashcards within folders")
public class FlashCardController {

    @Autowired
    private FlashCardService flashCardService;

    @Autowired
    private FolderService folderService;

    @Operation(
            summary = "Get all flashcards in a folder",
            description = "Retrieve all flashcards belonging to a specific folder (must be owned by authenticated user)"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved flashcards"),
            @ApiResponse(responseCode = "401", description = "User not authenticated"),
            @ApiResponse(responseCode = "403", description = "User doesn't own this folder"),
            @ApiResponse(responseCode = "404", description = "Folder not found")
    })
    @GetMapping("/api/folders/{folderId}/cards")
    public ResponseEntity<?> getFolderCards(
            @Parameter(description = "ID of the folder", required = true)
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
                error.put("error", "You don't have permission to access this folder");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

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

    @Operation(
            summary = "Create a new flashcard",
            description = "Create a new flashcard in a specific folder (must be owned by authenticated user). Automatically updates folder's card count."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Flashcard created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input - front text and back text are required"),
            @ApiResponse(responseCode = "401", description = "User not authenticated"),
            @ApiResponse(responseCode = "403", description = "User doesn't own this folder"),
            @ApiResponse(responseCode = "404", description = "Folder not found")
    })
    @PostMapping("/api/folders/{folderId}/cards")
    public ResponseEntity<?> createFlashCard(
            @Parameter(description = "ID of the folder to add the card to", required = true)
            @PathVariable Integer folderId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Flashcard content",
                    required = true,
                    content = @Content(
                            schema = @Schema(example = "{\"frontText\": \"What is Java?\", \"backText\": \"A programming language\"}")
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

    @Operation(
            summary = "Update a flashcard",
            description = "Update the front and back text of an existing flashcard (folder must be owned by authenticated user)"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Flashcard updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input - front text and back text are required"),
            @ApiResponse(responseCode = "401", description = "User not authenticated"),
            @ApiResponse(responseCode = "403", description = "User doesn't own the folder containing this flashcard"),
            @ApiResponse(responseCode = "404", description = "Flashcard not found")
    })
    @PutMapping("/api/cards/{cardId}")
    public ResponseEntity<?> updateFlashCard(
            @Parameter(description = "ID of the flashcard to update", required = true)
            @PathVariable Integer cardId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Updated flashcard content",
                    required = true,
                    content = @Content(
                            schema = @Schema(example = "{\"frontText\": \"What is Spring Boot?\", \"backText\": \"A Java framework for building applications\"}")
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

            FlashCard existingCard = flashCardService.getFlashCardById(cardId);

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

    @Operation(
            summary = "Delete a flashcard",
            description = "Delete a flashcard (folder must be owned by authenticated user). Automatically updates folder's card count."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Flashcard deleted successfully"),
            @ApiResponse(responseCode = "401", description = "User not authenticated"),
            @ApiResponse(responseCode = "403", description = "User doesn't own the folder containing this flashcard"),
            @ApiResponse(responseCode = "404", description = "Flashcard not found")
    })
    @DeleteMapping("/api/cards/{cardId}")
    public ResponseEntity<?> deleteFlashCard(
            @Parameter(description = "ID of the flashcard to delete", required = true)
            @PathVariable Integer cardId,
            HttpSession session) {
        try {
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            FlashCard existingCard = flashCardService.getFlashCardById(cardId);

            if (!folderService.isUserOwner(userId, existingCard.getFolderId())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "You don't have permission to delete this flashcard");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
            }

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