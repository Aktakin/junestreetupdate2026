import React, { useState } from 'react';
import './CareersPage.css';

const CareersPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    experience: '',
    licenseNumber: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    images: []
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newImages = Array.from(files).map(file => ({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
    }));
    setFormData({
      ...formData,
      images: [...formData.images, ...newImages]
    });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content-careers">
            <span className="page-label">Careers</span>
            <h1 className="page-title">Join the JuneStreet Team</h1>
            <p className="page-description">
              JuneStreet is built for barbers who take pride in their craft, respect the culture, and value community. We offer a professional, consistent environment where quality work is expected, relationships matter, and growth is encouraged. If you're disciplined, detail-oriented, and looking to be part of a shop that stands for something bigger than just cutting hair, JuneStreet is the place to build and elevate your career.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="application-section" id="apply">
        <div className="container">
          {isSubmitted ? (
            <div className="submission-success">
              <div className="success-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h2>Application Submitted!</h2>
              <p>Thank you for your interest in joining JuneStreet. We'll review your application and get back to you soon.</p>
              <button 
                className="btn-new-application"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    experience: '',
                    licenseNumber: '',
                    instagram: '',
                    facebook: '',
                    tiktok: '',
                    images: []
                  });
                }}
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <>
              <div className="application-header">
                <span className="section-label">Apply Now</span>
                <h2>Join Our Team</h2>
                <p>Fill out the form below and show us your best work</p>
              </div>
              <form className="application-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>Personal Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Your first name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Your last name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Professional Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="experience">Years of Experience *</label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select experience</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="licenseNumber">License Number *</label>
                      <input
                        type="text"
                        id="licenseNumber"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        required
                        placeholder="Your barber license number"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Social Media</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="instagram">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="https://instagram.com/yourusername"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="facebook">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                        </svg>
                        Facebook URL
                      </label>
                      <input
                        type="url"
                        id="facebook"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        placeholder="https://facebook.com/yourusername"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tiktok">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                        </svg>
                        TikTok URL
                      </label>
                      <input
                        type="url"
                        id="tiktok"
                        name="tiktok"
                        value={formData.tiktok}
                        onChange={handleChange}
                        placeholder="https://tiktok.com/@yourusername"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Your Best Work</h3>
                  <p className="section-description">Upload images showcasing your best haircuts and styles</p>
                  <div 
                    className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="images"
                      name="images"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <label htmlFor="images" className="file-label">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      <span>Drag & drop images here or click to browse</span>
                      <span className="file-hint">PNG, JPG up to 10MB each</span>
                    </label>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="uploaded-files">
                      {formData.images.map((image, index) => (
                        <div key={index} className="uploaded-file">
                          <div className="file-info">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                            <span className="file-name">{image.name}</span>
                            <span className="file-size">{image.size}</span>
                          </div>
                          <button 
                            type="button" 
                            className="remove-file"
                            onClick={() => removeImage(index)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"/>
                              <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" className="submit-button">
                  Submit Application
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CareersPage;

