import React from 'react';
import "./SignUp.css";
import photo from '../../assets/photo.png';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

function SignUp({ onSignup, onSwitchToLogin }) {
  return (
    <div className="signup-container-signup">
      <div className="left-panel-signup">
        <div className="brand-header-signup">
          <h1 className="brand-title-signup">FLASH MIND</h1>
        </div>
        <div className="image-container-signup">
          <img src={photo} alt="Flash Mind" className="side-image-signup" />
        </div>
      </div>

      <div className="right-panel-signup">
        <div className="form-card-signup">
          <div className="form-header-signup">
            <h2 className="form-title-signup">SIGN UP</h2>
          </div>

          <SignUpForm onSignup={onSignup} />

          <div className="form-footer-signup">
            <p className="footer-text-signup">Already have an account?</p>
            <button 
              onClick={onSwitchToLogin} 
              className="switch-button-signup"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;