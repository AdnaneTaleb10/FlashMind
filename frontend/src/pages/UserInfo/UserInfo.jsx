import React, { useState } from 'react';
import '../UserInfo/UserInfo.css';

function UserInfo() {
  const [userInfo, setUserInfo] = useState({
    username: 'se_2025',
    name: 'seProject',
    email: 'seProject@gmail.com',
    password: '********'
  });

  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEditClick = (field) => {
    setEditingField(field);
    setEditValue(userInfo[field]);
  };

  const handleSave = (field) => {
    setUserInfo({ ...userInfo, [field]: editValue });
    setEditingField(null);
  };

  const handleCancel = () => setEditingField(null);

  return (
    <div className="user-info-container">
      <div className="blue-header">
        <h1 className="flash-mind-title">FLASH MIND</h1>
        <span className="white-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="28" height="28">
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
          </svg>
        </span>
      </div>

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
            {/* username */}
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
                      <button onClick={() => handleSave('username')} className="save-btn">Save</button>
                      <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="info-value">{userInfo.username}</span>
                    <button onClick={() => handleEditClick('username')} className="change-btn">Change</button>
                  </>
                )}
              </div>
            </div>

            {/* name */}
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
                      <button onClick={() => handleSave('name')} className="save-btn">Save</button>
                      <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="info-value">{userInfo.name}</span>
                    <button onClick={() => handleEditClick('name')} className="change-btn">Change</button>
                  </>
                )}
              </div>
            </div>

            {/* email */}
            <div className="info-row email-row">
              <div className="info-label">Email:</div>
              <div className="info-content">
                {editingField === 'email' ? (
                  <div className="edit-mode">
                    <input
                      type="email"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="edit-input email-input"
                      autoFocus
                    />
                    <div className="edit-buttons">
                      <button onClick={() => handleSave('email')} className="save-btn">Save</button>
                      <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <span className="info-value email-field">{userInfo.email}</span>
                )}
              </div>
            </div>

            {/* password */}
            <div className="info-row">
              <div className="info-label">Password:</div>
              <div className="info-content">
                {editingField === 'password' ? (
                  <div className="edit-mode">
                    <input
                      type="password"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="edit-input"
                      autoFocus
                    />
                    <div className="edit-buttons">
                      <button onClick={() => handleSave('password')} className="save-btn">Save</button>
                      <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="info-value">{userInfo.password}</span>
                    <button onClick={() => handleEditClick('password')} className="change-btn">Change</button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
