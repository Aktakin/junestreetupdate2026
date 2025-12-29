import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';

const ServicesPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Haircut',
      description: 'Precision cuts tailored to your unique style. Our skilled barbers deliver clean, sharp results every time.',
      duration: '30-45 min',
      image: '/images/placeholder1.jpg',
      popular: true
    },
    {
      title: 'Haircut w/Beard',
      description: 'Complete haircut and beard grooming package. The perfect combination for the well-groomed gentleman.',
      duration: '45-60 min',
      image: '/images/placeholder2.jpg',
      popular: false
    },
    {
      title: 'Line Up',
      description: 'Clean, sharp edges and precise lines. Perfect for maintaining your look between full haircuts.',
      duration: '15-20 min',
      image: '/images/image2.jpg',
      popular: false
    },
    {
      title: 'Kids Cut',
      description: 'Gentle, patient service for our younger clients. Making haircuts a great experience for kids.',
      duration: '20-30 min',
      image: '/images/gallery1.jpg',
      popular: false
    },
    {
      title: 'VIP Service',
      description: 'The ultimate premium grooming experience. Full service treatment with extra attention to detail.',
      duration: '60-90 min',
      image: '/images/gallery2.jpg',
      popular: false
    },
    {
      title: 'Beard/Shave Only',
      description: 'Expert beard shaping, trimming, or traditional hot towel shave. For the distinguished gentleman.',
      duration: '20-30 min',
      image: '/images/gallery3.jpg',
      popular: false
    },
    {
      title: 'House Calls',
      description: 'Premium barber services at your location. Convenience meets quality for busy professionals.',
      duration: 'Varies',
      image: '/images/gallery4.jpg',
      popular: false
    },
    {
      title: 'Before/After Hours',
      description: 'Flexible scheduling outside regular hours. Book early morning or late evening appointments.',
      duration: 'Varies',
      image: '/images/gallery5.jpg',
      popular: false
    }
  ];


  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <span className="page-label">Our Services</span>
            <h1 className="page-title">Our Services</h1>
            <p className="page-description">
              At JuneStreet, every service is rooted in precision, intention, and respect for the craft. From clean fades and sharp lineups to classic cuts and detailed grooming, we take the time to understand your style and deliver consistent, high-quality results. Our approach blends traditional barbering techniques with modern expression, all within a professional, culture-driven space where every client is treated with care and attention.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-list">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`service-card-detailed ${service.popular ? 'popular' : ''}`}
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="service-image" style={{ backgroundImage: `url(${service.image})` }}>
                  <div className="service-image-overlay"></div>
                  {service.popular && <span className="popular-badge">Most Popular</span>}
                </div>
                <div className="service-content-detailed">
                  <h3 className="service-title-detailed">{service.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta-section">
        <div className="container">
          <div className="cta-content-services">
            <span className="cta-label">Ready to Experience Excellence?</span>
            <h2>Book Your Appointment Today</h2>
            <p>Transform your look with our premium grooming services</p>
            <div className="cta-buttons">
              <button 
                className="cta-button-primary"
                onClick={() => navigate('/bookings')}
              >
                Schedule Appointment
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

export default ServicesPage;
