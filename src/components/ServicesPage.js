import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Signature Cuts',
      description: 'Precision-engineered hairstyles crafted to perfection. Our master barbers use traditional techniques combined with modern styling.',
      features: ['Consultation included', 'Premium products', 'Styling & finishing'],
      duration: '45-60 min'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      title: 'Beard Mastery',
      description: 'Expert shaping and grooming for the distinguished gentleman. Achieve the perfect beard style with professional tools and techniques.',
      features: ['Beard trim & shape', 'Hot towel treatment', 'Premium oils'],
      duration: '30-45 min'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      title: 'Hot Towel Shave',
      description: 'Traditional straight razor experience with premium products. Experience the classic barbershop shave in its finest form.',
      features: ['Hot towel prep', 'Straight razor shave', 'Aftershave treatment'],
      duration: '30 min'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 7h-4M4 7h4m12 0v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7m16 0V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"/>
        </svg>
      ),
      title: 'Complete Grooming',
      description: 'Full-service experience from consultation to finishing. The ultimate barbershop package for the modern gentleman.',
      features: ['Haircut & styling', 'Beard trim', 'Hot towel shave', 'Hair wash'],
      duration: '90 min'
    }
  ];

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <div className="hero-content">
            <span className="page-label">Our Services</span>
            <h1 className="page-title">Premium Grooming Services</h1>
            <p className="page-description">
              Experience the finest in men's grooming with our expertly crafted services. 
              Each treatment is designed to elevate your style and confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="services-list">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card-detailed">
                <div className="service-header">
                  <div className="service-icon-wrapper">
                    <div className="service-icon">{service.icon}</div>
                    <div className="service-icon-bg"></div>
                  </div>
                  <div className="service-duration">{service.duration}</div>
                </div>
                <div className="service-content-detailed">
                  <h3 className="service-title-detailed">{service.title}</h3>
                  <p className="service-description-detailed">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    className="service-book-btn"
                    onClick={() => navigate('/bookings')}
                  >
                    Book Now
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta-section">
        <div className="container">
          <div className="cta-content-services">
            <h2>Ready to Experience Excellence?</h2>
            <p>Book your appointment today and discover the June Street difference</p>
            <button 
              className="cta-button-services"
              onClick={() => navigate('/bookings')}
            >
              Schedule Appointment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
