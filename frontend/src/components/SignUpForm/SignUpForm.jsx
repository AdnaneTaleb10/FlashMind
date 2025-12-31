import React, { useState } from 'react';
import './SignUpForm.css';
import { registerUser } from '../../services/authService';
import { toast } from 'sonner'; // Import toast
import {Eye , EyeOff} from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Frontend validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!", {
        description: 'Please make sure both passwords are the same.'
      });
      return;
    }

    // Password strength validation (optional)
    if (formData.password.length < 6) {
      toast.error("Password too short!", {
        description: 'Password must be at least 6 characters long.'
      });
      return;
    }

    // Set loading state
    setIsLoading(true);

    // Show loading toast
    const loadingToastId = toast.loading('Creating your account...');

    try {
      // Call the API to register user
      const response = await registerUser(formData);
      
      console.log('Registration successful:', response);
      
      // Dismiss loading toast
      toast.dismiss(loadingToastId);
      
      // Show success toast
      toast.success('Welcome to Flash Mind! 🎉', {
        description: 'Your account has been created successfully.',
        duration: 5000,
      });
      
      // Call parent component's onSignup function
      if (onSignup) {
        onSignup(response);
      }
      
      // Clear form
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Dismiss loading toast
      toast.dismiss(loadingToastId);
      
      // Handle different error types from backend
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.error) {
        errorMessage = error.error;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Show error toast
      toast.error('Registration Failed', {
        description: errorMessage,
        duration: 5000,
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form-signup">
      <div className="input-group-signup">
        <input 
          id="name" 
          type="text" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Name" 
          required 
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
        <button 
          type="button" 
          className="eye-button-signup" 
          onClick={() => setShowPassword(!showPassword)}
          aria-label="Toggle password visibility"
          disabled={isLoading}
        >
          {showPassword ? <EyeOff /> : <Eye />}
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
          disabled={isLoading}
        />
        <button 
          type="button" 
          className="eye-button-signup" 
          onClick={() => setShowConfirm(!showConfirm)}
          aria-label="Toggle confirm password visibility"
          disabled={isLoading}
        >
          {showConfirm ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <button 
        type="submit" 
        className="signup-button-signup"
        disabled={isLoading}
      >
        {isLoading ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  );
}

export default SignUpForm;