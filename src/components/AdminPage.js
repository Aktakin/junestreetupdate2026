import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getBarbers, 
  addBarber, 
  updateBarber, 
  deleteBarber, 
  toggleBarberVisibility,
  uploadBarberProfileImage,
  getBarberWorkImages,
  uploadBarberWorkImage,
  deleteBarberWorkImage,
  getBarberDisplayImage,
  signIn,
  signOut,
  getSession 
} from '../lib/supabase';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [barbers, setBarbers] = useState([]);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [editingBarber, setEditingBarber] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBarberProfileFile, setNewBarberProfileFile] = useState(null);
  const [editingProfileFile, setEditingProfileFile] = useState(null);
  const [galleryBarber, setGalleryBarber] = useState(null);
  const [workImages, setWorkImages] = useState([]);
  const [workImageFile, setWorkImageFile] = useState(null);
  const [uploadingWork, setUploadingWork] = useState(false);
  const [newBarber, setNewBarber] = useState({
    name: '',
    booking_type: 'external',
    booking_link: '',
    phone: '',
    image: '/images/placeholder1.jpg',
    is_visible: true,
    display_order: 0
  });
  const [actionMessage, setActionMessage] = useState({ type: '', text: '' });

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Load barbers when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadBarbers();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    const { session } = await getSession();
    setIsAuthenticated(!!session);
    setIsLoading(false);
  };

  const loadBarbers = async () => {
    const data = await getBarbers(true); // Include hidden barbers
    setBarbers(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    const { error } = await signIn(loginForm.email, loginForm.password);
    
    if (error) {
      setLoginError(error.message);
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setIsAuthenticated(false);
    setBarbers([]);
  };

  const showMessage = (type, text) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage({ type: '', text: '' }), 3000);
  };

  const handleAddBarber = async (e) => {
    e.preventDefault();
    
    const barberData = {
      ...newBarber,
      image: '/images/placeholder1.jpg',
      booking_link: newBarber.booking_type === 'external' ? newBarber.booking_link : null,
      phone: newBarber.booking_type === 'internal' ? newBarber.phone : null,
      display_order: barbers.length + 1
    };

    const { data, error } = await addBarber(barberData);
    
    if (error) {
      showMessage('error', 'Failed to add barber: ' + error.message);
    } else {
      if (newBarberProfileFile && data?.id) {
        const { url, error: uploadErr } = await uploadBarberProfileImage(data.id, newBarberProfileFile);
        if (!uploadErr && url) {
          await updateBarber(data.id, { image: url });
        }
      }
      showMessage('success', `${newBarber.name} added successfully!`);
      setShowAddForm(false);
      setNewBarberProfileFile(null);
      setNewBarber({
        name: '',
        booking_type: 'external',
        booking_link: '',
        phone: '',
        image: '/images/placeholder1.jpg',
        is_visible: true,
        display_order: 0
      });
      loadBarbers();
    }
  };

  const handleUpdateBarber = async (e) => {
    e.preventDefault();
    let imageUrl = editingBarber.image;
    if (editingProfileFile) {
      const { url, error: uploadErr } = await uploadBarberProfileImage(editingBarber.id, editingProfileFile);
      if (!uploadErr && url) imageUrl = url;
    }
    const updates = {
      name: editingBarber.name,
      booking_type: editingBarber.booking_type,
      booking_link: editingBarber.booking_type === 'external' ? editingBarber.booking_link : null,
      phone: editingBarber.booking_type === 'internal' ? editingBarber.phone : null,
      image: imageUrl
    };

    const { error } = await updateBarber(editingBarber.id, updates);
    
    if (error) {
      showMessage('error', 'Failed to update barber: ' + error.message);
    } else {
      showMessage('success', `${editingBarber.name} updated successfully!`);
      setEditingBarber(null);
      setEditingProfileFile(null);
      loadBarbers();
    }
  };

  const handleDeleteBarber = async (barber) => {
    if (!window.confirm(`Are you sure you want to delete ${barber.name}? This cannot be undone.`)) {
      return;
    }

    const { error } = await deleteBarber(barber.id);
    
    if (error) {
      showMessage('error', 'Failed to delete barber: ' + error.message);
    } else {
      showMessage('success', `${barber.name} deleted successfully!`);
      loadBarbers();
    }
  };

  const handleToggleVisibility = async (barber) => {
    const { error } = await toggleBarberVisibility(barber.id, !barber.is_visible);
    
    if (error) {
      showMessage('error', 'Failed to update visibility: ' + error.message);
    } else {
      showMessage('success', `${barber.name} is now ${!barber.is_visible ? 'visible' : 'hidden'}`);
      loadBarbers();
    }
  };

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <div className="login-card">
            <div className="login-header">
              <h1>JuneStreet Admin</h1>
              <p>Sign in to manage barbers</p>
            </div>
            
            {loginError && (
              <div className="login-error">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                  placeholder="admin@example.com"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="login-btn">
                Sign In
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>

            <button className="back-to-site" onClick={() => navigate('/')}>
              ← Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="admin-page">
      <div className="admin-dashboard">
        {/* Header */}
        <header className="admin-header">
          <div className="header-left">
            <h1>JuneStreet Admin</h1>
            <span className="header-subtitle">Barber Management</span>
          </div>
          <div className="header-right">
            <button className="view-site-btn" onClick={() => navigate('/')}>
              View Site
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </header>

        {/* Action Message */}
        {actionMessage.text && (
          <div className={`action-message ${actionMessage.type}`}>
            {actionMessage.type === 'success' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            )}
            {actionMessage.text}
          </div>
        )}

        {/* Main Content */}
        <main className="admin-content">
          {/* Stats */}
          <div className="admin-stats">
            <div className="stat-card">
              <span className="stat-number">{barbers.length}</span>
              <span className="stat-label">Total Barbers</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{barbers.filter(b => b.is_visible).length}</span>
              <span className="stat-label">Visible</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{barbers.filter(b => !b.is_visible).length}</span>
              <span className="stat-label">Hidden</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{barbers.filter(b => b.booking_type === 'external').length}</span>
              <span className="stat-label">External Booking</span>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="actions-bar">
            <h2>Manage Barbers</h2>
            <button 
              className="add-barber-btn"
              onClick={() => setShowAddForm(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Barber
            </button>
          </div>

          {/* Barbers List */}
          <div className="barbers-list">
            {barbers.map((barber) => (
              <div 
                key={barber.id} 
                className={`barber-item ${!barber.is_visible ? 'hidden-barber' : ''}`}
              >
                <div className="barber-avatar">
                  <img src={getBarberDisplayImage(barber)} alt={barber.name} />
                  {!barber.is_visible && (
                    <span className="hidden-badge">Hidden</span>
                  )}
                </div>
                <div className="barber-details">
                  <h3>{barber.name}</h3>
                  <span className={`booking-type ${barber.booking_type}`}>
                    {barber.booking_type === 'external' ? 'External Link' : 'Phone Booking'}
                  </span>
                  <p className="booking-info">
                    {barber.booking_type === 'external' 
                      ? barber.booking_link 
                      : barber.phone}
                  </p>
                </div>
                <div className="barber-actions">
                  <button 
                    className="action-btn gallery"
                    onClick={async () => {
                      setGalleryBarber(barber);
                      const images = await getBarberWorkImages(barber.id);
                      setWorkImages(images || []);
                      setWorkImageFile(null);
                    }}
                    title="Work gallery"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </button>
                  <button 
                    className="action-btn edit"
                    onClick={() => { setEditingBarber(barber); setEditingProfileFile(null); }}
                    title="Edit"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button 
                    className={`action-btn visibility ${barber.is_visible ? 'visible' : 'hidden'}`}
                    onClick={() => handleToggleVisibility(barber)}
                    title={barber.is_visible ? 'Hide' : 'Show'}
                  >
                    {barber.is_visible ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    )}
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteBarber(barber)}
                    title="Delete"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                      <line x1="10" y1="11" x2="10" y2="17"/>
                      <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Add Barber Modal */}
        {showAddForm && (
          <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Add New Barber</h2>
                <button className="close-btn" onClick={() => setShowAddForm(false)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddBarber}>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={newBarber.name}
                    onChange={(e) => setNewBarber({ ...newBarber, name: e.target.value })}
                    required
                    placeholder="Barber name"
                  />
                </div>
                <div className="form-group">
                  <label>Booking Type *</label>
                  <select
                    value={newBarber.booking_type}
                    onChange={(e) => setNewBarber({ ...newBarber, booking_type: e.target.value })}
                  >
                    <option value="external">External Link (Booksy, etc.)</option>
                    <option value="internal">Phone Booking</option>
                  </select>
                </div>
                {newBarber.booking_type === 'external' ? (
                  <div className="form-group">
                    <label>Booking Link *</label>
                    <input
                      type="url"
                      value={newBarber.booking_link}
                      onChange={(e) => setNewBarber({ ...newBarber, booking_link: e.target.value })}
                      required
                      placeholder="https://booksy.com/..."
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={newBarber.phone}
                      onChange={(e) => setNewBarber({ ...newBarber, phone: e.target.value })}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                )}
                <div className="form-group">
                  <label>Profile photo (upload)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewBarberProfileFile(e.target.files?.[0] || null)}
                  />
                  {newBarberProfileFile && (
                    <span className="form-hint">Selected: {newBarberProfileFile.name}</span>
                  )}
                </div>
                <div className="form-group checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={newBarber.is_visible}
                      onChange={(e) => setNewBarber({ ...newBarber, is_visible: e.target.checked })}
                    />
                    Visible on website
                  </label>
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Add Barber
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Barber Modal */}
        {editingBarber && (
          <div className="modal-overlay" onClick={() => { setEditingBarber(null); setEditingProfileFile(null); }}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit {editingBarber.name}</h2>
                <button className="close-btn" onClick={() => { setEditingBarber(null); setEditingProfileFile(null); }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleUpdateBarber}>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={editingBarber.name}
                    onChange={(e) => setEditingBarber({ ...editingBarber, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Booking Type *</label>
                  <select
                    value={editingBarber.booking_type}
                    onChange={(e) => setEditingBarber({ ...editingBarber, booking_type: e.target.value })}
                  >
                    <option value="external">External Link (Booksy, etc.)</option>
                    <option value="internal">Phone Booking</option>
                  </select>
                </div>
                {editingBarber.booking_type === 'external' ? (
                  <div className="form-group">
                    <label>Booking Link *</label>
                    <input
                      type="url"
                      value={editingBarber.booking_link || ''}
                      onChange={(e) => setEditingBarber({ ...editingBarber, booking_link: e.target.value })}
                      required
                      placeholder="https://booksy.com/..."
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={editingBarber.phone || ''}
                      onChange={(e) => setEditingBarber({ ...editingBarber, phone: e.target.value })}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                )}
                <div className="form-group">
                  <label>Profile photo (upload new to replace)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditingProfileFile(e.target.files?.[0] || null)}
                  />
                  {editingProfileFile && (
                    <span className="form-hint">Selected: {editingProfileFile.name}</span>
                  )}
                  {editingBarber.image && !editingProfileFile && (
                    <span className="form-hint">Current image in use</span>
                  )}
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => { setEditingBarber(null); setEditingProfileFile(null); }}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Work gallery modal */}
        {galleryBarber && (
          <div className="modal-overlay" onClick={() => setGalleryBarber(null)}>
            <div className="modal gallery-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Work gallery – {galleryBarber.name}</h2>
                <button className="close-btn" onClick={() => setGalleryBarber(null)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div className="gallery-upload">
                <label className="gallery-upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setWorkImageFile(e.target.files?.[0] || null)}
                    style={{ display: 'none' }}
                  />
                  <span className="gallery-upload-btn">Choose image to upload</span>
                </label>
                {workImageFile && (
                  <button
                    type="button"
                    className="save-btn gallery-upload-submit"
                    disabled={uploadingWork}
                    onClick={async () => {
                      if (!workImageFile) return;
                      setUploadingWork(true);
                      const { error } = await uploadBarberWorkImage(galleryBarber.id, workImageFile);
                      setUploadingWork(false);
                      if (error) {
                        showMessage('error', 'Upload failed: ' + error.message);
                      } else {
                        showMessage('success', 'Image added to gallery.');
                        setWorkImageFile(null);
                        const images = await getBarberWorkImages(galleryBarber.id);
                        setWorkImages(images || []);
                      }
                    }}
                  >
                    {uploadingWork ? 'Uploading…' : 'Upload'}
                  </button>
                )}
              </div>
              <div className="gallery-work-list">
                {workImages.length === 0 ? (
                  <p className="gallery-empty">No work images yet. Upload above.</p>
                ) : (
                  workImages.map((img) => (
                    <div key={img.id} className="gallery-work-item">
                      <img src={img.image_url} alt="Work" />
                      <button
                        type="button"
                        className="action-btn delete gallery-delete"
                        title="Remove"
                        onClick={async () => {
                          await deleteBarberWorkImage(galleryBarber.id, img.id, img.file_path);
                          const images = await getBarberWorkImages(galleryBarber.id);
                          setWorkImages(images || []);
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

