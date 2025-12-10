import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
      title: 'Excellence',
      description: 'Uncompromising quality in every service we provide'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Tradition',
      description: 'Honoring time-tested barbering techniques'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Innovation',
      description: 'Embracing modern styling and techniques'
    }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <div className="hero-content-about">
            <span className="page-label">Our Story</span>
            <h1 className="page-title">Crafting Excellence Since 2008</h1>
            <p className="page-description">
              At June Street Barbershop, we've redefined the art of men's grooming. 
              Our master barbers bring decades of combined experience, blending time-honored 
              techniques with contemporary innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Heritage</h2>
              <p>
                Founded in 2008, June Street Barbershop was born from a passion for 
                traditional barbering and a vision to create a space where men could 
                experience the finest in grooming services.
              </p>
              <p>
                Over the years, we've built a reputation for excellence, serving thousands 
                of clients who trust us with their style. Our barbers are not just skilled 
                professionals—they're artists dedicated to their craft.
              </p>
              <p>
                Every visit to June Street is more than a haircut; it's an experience. 
                From the moment you step through our doors, you're enveloped in an 
                atmosphere of refined elegance and meticulous attention to detail.
              </p>
            </div>
            <div className="story-image">
              <img src="/images/placeholder.jpg" alt="June Street Barbershop" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="values-header">
            <h2>Our Values</h2>
            <p>What drives us every day</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="cta-content-about">
            <h2>Experience the June Street Difference</h2>
            <p>Book your appointment and discover why we're the trusted choice for gentlemen who demand excellence</p>
            <button 
              className="cta-button-about"
              onClick={() => navigate('/bookings')}
            >
              Book Your Visit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
