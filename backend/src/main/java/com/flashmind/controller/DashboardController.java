package com.flashmind.controller;

import com.flashmind.service.DashboardService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    /**
     * Get dashboard overview
     * GET /api/dashboard/overview
     * Response: {
     *   "recentFolders": [...],
     *   "recentSessions": [...],
     *   "stats": {"totalFolders": 5, "totalCards": 20, "totalSessions": 10}
     * }
     */
    @GetMapping("/overview")
    public ResponseEntity<?> getDashboardOverview(HttpSession session) {
        try {
            // Get userId from session
            Integer userId = (Integer) session.getAttribute("userId");

            if (userId == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Not authenticated. Please login.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            // Get dashboard data
            Map<String, Object> dashboard = dashboardService.getDashboardOverview(userId);

            return ResponseEntity.ok(dashboard);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "An error occurred while fetching dashboard data");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}