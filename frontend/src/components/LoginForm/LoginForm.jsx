import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onLogin, hasError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <>
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
    </>
  );
}

export default LoginForm;