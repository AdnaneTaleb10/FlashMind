package com.flashmind.dao;

import com.flashmind.model.StudySessionDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
public class StudySessionDetailDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // RowMapper to convert ResultSet to StudySessionDetail object
    private final RowMapper<StudySessionDetail> detailRowMapper = new RowMapper<StudySessionDetail>() {
        @Override
        public StudySessionDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
            StudySessionDetail detail = new StudySessionDetail();
            detail.setId(rs.getInt("id"));
            detail.setSessionId(rs.getInt("session_id"));
            detail.setFlashcardId(rs.getInt("flashcard_id"));
            detail.setIsCorrect(rs.getBoolean("is_correct"));
            detail.setAnsweredAt(rs.getTimestamp("answered_at").toLocalDateTime());
            return detail;
        }
    };

    // Create a new study session detail - Returns the detail with generated ID
    public StudySessionDetail createDetail(StudySessionDetail detail) {
        String sql = "INSERT INTO study_session_details (session_id, flashcard_id, is_correct, answered_at) VALUES (?, ?, ?, now())";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
            ps.setInt(1, detail.getSessionId());
            ps.setInt(2, detail.getFlashcardId());
            ps.setBoolean(3, detail.getIsCorrect());
            return ps;
        }, keyHolder);

        Integer generatedId = keyHolder.getKey().intValue();

        return findById(generatedId).orElseThrow(() ->
                new RuntimeException("Failed to retrieve created study session detail"));
    }

    // Find study session detail by ID
    public Optional<StudySessionDetail> findById(Integer id) {
        String sql = "SELECT * FROM study_session_details WHERE id = ?";
        try {
            StudySessionDetail detail = jdbcTemplate.queryForObject(sql, detailRowMapper, id);
            return Optional.ofNullable(detail);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    // Find all details by session ID
    public List<StudySessionDetail> findBySessionId(Integer sessionId) {
        String sql = "SELECT * FROM study_session_details WHERE session_id = ? ORDER BY answered_at";
        return jdbcTemplate.query(sql, detailRowMapper, sessionId);
    }

    // Get all study session details
    public List<StudySessionDetail> findAll() {
        String sql = "SELECT * FROM study_session_details ORDER BY answered_at DESC";
        return jdbcTemplate.query(sql, detailRowMapper);
    }

    // Delete study session detail by ID
    public int deleteDetail(Integer id) {
        String sql = "DELETE FROM study_session_details WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    // Delete all details for a session
    public int deleteBySessionId(Integer sessionId) {
        String sql = "DELETE FROM study_session_details WHERE session_id = ?";
        return jdbcTemplate.update(sql, sessionId);
    }

    // Count correct answers in a session
    public int countCorrectBySessionId(Integer sessionId) {
        String sql = "SELECT COUNT(*) FROM study_session_details WHERE session_id = ? AND is_correct = true";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, sessionId);
        return count != null ? count : 0;
    }

    // Count total answers in a session
    public int countBySessionId(Integer sessionId) {
        String sql = "SELECT COUNT(*) FROM study_session_details WHERE session_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, sessionId);
        return count != null ? count : 0;
    }
}