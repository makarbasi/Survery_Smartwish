import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { submitStoreInterest } from '../services/api';
import '../styles/StoreInterest.css';

const StoreInterest = () => {
  const location = useLocation();
  
  // Debug logging
  useEffect(() => {
    console.log('🚀 StoreInterest Component Mounted:', {
      pathname: location.pathname,
      component: 'StoreInterest',
      timestamp: new Date().toISOString(),
      environment: {
        apiUrl: import.meta.env.VITE_API_URL,
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
        hasSupabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
      }
    });
    
    return () => {
      console.log('🔴 StoreInterest Component Unmounted');
    };
  }, [location.pathname]);
  const [form, setForm] = useState({
    storeName: '',
    storeAddress: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      const data = await submitStoreInterest(form);
      setSubmitted(data);
    } catch (err) {
      setError(err.message || 'Failed to submit interest');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="store-interest-container">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>You're in the Queue! 🎉</h2>
          <p>
            Great! You've successfully joined the SmartWish demo queue. We'll reach out when it's your turn 
            to schedule a personalized demo. No pressure - this is just to show you how SmartWish could work in your store!
          </p>
          
          <div className="submission-details">
            <h3>Submission Details:</h3>
            <div className="detail-row">
              <span className="label">Store:</span>
              <span className="value">{submitted.storeName}</span>
            </div>
            <div className="detail-row">
              <span className="label">Address:</span>
              <span className="value">{submitted.storeAddress}</span>
            </div>
            <div className="detail-row">
              <span className="label">Contact:</span>
              <span className="value">{submitted.contactName}</span>
            </div>
            {submitted.contactEmail && (
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{submitted.contactEmail}</span>
              </div>
            )}
            {submitted.contactPhone && (
              <div className="detail-row">
                <span className="label">Phone:</span>
                <span className="value">{submitted.contactPhone}</span>
              </div>
            )}
            <div className="detail-row">
              <span className="label">Submitted:</span>
              <span className="value">{new Date(submitted.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="actions">
            <Link to="/" className="btn btn-secondary">← Back to Home</Link>
            <button 
              onClick={() => {
                setSubmitted(null);
                setForm({
                  storeName: '',
                  storeAddress: '',
                  contactName: '',
                  contactEmail: '',
                  contactPhone: '',
                });
              }} 
              className="btn btn-primary"
            >
              Join Another Queue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="store-interest-container">
      {/* Enhanced Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="brand-text">
              <h1>SmartWish</h1>
              <p className="tagline">Revolutionizing Digital Connections</p>
            </div>
          </div>
          <div className="header-info">
            <h2>SmartWish Demo Queue</h2>
            <p>Get in line to see SmartWish in action!</p>
          </div>
        </div>
      </div>

      <div className="interest-card">
        {/* Introduction */}
        <div className="introduction">
          <div className="intro-header">
            <h3>Want to See SmartWish in Action? 🚀</h3>
            <p className="intro-subtitle">Join the queue for a personalized demo - no commitment required!</p>
          </div>
          
          <div className="partnership-overview">
            <h4>About Our Partnership Program</h4>
            <p>
              SmartWish is seeking established retail partners to distribute our innovative digital greeting 
              card technology platform. Our solution enables customers to create, customize, and share 
              personalized digital cards that enhance meaningful connections across the globe.
            </p>
            
            <div className="value-proposition">
              <h5>Partnership Benefits Include:</h5>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <span className="benefit-icon">💼</span>
                  <div>
                    <strong>Exclusive Territory Rights</strong>
                    <p>Protected market area for your location</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">📈</span>
                  <div>
                    <strong>High-Margin Revenue</strong>
                    <p>Attractive profit margins on digital products</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🎯</span>
                  <div>
                    <strong>Marketing Support</strong>
                    <p>Comprehensive promotional materials and training</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">⚡</span>
                  <div>
                    <strong>Quick Setup</strong>
                    <p>Minimal infrastructure requirements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="interest-form">
          <div className="form-header">
            <h3>Get in Line for a SmartWish Demo! 🎯</h3>
            <p>Join the queue to see SmartWish in action! This is just to express interest - no commitment required. We'll reach out to schedule a personalized demo when it's your turn.</p>
            <div className="no-obligation-notice">
              <strong>💡 No Pressure, No Obligation!</strong> You're just getting in line to see how SmartWish could work in your store.
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="storeName">Store Name *</label>
            <input
              id="storeName"
              name="storeName"
              type="text"
              value={form.storeName}
              onChange={handleChange}
              required
              placeholder="Enter your store name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="storeAddress">Store Address *</label>
            <textarea
              id="storeAddress"
              name="storeAddress"
              value={form.storeAddress}
              onChange={handleChange}
              required
              placeholder="Enter your complete store address"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactName">Your Name *</label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              value={form.contactName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactEmail">
                Email Address 
                <span className="optional-indicator">(Optional)</span>
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="your@email.com"
              />
              <small className="field-help">We'll use this to reach out when it's your turn for a demo</small>
            </div>

            <div className="form-group">
              <label htmlFor="contactPhone">
                Phone Number 
                <span className="optional-indicator">(Optional)</span>
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                value={form.contactPhone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
              <small className="field-help">For scheduling your demo and answering questions</small>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={submitting} className="submit-button">
            {submitting ? (
              <>
                <span className="spinner"></span>
                Getting in line...
              </>
            ) : (
              'Join the Demo Queue! 🚀'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="footer">
          <p>
            <strong>Questions?</strong> Contact us at{' '}
            <a href="mailto:info@smartwish.us">info@smartwish.us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreInterest;
