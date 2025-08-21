import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple authentication check
    if (credentials.username === 'admin' && credentials.password === 'SmartwishAdmin2@') {
      // Store authentication state
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('adminLoginTime', new Date().toISOString());
      
      // Redirect to admin dashboard
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 Admin Login</h1>
          <p>SmartWish Survey Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder="Enter username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? '🔒 Logging in...' : '🔑 Login'}
          </button>
        </form>

        <div className="login-footer">
          <a href="/" className="back-link">← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
