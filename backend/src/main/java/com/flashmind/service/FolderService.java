package com.flashmind.service;

import com.flashmind.dao.FolderDao;
import com.flashmind.dao.FlashCardDao;
import com.flashmind.dao.UserDao;
import com.flashmind.model.Folder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService {

    @Autowired
    private FolderDao folderDao;

    @Autowired
    private FlashCardDao flashCardDao;

    @Autowired
    private UserDao userDao;

    // Create a new folder
    public Folder createFolder(Folder folder) {
        // Validate user exists
        if (!userDao.findById(folder.getUserId()).isPresent()) {
            throw new IllegalArgumentException("User not found with id: " + folder.getUserId());
        }

        // Validate folder name
        if (folder.getFolderName() == null || folder.getFolderName().trim().isEmpty()) {
            throw new IllegalArgumentException("Folder name cannot be empty");
        }

        // Create folder
        folderDao.createFolder(folder);

        return folder;
    }

    // Get folder by ID
    public Folder getFolderById(Integer id) {
        return folderDao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Folder not found with id: " + id));
    }

    // Get all folders for a user
    public List<Folder> getUserFolders(Integer userId) {
        // Validate user exists
        if (!userDao.findById(userId).isPresent()) {
            throw new IllegalArgumentException("User not found with id: " + userId);
        }

        return folderDao.findByUserId(userId);
    }

    // Get all folders
    public List<Folder> getAllFolders() {
        return folderDao.findAll();
    }

    // Update folder
    public Folder updateFolder(Integer folderId, Folder updatedFolder) {
        // Check if folder exists
        Folder existingFolder = getFolderById(folderId);

        // Validate folder name
        if (updatedFolder.getFolderName() == null || updatedFolder.getFolderName().trim().isEmpty()) {
            throw new IllegalArgumentException("Folder name cannot be empty");
        }

        // Update fields
        existingFolder.setFolderName(updatedFolder.getFolderName());

        folderDao.updateFolder(existingFolder);

        return existingFolder;
    }

    // Delete folder
    public void deleteFolder(Integer folderId) {
        // Check if folder exists
        getFolderById(folderId);

        // Delete all flash cards in the folder first
        flashCardDao.deleteByFolderId(folderId);

        // Delete the folder
        folderDao.deleteFolder(folderId);
    }

    // Update total cards count for a folder
    public void updateFolderCardCount(Integer folderId) {
        // Check if folder exists
        getFolderById(folderId);

        folderDao.updateTotalCards(folderId);
    }

    // Get folder count for a user
    public int getUserFolderCount(Integer userId) {
        return folderDao.countByUserId(userId);
    }

    // Check if user owns folder
    public boolean isUserOwner(Integer userId, Integer folderId) {
        Folder folder = getFolderById(folderId);
        return folder.getUserId().equals(userId);
    }
}