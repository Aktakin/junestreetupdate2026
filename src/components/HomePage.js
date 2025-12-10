import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const heroSlides = [
    {
      image: '/images/placeholder.jpg',
      title: 'Craftsmanship Redefined',
      subtitle: 'June Street',
      description: 'Where timeless tradition meets contemporary excellence in every detail',
      accent: '#D4AF37'
    },
    {
      image: '/images/placeholder.jpg',
      title: 'The Art of Precision',
      subtitle: 'Master Barbers',
      description: 'Experience unparalleled expertise in a sanctuary of style and sophistication',
      accent: '#268BBA'
    },
    {
      image: '/images/placeholder.jpg',
      title: 'Elevate Your Presence',
      subtitle: 'Luxury Grooming',
      description: 'Indulge in bespoke services tailored to the modern gentleman',
      accent: '#ED4148'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'Signature Cuts',
      description: 'Precision-engineered hairstyles crafted to perfection',
      price: 'From $45'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      title: 'Beard Mastery',
      description: 'Expert shaping and grooming for the distinguished gentleman',
      price: 'From $35'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      title: 'Hot Towel Shave',
      description: 'Traditional straight razor experience with premium products',
      price: 'From $55'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 7h-4M4 7h4m12 0v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7m16 0V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"/>
        </svg>
      ),
      title: 'Complete Grooming',
      description: 'Full-service experience from consultation to finishing',
      price: 'From $85'
    }
  ];

  const stats = [
    { number: '15+', label: 'Years of Excellence' },
    { number: '10K+', label: 'Satisfied Clients' },
    { number: '5★', label: 'Average Rating' },
    { number: '100%', label: 'Premium Quality' }
  ];

  return (
    <div className="homepage">
      {/* Hero Slider Section */}
      <section className="hero-slider" ref={heroRef}>
        <div className="slider-container">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''} ${index === currentSlide - 1 || (currentSlide === 0 && index === heroSlides.length - 1) ? 'prev' : ''}`}
              style={{ 
                backgroundImage: `url(${slide.image})`,
                '--accent-color': slide.accent
              }}
            >
              <div className="slide-overlay">
                <div className="overlay-gradient"></div>
                <div className="overlay-pattern"></div>
              </div>
              <div className="slide-content">
                <div className={`slide-text ${index === currentSlide ? 'animate' : ''}`}>
                  <div className="slide-number">0{index + 1}</div>
                  <h1 className="slide-title">
                    <span className="title-line">{slide.title}</span>
                  </h1>
                  <h2 className="slide-subtitle">{slide.subtitle}</h2>
                  <div className="slide-divider"></div>
                  <p className="slide-description">{slide.description}</p>
                  <div className="cta-group">
                    <button 
                      className="cta-button primary"
                      onClick={() => navigate('/bookings')}
                    >
                      <span>Reserve Your Seat</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                    <button 
                      className="cta-button secondary"
                      onClick={() => navigate('/services')}
                    >
                      Explore Services
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button className="slider-btn next" onClick={nextSlide} aria-label="Next slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Slider Indicators */}
        <div className="slider-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className="indicator-progress"></span>
            </button>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">
              <span className="title-underline">Premium Services</span>
            </h2>
            <p className="section-subtitle">
              Each service is meticulously crafted to deliver an unparalleled grooming experience
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card"
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="service-icon-wrapper">
                  <div className="service-icon">{service.icon}</div>
                  <div className="service-icon-bg"></div>
                </div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-footer">
                    <span className="service-price">{service.price}</span>
                    <button className="service-link">
                      Learn More
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="section-label">Our Story</span>
              <h2 className="section-title">
                Crafting Excellence Since 2008
              </h2>
              <div className="about-description">
                <p>
                  At June Street Barbershop, we've redefined the art of men's grooming. 
                  Our master barbers bring decades of combined experience, blending time-honored 
                  techniques with contemporary innovation.
                </p>
                <p>
                  Every visit is an experience—from the moment you step through our doors, 
                  you're enveloped in an atmosphere of refined elegance and meticulous attention 
                  to detail. We don't just cut hair; we craft confidence.
                </p>
              </div>
              <div className="about-features">
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>Premium Products Only</span>
                </div>
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>Master Certified Barbers</span>
                </div>
                <div className="feature-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>Luxury Environment</span>
                </div>
              </div>
              <button 
                className="btn-primary"
                onClick={() => navigate('/about')}
              >
                Discover Our Heritage
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            <div className="about-image">
              <div className="image-wrapper">
                <div className="image-overlay-effect"></div>
                <img src="/images/placeholder.jpg" alt="June Street Barbershop" />
                <div className="image-badge">
                  <span>15+</span>
                  <span>Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">Ready to Transform?</div>
            <h2 className="cta-title">Book Your Appointment</h2>
            <p className="cta-text">
              Join thousands of gentlemen who trust June Street for their grooming needs. 
              Reserve your seat today and experience the difference.
            </p>
            <div className="cta-buttons">
              <button 
                className="cta-button-large primary"
                onClick={() => navigate('/bookings')}
              >
                <span>Schedule Now</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button 
                className="cta-button-large secondary"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;