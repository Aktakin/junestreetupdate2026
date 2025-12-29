import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content-about">
            <span className="page-label">About JuneStreet Barbershop</span>
            <h1 className="page-title">Who We Are</h1>
            <p className="page-description">
              JuneStreet Barbershop is built on craft, shaped by culture, and sustained by community.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="about-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <span className="section-label">Who We Are</span>
              <h2>JuneStreet Barbershop</h2>
              <p>
                We are a collective of skilled barbers who take pride in the art of barbering — the precision, the discipline, and the details that separate a good cut from a great one. Every service is intentional. Every client is personal. Every chair carries responsibility.
              </p>
              <p>
                JuneStreet is a space where tradition meets modern expression — where classic technique, contemporary style, and cultural authenticity live side by side. We exist to serve our community with consistency, respect, and excellence, creating more than just fresh cuts — we create confidence, connection, and belonging.
              </p>
            </div>
            <div className="story-image">
              <div className="image-container">
                <img src="/images/placeholder1.jpg" alt="JuneStreet Barbershop" />
                <div className="image-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="mission-content">
            <span className="section-label">Our Mission</span>
            <h2>Our Mission</h2>
            <p>
              To honor the craft of barbering while serving our community with consistency, care and providing an elevated experience rooted in skill, culture, and genuine connection.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="about-vision">
        <div className="container">
          <div className="vision-content">
            <span className="section-label">Our Vision</span>
            <h2>Our Vision</h2>
            <p>
              To be a barbershop that represents the highest level of craft, stands as a cultural cornerstone, and serves as a trusted space for the community.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values">
        <div className="container">
          <div className="values-content">
            <span className="section-label">Our Core Values</span>
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Craft</h3>
                <p>
                  We respect the art. Technique, precision, and attention to detail are non-negotiable. Our work reflects years of practice and a commitment to mastery.
                </p>
              </div>
              <div className="value-card">
                <h3>Culture</h3>
                <p>
                  JuneStreet is rooted in the culture that shaped us. We create a space where authenticity is celebrated and expression is welcomed.
                </p>
              </div>
              <div className="value-card">
                <h3>Community</h3>
                <p>
                  We exist because of our community. Every client matters. Every relationship matters. We serve with humility and purpose.
                </p>
              </div>
              <div className="value-card">
                <h3>Consistency</h3>
                <p>
                  Excellence is not occasional — it's habitual. We show up prepared, professional, and locked in every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content-about">
            <span className="cta-label">Ready to Experience the Difference?</span>
            <h2>Book Your Visit Today</h2>
            <p>Join thousands of gentlemen who trust JuneStreet for their grooming needs</p>
            <div className="cta-buttons">
              <button 
                className="cta-button-primary"
                onClick={() => navigate('/bookings')}
              >
                Book Appointment
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button 
                className="cta-button-secondary"
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

export default AboutPage;
