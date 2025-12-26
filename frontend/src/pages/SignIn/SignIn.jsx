import React, { useState } from 'react';
import "../../pages/SignIn/SignIn.css";
import photo from '../../assets/photo.png';

function SingIn({ onLogin, hasError, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="login-container-login">
      <div className="left-panel-login">
        <div className="brand-header-login">
          <h1 className="brand-title-login">FLASH MIND</h1>
        </div>
        <div className="image-container-login">
          <img src={photo} alt="Flash Mind" className="side-image-login" />
        </div>
      </div>

      <div className="right-panel-login">
        <div className="form-card-login">
          <div className="form-header-login">
            <h2 className="form-title-login">Log In</h2>
          </div>

          {hasError && (
            <div className="error-message-login">
              DebugConfigSmall.com
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form-login">
            <div className={`input-group-login ${hasError ? 'error-login' : ''}`}>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>

            <div className={`input-group-login ${hasError ? 'error-login' : ''}`}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button 
                type="button"
                className="eye-button-login"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                👁
              </button>
            </div>

            <button type="submit" className="login-button-login">
              Login
            </button>
          </form>

          <div className="form-footer-login">
            <p className="footer-text-login">Don't have an account?</p>
            <button 
              onClick={onSwitchToSignup}
              className="switch-button-login"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingIn;
