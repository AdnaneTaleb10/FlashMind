import React, { useState } from 'react';
import './LoginForm.css';
import { loginUser } from '../../services/authService';
import { toast } from 'sonner';
import {Eye , EyeOff} from "lucide-react";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!email || !password) {
      toast.error('Missing credentials', {
        description: 'Please enter both email and password.'
      });
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading('Logging you in...');

    try {
      // Call the API to login
      const response = await loginUser(email, password);

      console.log('Login successful:', response);

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      // Show success toast
      toast.success('Welcome back! 👋', {
        description: 'You have successfully logged in.',
        duration: 3000,
      });

      // Call parent component's onLogin function
      if (onLogin) {
        onLogin(response);
      }

      // Clear form
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Login error:', error);

      // Dismiss loading toast
      toast.dismiss(loadingToastId);

      // Handle different error types
      let errorMessage = 'Invalid email or password.';

      if (error.message) {
        errorMessage = error.message;
      }

      // Show error toast
      toast.error('Login Failed', {
        description: errorMessage,
        duration: 5000,
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="login-form-login">
        <div className="input-group-login">
          <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              disabled={isLoading}
          />
        </div>

        <div className="input-group-login">
          <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={isLoading}
          />
          <button
              type="button"
              className="eye-button-login"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
              disabled={isLoading}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <button
            type="submit"
            className="login-button-login"
            disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
  );
}

export default LoginForm;