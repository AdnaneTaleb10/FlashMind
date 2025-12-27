import React from 'react';
import "./SignIn.css";
import photo from '../../assets/photo.png';
import LoginForm from '../../components/LoginForm/LoginForm';

function SignIn({ onLogin, hasError, onSwitchToSignup }) {
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

          <LoginForm onLogin={onLogin} hasError={hasError} />

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

export default SignIn;