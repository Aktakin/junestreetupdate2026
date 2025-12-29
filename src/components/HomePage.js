import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);


  useEffect(() => {
    // Simulate page loading - wait for images and content to load
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      // If no images, just wait a bit for content to render
      const timer = setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }, 800);
      return () => clearTimeout(timer);
    }

    const imageLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        setIsFading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        imageLoaded();
      } else {
        img.addEventListener('load', imageLoaded);
        img.addEventListener('error', imageLoaded);
      }
    });

    // Fallback timeout in case images take too long
    const timeout = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 2000);

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', imageLoaded);
        img.removeEventListener('error', imageLoaded);
      });
      clearTimeout(timeout);
    };
  }, []);


  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="6" cy="6" r="3"/>
          <circle cx="6" cy="18" r="3"/>
          <path d="M20 4L8.12 15.88"/>
          <path d="M14.47 14.48L20 20"/>
          <path d="M8.12 8.12L12 12"/>
        </svg>
      ),
      title: 'Haircut',
      description: 'Precision cuts tailored to your style',
      price: 'Book'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="7" r="4"/>
          <path d="M6.5 9c-.5 1-1 2.5-1 4c0 2.5 2 5 6.5 8c4.5-3 6.5-5.5 6.5-8c0-1.5-.5-3-1-4"/>
          <path d="M9 14c0 0 1.5 1 3 1s3-1 3-1"/>
          <path d="M9 17c0 0 1.5 1.5 3 1.5s3-1.5 3-1.5"/>
          <line x1="12" y1="11" x2="12" y2="13"/>
        </svg>
      ),
      title: 'Haircut w/Beard',
      description: 'Complete haircut and beard grooming package',
      price: 'Book'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
      title: 'VIP Service',
      description: 'Premium full-service grooming experience',
      price: 'Book'
    }
  ];


  const testimonials = [
    {
      name: 'Michael Thompson',
      role: 'Business Executive',
      content: 'JuneStreet has completely transformed my grooming routine. The attention to detail and professionalism is unmatched. Every visit feels like a premium experience.',
      rating: 5,
      image: '/images/placeholder.jpg'
    },
    {
      name: 'David Chen',
      role: 'Creative Director',
      content: 'I\'ve been to many barbershops, but none compare to JuneStreet. The master barbers here truly understand the art of men\'s grooming. Highly recommended!',
      rating: 5,
      image: '/images/placeholder.jpg'
    },
    {
      name: 'James Wilson',
      role: 'Attorney',
      content: 'The hot towel shave is an experience everyone should try at least once. The ambiance, the service, everything is perfectly curated for relaxation.',
      rating: 5,
      image: '/images/placeholder.jpg'
    },
    {
      name: 'Robert Martinez',
      role: 'Entrepreneur',
      content: 'From the moment you walk in, you know you\'re in good hands. The staff is professional, skilled, and genuinely care about their craft.',
      rating: 5,
      image: '/images/placeholder.jpg'
    }
  ];

  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: 'https://www.instagram.com/junestreet.barbershop'
    },
    { 
      name: 'Facebook', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://www.facebook.com/thejunestreetbarbershop/'
    },
    { 
      name: 'TikTok', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
        </svg>
      ),
      url: 'https://www.tiktok.com/@junestreetbarbershop'
    },
    { 
      name: 'Twitter', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
        </svg>
      ),
      url: '#'
    }
  ];

  return (
    <div className="homepage">
      {isLoading && (
        <div className={`homepage-loader ${isFading ? 'fade-out' : ''}`}>
          <div className="loader-container">
            <div className="loader-circle">
              <svg className="loader-svg" viewBox="0 0 100 100">
                <circle
                  className="loader-path"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="loader-logo">
              <img src="/images/logo.png" alt="JuneStreet Barbershop" />
            </div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="hero-section">
        <div 
          className="hero-column hero-column-single"
          style={{ backgroundImage: `url('/images/placeholder.jpg')` }}
        >
          <div className="hero-column-overlay"></div>
          <div className="hero-column-content">
            <span className="hero-column-label">Dark Beard</span>
            <h2 className="hero-column-title">Bookings</h2>
            <p className="hero-column-description">
              Schedule your grooming session with our professional barbers. Experience the finest in traditional barbering.
            </p>
            <button 
              className="hero-column-btn"
              onClick={() => navigate('/bookings')}
            >
              book now
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="animated-bg-shape"></div>
        <div className="animated-bg-shape"></div>
        <div className="animated-bg-shape"></div>
        <div className="animated-bg-shape"></div>
        <div className="animated-bg-shape"></div>
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Offer</span>
            <h2 className="section-title">
              <span className="title-underline">Services</span>
            </h2>
            <p className="section-subtitle">
              Each service is meticulously crafted to deliver an unparalleled grooming experience
            </p>
          </div>
          <div className="services-grid-wrapper">
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card"
                  style={{ '--delay': `${index * 0.15}s` }}
              >
                  <div className="service-number">0{index + 1}</div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-footer">
                      <button 
                        className="service-price"
                        onClick={() => navigate('/bookings')}
                      >
                        {service.price}
                      </button>
                      <button 
                        className="service-link"
                        onClick={() => navigate('/services')}
                      >
                        Details
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
          <div className="services-cta">
            <button 
              className="btn-view-all"
              onClick={() => navigate('/services')}
            >
              View All Services
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
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
                Crafting Excellence
              </h2>
              <div className="about-description">
                <p>
                  JuneStreet Barbershop is built on craft, shaped by culture, and sustained by community.
                </p>
                <p>
                  We are a collective of skilled barbers who take pride in the art of barbering — the precision, the discipline, and the details that separate a good cut from a great one. Every service is intentional. Every client is personal. Every chair carries responsibility.
                </p>
                <p>
                  JuneStreet is a space where tradition meets modern expression — where classic technique, contemporary style, and cultural authenticity live side by side. We exist to serve our community with consistency, respect, and excellence, creating more than just fresh cuts — we create confidence, connection, and belonging.
                </p>
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
                <img src="/images/placeholder.jpg" alt="JuneStreet Barbershop" />
                <div className="image-badge">
                  <span>15+</span>
                  <span>Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">
              <span className="title-underline">What Our Clients Say</span>
            </h2>
            <p className="section-subtitle">
              Don't just take our word for it - hear from the gentlemen who trust us with their grooming
            </p>
          </div>
          <div className="testimonials-wrapper">
            <div className="testimonials-slider">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
                >
                  <div className="testimonial-quote">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                  </div>
                  <p className="testimonial-content">{testimonial.content}</p>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="testimonials-nav">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Socials Section */}
      <section className="socials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Connect With Us</span>
            <h2 className="section-title">
              <span className="title-underline">Follow Us</span>
            </h2>
            <p className="section-subtitle">
              Stay connected and join our community
            </p>
          </div>
          <div className="socials-grid">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target={social.url === '#' ? undefined : '_blank'}
                rel={social.url === '#' ? undefined : 'noopener noreferrer'}
                className="social-item"
                style={{ '--delay': `${index * 0.1}s` }}
                aria-label={social.name}
                onClick={social.url === '#' ? (e) => e.preventDefault() : undefined}
              >
                <div className="social-icon-wrapper">
                  {social.icon}
                </div>
                <span className="social-name">{social.name}</span>
              </a>
            ))}
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
              Join thousands of gentlemen who trust JuneStreet for their grooming needs. 
              Reserve your seat today and experience the difference.
            </p>
            <div className="cta-buttons">
              <button 
                className="cta-button-large primary"
                onClick={() => navigate('/bookings')}
              >
                <span>Book</span>
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
