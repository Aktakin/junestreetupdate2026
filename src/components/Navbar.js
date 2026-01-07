import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/bookings', label: 'Book' },
    { path: '/contact', label: 'Contact' },
    { path: '/careers', label: 'Careers' }
  ];

  const handleNavClick = useCallback((path) => {
    setIsMenuOpen(false);
    // Small delay to allow menu close animation
    setTimeout(() => {
      navigate(path);
    }, 100);
  }, [navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavClick('/')}>
          <div className="logo-wrapper">
            <img src="/images/logo.png" alt="JuneStreet Barbershop" className="logo-image" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              <span className="nav-item-text">{item.label}</span>
              <span className="nav-item-underline"></span>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="navbar-cta">
          <button 
            className="nav-cta-button"
            onClick={() => handleNavClick('/bookings')}
          >
            <span>Book Now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="mobile-logo" onClick={() => handleNavClick('/')}>
              <img src="/images/logo.png" alt="JuneStreet Barbershop" className="mobile-logo-image" />
            </div>
            <button className="mobile-close" onClick={closeMenu} aria-label="Close menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div className="mobile-nav-items">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`mobile-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => handleNavClick(item.path)}
              >
                <span className="mobile-nav-text">{item.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            ))}
          </div>

          <div className="mobile-menu-footer">
            <button 
              className="mobile-cta-button"
              onClick={() => handleNavClick('/bookings')}
            >
              <span>Book Appointment</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
