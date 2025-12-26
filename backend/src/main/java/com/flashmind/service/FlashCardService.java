package com.flashmind.service;

import com.flashmind.dao.FlashCardDao;
import com.flashmind.dao.FolderDao;
import com.flashmind.model.FlashCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlashCardService {

    @Autowired
    private FlashCardDao flashCardDao;

    @Autowired
    private FolderDao folderDao;

    // Create a new flash card
// Create a new flash card
    public FlashCard createFlashCard(FlashCard flashCard) {
        // Validate folder exists
        if (!folderDao.findById(flashCard.getFolderId()).isPresent()) {
            throw new IllegalArgumentException("Folder not found with id: " + flashCard.getFolderId());
        }

        // Validate front text
        if (flashCard.getFrontText() == null || flashCard.getFrontText().trim().isEmpty()) {
            throw new IllegalArgumentException("Front text cannot be empty");
        }

        // Validate back text
        if (flashCard.getBackText() == null || flashCard.getBackText().trim().isEmpty()) {
            throw new IllegalArgumentException("Back text cannot be empty");
        }

        // Create flash card and capture the returned object
        FlashCard createdCard = flashCardDao.createFlashCard(flashCard);

        // Update folder's total card count
        folderDao.updateTotalCards(flashCard.getFolderId());

        return createdCard;
    }

    // Get flash card by ID
    public FlashCard getFlashCardById(Integer id) {
        return flashCardDao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Flash card not found with id: " + id));
    }

    // Get all flash cards in a folder
    public List<FlashCard> getFolderFlashCards(Integer folderId) {
        // Validate folder exists
        if (!folderDao.findById(folderId).isPresent()) {
            throw new IllegalArgumentException("Folder not found with id: " + folderId);
        }

        return flashCardDao.findByFolderId(folderId);
    }

    // Get all flash cards
    public List<FlashCard> getAllFlashCards() {
        return flashCardDao.findAll();
    }

    // Update flash card
    public FlashCard updateFlashCard(Integer cardId, FlashCard updatedCard) {
        // Check if flash card exists
        FlashCard existingCard = getFlashCardById(cardId);

        // Validate front text
        if (updatedCard.getFrontText() == null || updatedCard.getFrontText().trim().isEmpty()) {
            throw new IllegalArgumentException("Front text cannot be empty");
        }

        // Validate back text
        if (updatedCard.getBackText() == null || updatedCard.getBackText().trim().isEmpty()) {
            throw new IllegalArgumentException("Back text cannot be empty");
        }

        // Update fields
        existingCard.setFrontText(updatedCard.getFrontText());
        existingCard.setBackText(updatedCard.getBackText());

        return flashCardDao.updateFlashCard(existingCard);
    }

    // Delete flash card
    public void deleteFlashCard(Integer cardId) {
        // Get the card to know which folder it belongs to
        FlashCard card = getFlashCardById(cardId);

        // Delete the card
        flashCardDao.deleteFlashCard(cardId);

        // Update folder's total card count
        folderDao.updateTotalCards(card.getFolderId());
    }

    // Delete all flash cards in a folder
    public void deleteAllCardsInFolder(Integer folderId) {
        // Validate folder exists
        if (!folderDao.findById(folderId).isPresent()) {
            throw new IllegalArgumentException("Folder not found with id: " + folderId);
        }

        flashCardDao.deleteByFolderId(folderId);

        // Update folder's total card count to 0
        folderDao.updateTotalCards(folderId);
    }

    // Get flash card count in a folder
    public int getFolderCardCount(Integer folderId) {
        return flashCardDao.countByFolderId(folderId);
    }
}