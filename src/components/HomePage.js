import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slider images - replace with your actual barbershop images
  const heroSlides = [
    {
      image: '/images/placeholder.jpg', // Replace with your hero image 1
      title: 'Premium Barbershop Experience',
      subtitle: 'Where Style Meets Tradition',
      description: 'Expert cuts, classic shaves, and modern grooming services'
    },
    {
      image: '/images/placeholder.jpg', // Replace with your hero image 2
      title: 'Master Barbers at Your Service',
      subtitle: 'Craftsmanship in Every Cut',
      description: 'Experience the art of traditional barbering with a modern twist'
    },
    {
      image: '/images/placeholder.jpg', // Replace with your hero image 3
      title: 'Your Style, Our Expertise',
      subtitle: 'Book Your Appointment Today',
      description: 'Walk-ins welcome, appointments preferred'
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

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
      icon: '✂️',
      title: 'Haircuts',
      description: 'Classic and modern styles tailored to you'
    },
    {
      icon: '🧔',
      title: 'Beard Trim',
      description: 'Professional beard shaping and grooming'
    },
    {
      icon: '🪒',
      title: 'Hot Shave',
      description: 'Traditional straight razor shave experience'
    },
    {
      icon: '💇',
      title: 'Hair Styling',
      description: 'Premium styling and finishing services'
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Slider Section */}
      <section className="hero-slider">
        <div className="slider-container">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <div className={`slide-text ${index === currentSlide ? 'animate' : ''}`}>
                  <h1 className="slide-title">{slide.title}</h1>
                  <h2 className="slide-subtitle">{slide.subtitle}</h2>
                  <p className="slide-description">{slide.description}</p>
                  <button 
                    className="cta-button"
                    onClick={() => navigate('/bookings')}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button className="slider-btn prev" onClick={prevSlide}>
          ‹
        </button>
        <button className="slider-btn next" onClick={nextSlide}>
          ›
        </button>

        {/* Slider Indicators */}
        <div className="slider-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">Premium grooming services for the modern gentleman</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <button 
              className="btn-secondary"
              onClick={() => navigate('/services')}
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">Welcome to June Street Barbershop</h2>
              <p className="about-description">
                We are a premium barbershop dedicated to providing exceptional grooming 
                services. Our master barbers combine traditional techniques with modern 
                styling to give you the perfect look.
              </p>
              <p className="about-description">
                At June Street, we believe that a great haircut is more than just a service—it's 
                an experience. Step into our shop and leave feeling confident, refreshed, and 
                ready to take on the world.
              </p>
              <button 
                className="btn-primary"
                onClick={() => navigate('/about')}
              >
                Learn More About Us
              </button>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <img src="/images/placeholder.jpg" alt="June Street Barbershop" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready for Your Next Cut?</h2>
            <p className="cta-text">Book your appointment today and experience the June Street difference</p>
            <button 
              className="cta-button-large"
              onClick={() => navigate('/bookings')}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
