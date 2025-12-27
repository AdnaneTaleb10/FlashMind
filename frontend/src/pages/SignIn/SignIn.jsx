import React from 'react';
import "./SignIn.css";
import photo from '../../assets/photo.png';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Login successful, user data:', response);

    // Store auth token if backend returns one
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }

    // Store user data if needed
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    // Redirect to dashboard after successful login
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  const handleSwitchToSignup = () => {
    navigate('/signup');
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

            <LoginForm onLogin={handleLoginSuccess} />

            <div className="form-footer-login">
              <p className="footer-text-login">Don't have an account?</p>
              <button
                  onClick={handleSwitchToSignup}
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