package com.flashmind.dao;

import com.flashmind.model.StudySession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class StudySessionDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<StudySession> studySessionRowMapper = new RowMapper<StudySession>() {
        @Override
        public StudySession mapRow(ResultSet rs, int rowNum) throws SQLException {
            StudySession session = new StudySession();
            session.setId(rs.getInt("id"));
            session.setUserId(rs.getInt("user_id"));
            session.setFolderId(rs.getInt("folder_id"));
            session.setScore(rs.getInt("score"));  // ← ADD THIS
            session.setDate(rs.getTimestamp("date").toLocalDateTime());
            return session;
        }
    };

    private final RowMapper<Map<String, Object>> studySessionWithFolderRowMapper = new RowMapper<Map<String, Object>>() {
        @Override
        public Map<String, Object> mapRow(ResultSet rs, int rowNum) throws SQLException {
            Map<String, Object> session = new HashMap<>();
            session.put("id", rs.getInt("id"));
            session.put("userId", rs.getInt("user_id"));
            session.put("folderId", rs.getInt("folder_id"));
            session.put("folderName", rs.getString("folder_name"));  // ← FROM JOIN
            session.put("score", rs.getInt("score"));
            session.put("date", rs.getTimestamp("date").toLocalDateTime().toString());
            return session;
        }
    };

    // Create a new study session
    public StudySession createStudySession(StudySession studySession) {
        String sql = "INSERT INTO study_sessions (user_id, folder_id, score, date) VALUES (?, ?, 0, now())";  // ← ADD score with default 0

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
            ps.setInt(1, studySession.getUserId());
            ps.setInt(2, studySession.getFolderId());
            return ps;
        }, keyHolder);

        Integer generatedId = keyHolder.getKey().intValue();

        return findById(generatedId).orElseThrow(() ->
                new RuntimeException("Failed to retrieve created study session"));
    }

    // Find study session by ID
    public Optional<StudySession> findById(Integer id) {
        String sql = "SELECT * FROM study_sessions WHERE id = ?";
        try {
            StudySession session = jdbcTemplate.queryForObject(sql, studySessionRowMapper, id);
            return Optional.ofNullable(session);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    // Update study session score - NEW METHOD
    public int updateScore(Integer id, Integer score) {
        String sql = "UPDATE study_sessions SET score = ? WHERE id = ?";
        return jdbcTemplate.update(sql, score, id);
    }

    // Find all study sessions by user ID with folder names - UPDATED
    public List<Map<String, Object>> findByUserIdWithFolderName(Integer userId) {
        String sql = """
            SELECT ss.id, ss.user_id, ss.folder_id, ss.score, ss.date, f.folder_name
            FROM study_sessions ss
            JOIN folders f ON ss.folder_id = f.id
            WHERE ss.user_id = ?
            ORDER BY ss.date DESC
        """;
        return jdbcTemplate.query(sql, studySessionWithFolderRowMapper, userId);
    }

    // OLD METHOD - Keep for backward compatibility
    public List<StudySession> findByUserId(Integer userId) {
        String sql = "SELECT * FROM study_sessions WHERE user_id = ? ORDER BY date DESC";
        return jdbcTemplate.query(sql, studySessionRowMapper, userId);
    }

    // Find all study sessions by folder ID
    public List<StudySession> findByFolderId(Integer folderId) {
        String sql = "SELECT * FROM study_sessions WHERE folder_id = ? ORDER BY date DESC";
        return jdbcTemplate.query(sql, studySessionRowMapper, folderId);
    }

    // Get all study sessions
    public List<StudySession> findAll() {
        String sql = "SELECT * FROM study_sessions ORDER BY date DESC";
        return jdbcTemplate.query(sql, studySessionRowMapper);
    }

    // Delete study session by ID
    public int deleteStudySession(Integer id) {
        String sql = "DELETE FROM study_sessions WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    // Count study sessions by user ID
    public int countByUserId(Integer userId) {
        String sql = "SELECT COUNT(*) FROM study_sessions WHERE user_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
        return count != null ? count : 0;
    }

    // Count study sessions by folder ID
    public int countByFolderId(Integer folderId) {
        String sql = "SELECT COUNT(*) FROM study_sessions WHERE folder_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, folderId);
        return count != null ? count : 0;
    }
}