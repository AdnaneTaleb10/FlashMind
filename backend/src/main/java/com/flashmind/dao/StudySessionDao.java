package com.flashmind.dao;

import com.flashmind.model.StudySession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class StudySessionDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // RowMapper to convert ResultSet to StudySession object
    private final RowMapper<StudySession> studySessionRowMapper = new RowMapper<StudySession>() {
        @Override
        public StudySession mapRow(ResultSet rs, int rowNum) throws SQLException {
            StudySession session = new StudySession();
            session.setId(rs.getInt("id"));
            session.setUserId(rs.getInt("user_id"));
            session.setFolderId(rs.getInt("folder_id"));
            session.setDate(rs.getTimestamp("date").toLocalDateTime());
            return session;
        }
    };

    // Create a new study session
    public int createStudySession(StudySession studySession) {
        String sql = "INSERT INTO study_sessions (user_id, folder_id, date) VALUES (?, ?, now())";
        return jdbcTemplate.update(sql, studySession.getUserId(), studySession.getFolderId());
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

    // Find all study sessions by user ID
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