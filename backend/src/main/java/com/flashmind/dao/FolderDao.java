package com.flashmind.dao;

import com.flashmind.model.Folder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

@Repository
public class FolderDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // RowMapper to convert ResultSet to Folder object
    private final RowMapper<Folder> folderRowMapper = new RowMapper<Folder>() {
        @Override
        public Folder mapRow(ResultSet rs, int rowNum) throws SQLException {
            Folder folder = new Folder();
            folder.setId(rs.getInt("id"));
            folder.setUserId(rs.getInt("user_id"));
            folder.setFolderName(rs.getString("folder_name"));
            folder.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
            folder.setTotalCards(rs.getInt("total_cards"));
            return folder;
        }
    };

    // Create a new folder - NOW RETURNS THE FOLDER WITH GENERATED ID
// Create a new folder - Returns the folder with generated ID
    public Folder createFolder(Folder folder) {
        String sql = "INSERT INTO folders (user_id, folder_name, created_at, total_cards) VALUES (?, ?, now(), 0)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, new String[]{"id"}); // ✅ Only return "id" column
            ps.setInt(1, folder.getUserId());
            ps.setString(2, folder.getFolderName());
            return ps;
        }, keyHolder);

        // Get the generated ID
        Integer generatedId = keyHolder.getKey().intValue();

        // Fetch and return the complete folder with all fields (including createdAt)
        return findById(generatedId).orElseThrow(() ->
                new RuntimeException("Failed to retrieve created folder"));
    }

    // Find folder by ID
    public Optional<Folder> findById(Integer id) {
        String sql = "SELECT * FROM folders WHERE id = ?";
        try {
            Folder folder = jdbcTemplate.queryForObject(sql, folderRowMapper, id);
            return Optional.ofNullable(folder);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    // Find all folders by user ID
    public List<Folder> findByUserId(Integer userId) {
        String sql = "SELECT * FROM folders WHERE user_id = ? ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, folderRowMapper, userId);
    }

    // Get all folders
    public List<Folder> findAll() {
        String sql = "SELECT * FROM folders ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, folderRowMapper);
    }

    // Update folder - NOW RETURNS THE UPDATED FOLDER
    public Folder updateFolder(Folder folder) {
        String sql = "UPDATE folders SET folder_name = ? WHERE id = ?";
        jdbcTemplate.update(sql, folder.getFolderName(), folder.getId());

        // Return the updated folder
        return findById(folder.getId()).orElseThrow(() ->
                new RuntimeException("Failed to retrieve updated folder"));
    }

    // Delete folder by ID
    public int deleteFolder(Integer id) {
        String sql = "DELETE FROM folders WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    // Update total cards count for a folder
    public int updateTotalCards(Integer folderId) {
        String sql = "UPDATE folders SET total_cards = (SELECT COUNT(*) FROM flash_cards WHERE folder_id = ?) WHERE id = ?";
        return jdbcTemplate.update(sql, folderId, folderId);
    }

    // Get total number of folders for a user
    public int countByUserId(Integer userId) {
        String sql = "SELECT COUNT(*) FROM folders WHERE user_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
        return count != null ? count : 0;
    }
}