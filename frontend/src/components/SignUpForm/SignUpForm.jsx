import React, { useState } from 'react';
import './SignUpForm.css';

function SignUpForm({ onSignup }) {
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
    <>
      {errorMessage && <div className="error-message-signup">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="signup-form-signup">
        <div className="input-group-signup">
          <input 
            id="name" 
            type="text" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Name" 
            required 
          />
        </div>

        <div className="input-group-signup">
          <input 
            id="username" 
            type="text" 
            value={formData.username} 
            onChange={handleChange} 
            placeholder="User Name" 
            required 
          />
        </div>

        <div className="input-group-signup">
          <input 
            id="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email" 
            required 
          />
        </div>

        <div className="input-group-signup">
          <input 
            id="password" 
            type={showPassword ? 'text' : 'password'} 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Password" 
            required 
          />
          <button 
            type="button" 
            className="eye-button-signup" 
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            👁
          </button>
        </div>

        <div className="input-group-signup">
          <input 
            id="confirmPassword" 
            type={showConfirm ? 'text' : 'password'} 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            placeholder="Confirm Password" 
            required 
          />
          <button 
            type="button" 
            className="eye-button-signup" 
            onClick={() => setShowConfirm(!showConfirm)}
            aria-label="Toggle confirm password visibility"
          >
            👁
          </button>
        </div>

        <button type="submit" className="signup-button-signup">
          Sign up
        </button>
      </form>
    </>
  );
}

export default SignUpForm;