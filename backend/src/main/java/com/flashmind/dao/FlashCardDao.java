package com.flashmind.dao;

import com.flashmind.model.FlashCard;
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
public class FlashCardDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // RowMapper to convert ResultSet to FlashCard object
    private final RowMapper<FlashCard> flashCardRowMapper = new RowMapper<FlashCard>() {
        @Override
        public FlashCard mapRow(ResultSet rs, int rowNum) throws SQLException {
            FlashCard card = new FlashCard();
            card.setId(rs.getInt("id"));
            card.setFolderId(rs.getInt("folder_id"));
            card.setFrontText(rs.getString("front_text"));
            card.setBackText(rs.getString("back_text"));
            card.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
            return card;
        }
    };

    // Create a new flash card
    public FlashCard createFlashCard(FlashCard flashCard) {
        String sql = "INSERT INTO flash_cards (folder_id, front_text, back_text, created_at) VALUES (?, ?, ?, now())";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"});
            ps.setInt(1, flashCard.getFolderId());
            ps.setString(2, flashCard.getFrontText());
            ps.setString(3, flashCard.getBackText());
            return ps;
        }, keyHolder);

        Integer generatedId = keyHolder.getKey().intValue();

        return findById(generatedId).orElseThrow(() ->
                new RuntimeException("Failed to retrieve created flashcard"));
    }
    // Find flash card by ID
    public Optional<FlashCard> findById(Integer id) {
        String sql = "SELECT * FROM flash_cards WHERE id = ?";
        try {
            FlashCard card = jdbcTemplate.queryForObject(sql, flashCardRowMapper, id);
            return Optional.ofNullable(card);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    // Find all flash cards by folder ID
    public List<FlashCard> findByFolderId(Integer folderId) {
        String sql = "SELECT * FROM flash_cards WHERE folder_id = ? ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, flashCardRowMapper, folderId);
    }

    // Get all flash cards
    public List<FlashCard> findAll() {
        String sql = "SELECT * FROM flash_cards ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, flashCardRowMapper);
    }

    // Update flash card
    public int updateFlashCard(FlashCard flashCard) {
        String sql = "UPDATE flash_cards SET front_text = ?, back_text = ? WHERE id = ?";
        return jdbcTemplate.update(sql, flashCard.getFrontText(), flashCard.getBackText(), flashCard.getId());
    }

    // Delete flash card by ID
    public int deleteFlashCard(Integer id) {
        String sql = "DELETE FROM flash_cards WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    // Delete all flash cards in a folder
    public int deleteByFolderId(Integer folderId) {
        String sql = "DELETE FROM flash_cards WHERE folder_id = ?";
        return jdbcTemplate.update(sql, folderId);
    }

    // Count flash cards in a folder
    public int countByFolderId(Integer folderId) {
        String sql = "SELECT COUNT(*) FROM flash_cards WHERE folder_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, folderId);
        return count != null ? count : 0;
    }
}