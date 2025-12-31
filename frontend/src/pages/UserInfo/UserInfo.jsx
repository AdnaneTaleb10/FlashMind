import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './UserInfo.css';

function UserInfo() {
  const navigate = useNavigate();
  const {
    userInfo,
    fetchUserProfile,
    updateProfile,
    updatePassword
  } = useApp();

  const [isLoading, setIsLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      await fetchUserProfile();
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (field) => {
    setEditingField(field);
    if (field === 'password') {
      setCurrentPassword('');
      setNewPassword('');
    } else {
      setEditValue(userInfo[field]);
    }
  };

  const handleSave = async (field) => {
    console.log('handleSave called with field:', field);
    console.log('Current password:', currentPassword);
    console.log('New password:', newPassword);

    try {
      if (field === 'password') {
        console.log('Calling updatePassword...');
        await updatePassword(currentPassword, newPassword);
        console.log('Password updated successfully');

        // Clear fields and close edit mode on success
        setEditingField(null);
        setCurrentPassword('');
        setNewPassword('');
      } else if (field === 'username' || field === 'name') {
        const newName = field === 'name' ? editValue : userInfo.name;
        const newUsername = field === 'username' ? editValue : userInfo.username;
        await updateProfile(newName, newUsername);

        // Clear fields and close edit mode on success
        setEditingField(null);
        setEditValue('');
      }
    } catch (error) {
      // Error handling is done in AppContext, but keep fields open so user can retry
      console.error('Error updating user info:', error);
      // Don't close edit mode on error, let user fix the issue
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setCurrentPassword('');
    setNewPassword('');
  };

  if (isLoading) {
    return (
        <div className="user-info-container">
          <div className="content-wrapper">
            <p>Loading user information...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="user-info-container">
        <div className="content-wrapper">
          <div className="user-info-card">
            <div className="title-with-icon">
            <span className="simple-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="28" height="28">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
              </svg>
            </span>
              <h2 className="card-title">User Information</h2>
            </div>

            <div className="info-section">
              {/* Username */}
              <div className="info-row">
                <div className="info-label">Username:</div>
                <div className="info-content">
                  {editingField === 'username' ? (
                      <div className="edit-mode">
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="edit-input"
                            autoFocus
                        />
                        <div className="edit-buttons">
                          <button onClick={() => handleSave('username')} className="save-btn">
                            Save
                          </button>
                          <button onClick={handleCancel} className="cancel-btn">
                            Cancel
                          </button>
                        </div>
                      </div>
                  ) : (
                      <>
                        <span className="info-value">{userInfo.username}</span>
                        <button onClick={() => handleEditClick('username')} className="change-btn">
                          Change
                        </button>
                      </>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="info-row">
                <div className="info-label">Name:</div>
                <div className="info-content">
                  {editingField === 'name' ? (
                      <div className="edit-mode">
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="edit-input"
                            autoFocus
                        />
                        <div className="edit-buttons">
                          <button onClick={() => handleSave('name')} className="save-btn">
                            Save
                          </button>
                          <button onClick={handleCancel} className="cancel-btn">
                            Cancel
                          </button>
                        </div>
                      </div>
                  ) : (
                      <>
                        <span className="info-value">{userInfo.name}</span>
                        <button onClick={() => handleEditClick('name')} className="change-btn">
                          Change
                        </button>
                      </>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="info-row email-row">
                <div className="info-label">Email:</div>
                <div className="info-content">
                  <span className="info-value email-field">{userInfo.email}</span>
                </div>
              </div>

              {/* Password */}
              <div className="info-row">
                <div className="info-label">Password:</div>
                <div className="info-content">
                  {editingField === 'password' ? (
                      <div className="edit-mode">
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Current password"
                            className="edit-input"
                            autoFocus
                        />
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                            className="edit-input"
                            style={{ marginTop: '8px' }}
                        />
                        <div className="edit-buttons">
                          <button onClick={() => handleSave('password')} className="save-btn">
                            Save
                          </button>
                          <button onClick={handleCancel} className="cancel-btn">
                            Cancel
                          </button>
                        </div>
                      </div>
                  ) : (
                      <>
                        <span className="info-value">{userInfo.password}</span>
                        <button onClick={() => handleEditClick('password')} className="change-btn">
                          Change
                        </button>
                      </>
                  )}
                </div>
              </div>
            </div>

            <div className="back-button-container">
              <button onClick={() => navigate('/app')} className="btn btn-primary">
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default UserInfo;