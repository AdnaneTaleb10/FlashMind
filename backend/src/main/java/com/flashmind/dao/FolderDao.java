package com.flashmind.dao;

import com.flashmind.model.Folder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
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

    // Create a new folder
    public int createFolder(Folder folder) {
        String sql = "INSERT INTO folders (user_id, folder_name, created_at, total_cards) VALUES (?, ?, now(), 0)";
        return jdbcTemplate.update(sql, folder.getUserId(), folder.getFolderName());
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

    // Update folder
    public int updateFolder(Folder folder) {
        String sql = "UPDATE folders SET folder_name = ? WHERE id = ?";
        return jdbcTemplate.update(sql, folder.getFolderName(), folder.getId());
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