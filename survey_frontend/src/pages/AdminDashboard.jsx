import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoreInterests, getStats, uploadImages } from '../services/api';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [interests, setInterests] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadingId, setUploadingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [interestsData, statsData] = await Promise.all([
        getStoreInterests(),
        getStats()
      ]);
      setInterests(interestsData);
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = async (interestId, files) => {
    if (!files || files.length === 0) return;
    
    setUploadingId(interestId);
    try {
      await uploadImages(interestId, files);
      await fetchData(); // Refresh data
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploadingId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error-message">{error}</div>
        <button onClick={fetchData} className="btn btn-primary">Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <div>
            <h1>SmartWish Admin Dashboard</h1>
            <p>Store Partnership Management</p>
          </div>
          <div className="header-actions">
            <Link to="/" className="btn btn-secondary">← Home</Link>
            <Link to="/interest" className="btn btn-primary">+ New Submission</Link>
          </div>
        </div>
      </header>

      {/* Statistics */}
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.totalInterests}</div>
            <div className="stat-label">Total Submissions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalImages}</div>
            <div className="stat-label">Images Uploaded</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.recentSubmissions?.length || 0}</div>
            <div className="stat-label">Recent (Last 5)</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{Math.round((stats.totalImages / Math.max(stats.totalInterests, 1)) * 10) / 10}</div>
            <div className="stat-label">Avg Images/Store</div>
          </div>
        </div>
      )}

      {/* Store Interests */}
      <div className="interests-section">
        <h2>Store Interest Submissions ({interests.length})</h2>
        
        {interests.length === 0 ? (
          <div className="empty-state">
            <p>No store interests submitted yet.</p>
            <Link to="/interest" className="btn btn-primary">Submit First Interest</Link>
          </div>
        ) : (
          <div className="interests-grid">
            {interests.map((interest) => (
              <div key={interest.id} className="interest-card">
                <div className="interest-header">
                  <h3>{interest.storeName}</h3>
                  <span className="interest-date">{formatDate(interest.createdAt)}</span>
                </div>
                
                <div className="interest-details">
                  <div className="detail-group">
                    <strong>Address:</strong>
                    <p>{interest.storeAddress}</p>
                  </div>
                  
                  <div className="detail-group">
                    <strong>Contact:</strong>
                    <p>{interest.contactName}</p>
                    {interest.contactEmail && <p>📧 {interest.contactEmail}</p>}
                    {interest.contactPhone && <p>📞 {interest.contactPhone}</p>}
                  </div>
                </div>

                {/* Images Section */}
                <div className="images-section">
                  <div className="images-header">
                    <strong>Images ({interest.images?.length || 0})</strong>
                    <label className="upload-btn">
                      {uploadingId === interest.id ? (
                        <span className="uploading">Uploading...</span>
                      ) : (
                        <span>📁 Upload Images</span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleUpload(interest.id, e.target.files)}
                        disabled={uploadingId === interest.id}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  
                  {interest.images && interest.images.length > 0 && (
                    <div className="images-grid">
                      {interest.images.map((img) => {
                        console.log('🔍 Rendering image:', {
                          id: img.id,
                          url: img.imageUrl,
                          originalName: img.originalName
                        });
                        return (
                          <div key={img.id} className="image-item">
                            <img
                              src={img.imageUrl}
                              alt={img.originalName || 'Store image'}
                              className="store-image"
                              onError={(e) => {
                                console.error('❌ Image failed to load:', img.imageUrl);
                                e.target.style.display = 'none';
                              }}
                              onLoad={() => {
                                console.log('✅ Image loaded successfully:', img.imageUrl);
                              }}
                            />
                            <p className="image-name">{img.originalName}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Letter Preview */}
                {interest.letterText && (
                  <details className="letter-preview">
                    <summary>📄 View Generated Letter</summary>
                    <pre className="letter-text">{interest.letterText}</pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
