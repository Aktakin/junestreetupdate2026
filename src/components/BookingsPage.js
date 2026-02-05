import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBarbers, getBarberDisplayImage } from '../lib/supabase';
import './BookingsPage.css';

const BookingsPage = () => {
  const navigate = useNavigate();
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
    navigate(`/barber/${barber.id}`);
  };

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
                    <img src={getBarberDisplayImage(barber)} alt={barber.name} />
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
