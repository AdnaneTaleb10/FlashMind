import React, { useState } from 'react';
import "../../pages/SignUp/SignUp.css";
import photo from '../../assets/photo.png'

function Signup({ onSignup, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }
    setErrorMessage('');
    onSignup(formData);
  };

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

          {errorMessage && <div className="error-message-signup">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="signup-form-signup">
            <div className="input-group-signup">
              <input id="name" type="text" value={formData.name} onChange={handleChange} placeholder="Name" required />
            </div>
            <div className="input-group-signup">
              <input id="username" type="text" value={formData.username} onChange={handleChange} placeholder="User Name" required />
            </div>
            <div className="input-group-signup">
              <input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            </div>
            <div className="input-group-signup">
              <input id="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Password" required />
              <button type="button" className="eye-button-signup" onClick={() => setShowPassword(!showPassword)}>👁</button>
            </div>
            <div className="input-group-signup">
              <input id="confirmPassword" type={showConfirm ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
              <button type="button" className="eye-button-signup" onClick={() => setShowConfirm(!showConfirm)}>👁</button>
            </div>
            <button type="submit" className="signup-button-signup">Sign up</button>
          </form>

          <div className="form-footer-signup">
            <p className="footer-text-signup">Already have an account?</p>
            <button onClick={onSwitchToLogin} className="switch-button-signup">Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
