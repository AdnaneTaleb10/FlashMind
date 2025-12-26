package com.flashmind.service;

import com.flashmind.dao.FlashCardDao;
import com.flashmind.dao.FolderDao;
import com.flashmind.dao.StudySessionDao;
import com.flashmind.model.Folder;
import com.flashmind.model.StudySession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private FolderDao folderDao;

    @Autowired
    private FlashCardDao flashCardDao;

    @Autowired
    private StudySessionDao studySessionDao;

    // Get dashboard overview
    public Map<String, Object> getDashboardOverview(Integer userId) {
        // Get recent folders (last 3)
        List<Folder> allFolders = folderDao.findByUserId(userId);
        List<Folder> recentFolders = allFolders.size() > 3
                ? allFolders.subList(0, 3)
                : allFolders;

        // Get recent study sessions (last 5)
        List<StudySession> allSessions = studySessionDao.findByUserId(userId);
        List<StudySession> recentSessions = allSessions.size() > 5
                ? allSessions.subList(0, 5)
                : allSessions;

        // Calculate stats
        int totalFolders = folderDao.countByUserId(userId);
        int totalCards = 0;
        for (Folder folder : allFolders) {
            totalCards += flashCardDao.countByFolderId(folder.getId());
        }
        int totalSessions = studySessionDao.countByUserId(userId);

        // Build stats object
        Map<String, Integer> stats = new HashMap<>();
        stats.put("totalFolders", totalFolders);
        stats.put("totalCards", totalCards);
        stats.put("totalSessions", totalSessions);

        // Build response
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("recentFolders", recentFolders);
        dashboard.put("recentSessions", recentSessions);
        dashboard.put("stats", stats);

        return dashboard;
    }
}