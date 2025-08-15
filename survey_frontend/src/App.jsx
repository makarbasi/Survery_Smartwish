import React from 'react';
import { Link } from 'react-router-dom';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo-section">
            <h1>SmartWish</h1>
            <p className="tagline">Store Partnership Survey Portal</p>
          </div>
        </header>

        <main className="main-content">
          <div className="welcome-card">
            <h2>Welcome to SmartWish Partnership Portal</h2>
            <p>
              SmartWish is revolutionizing digital greeting cards and we're looking for 
              retail partners to join our growing network.
            </p>
            
            <div className="action-buttons">
              <Link to="/interest" className="btn btn-primary">
                📝 Express Interest
              </Link>
              <Link to="/admin" className="btn btn-secondary">
                📊 Admin Dashboard
              </Link>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <h3>🚀 Partnership Benefits</h3>
                <ul>
                  <li>High-margin digital products</li>
                  <li>Exclusive territory rights</li>
                  <li>Marketing support</li>
                  <li>Training provided</li>
                </ul>
              </div>
              
              <div className="info-item">
                <h3>📋 How It Works</h3>
                <ol>
                  <li>Submit your interest</li>
                  <li>We review your application</li>
                  <li>Partnership discussion</li>
                  <li>Setup and training</li>
                </ol>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2025 SmartWish. All rights reserved.</p>
          <p>Contact: <a href="mailto:partnerships@smartwish.com">partnerships@smartwish.com</a></p>
        </footer>
      </div>
    </div>
  );
}

export default App;
