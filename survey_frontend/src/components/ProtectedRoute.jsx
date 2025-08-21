import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminLogin from '../pages/AdminLogin';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const authenticated = localStorage.getItem('adminAuthenticated') === 'true';
      const loginTime = localStorage.getItem('adminLoginTime');
      
      if (authenticated && loginTime) {
        // Check if login is still valid (24 hours)
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);
        
        if (hoursSinceLogin < 24) {
          setIsAuthenticated(true);
        } else {
          // Session expired, clear storage
          localStorage.removeItem('adminAuthenticated');
          localStorage.removeItem('adminLoginTime');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#667eea'
      }}>
        🔒 Checking authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Return the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
