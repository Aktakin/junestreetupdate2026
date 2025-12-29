import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBarbers } from '../lib/supabase';
import './BookingsPage.css';

const BookingsPage = () => {
  const navigate = useNavigate();
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [barbers, setBarbers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch barbers from Supabase on mount
  useEffect(() => {
    const fetchBarbers = async () => {
      setIsLoading(true);
      const data = await getBarbers(false); // Only visible barbers
      setBarbers(data);
      setIsLoading(false);
    };
    fetchBarbers();
  }, []);


  const handleBarberClick = (barber) => {
    if (barber.booking_type === 'external') {
      window.open(barber.booking_link, '_blank');
    } else {
      setSelectedBarber(barber);
    }
  };

  const goBack = () => {
    setSelectedBarber(null);
  };

  // Internal booking - Call card only
  if (selectedBarber) {
    return (
      <div className="bookings-page">
        <section className="bookings-hero">
          <div className="container">
            <div className="hero-content-bookings">
              <span className="page-label">Book with {selectedBarber.name}</span>
              <h1 className="page-title">How Would You Like to Book?</h1>
              <p className="page-description">
                Choose your preferred booking method below.
              </p>
            </div>
          </div>
        </section>

        <section className="booking-options-section">
          <div className="container">
            <div className="booking-options-grid">
              {/* Call Barber Card */}
              <div className="booking-option-card call-card">
                <div className="option-card-header">
                  <div className="option-card-icon call">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="option-card-title">
                    <h3>Call {selectedBarber.name}</h3>
                    <p>Book directly by phone</p>
                  </div>
                </div>
                <div className="option-card-content always-open">
                  <div className="call-barber-phone">{selectedBarber.phone}</div>
                  <p className="call-barber-hint">Tap to call or text directly</p>
                  <div className="call-barber-actions">
                    <a href={`tel:${selectedBarber.phone.replace(/[^0-9+]/g, '')}`} className="call-action-btn call">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      Call Now
                    </a>
                    <a href={`sms:${selectedBarber.phone.replace(/[^0-9+]/g, '')}`} className="call-action-btn text">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      Send Text
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn-back-barbers" onClick={goBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Barbers
            </button>
          </div>
        </section>
      </div>
    );
  }

  // Main barber selection screen
  return (
    <div className="bookings-page">
      {/* Hero Section */}
      <section className="bookings-hero">
        <div className="container">
          <div className="hero-content-bookings">
            <span className="page-label">Book Appointment</span>
            <h1 className="page-title">Choose Your Barber</h1>
            <p className="page-description">
              Select your preferred barber to schedule your visit at JuneStreet Barbershop.
            </p>
          </div>
        </div>
      </section>

      {/* Barbers Grid */}
      <section className="barbers-selection-section">
        <div className="container">
          {isLoading ? (
            <div className="barbers-loading">
              <div className="loading-spinner"></div>
              <p>Loading barbers...</p>
            </div>
          ) : (
            <div className="barbers-main-grid">
              {/* Render barber cards */}
              {barbers.map((barber, index) => (
                <div 
                  key={barber.id}
                  className="barber-select-card"
                  onClick={() => handleBarberClick(barber)}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <div className="barber-select-image">
                    <img src="/images/placeholder.jpg" alt={barber.name} />
                    <div className="barber-select-overlay">
                      <span className="book-label">
                        {barber.booking_type === 'external' ? 'Book Online' : 'Book Now'}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="barber-select-info">
                    <h3>{barber.name}</h3>
                    <span className="book-barber-text">Book {barber.name} now</span>
                  </div>
                </div>
              ))}
              {/* Render hiring cards for remaining slots (10 total slots) */}
              {Array.from({ length: Math.max(0, 10 - barbers.length) }).map((_, index) => (
                <div 
                  key={`hiring-${index}`}
                  className="barber-select-card hiring-card"
                  onClick={() => navigate('/careers')}
                  style={{ '--delay': `${(barbers.length + index) * 0.1}s` }}
                >
                  <div className="barber-select-image hiring-image">
                    <div className="hiring-icon">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="16"/>
                        <line x1="8" y1="12" x2="16" y2="12"/>
                      </svg>
                    </div>
                    <div className="barber-select-overlay">
                      <span className="book-label">
                        Apply Now
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="barber-select-info">
                    <h3>We're Hiring</h3>
                    <span className="book-barber-text">Join our team</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookingsPage;
