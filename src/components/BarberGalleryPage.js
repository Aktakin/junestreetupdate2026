import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBarberById, getBarberWorkImages, getBarberWorkImagesForDisplay, getBarberDisplayImage } from '../lib/supabase';
import './BarberGalleryPage.css';
import './BookingsPage.css';

const BarberGalleryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [barber, setBarber] = useState(null);
  const [workImages, setWorkImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setError('Barber not found');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      const { data: barberData, error: barberErr } = await getBarberById(id);
      if (barberErr || !barberData) {
        setError('Barber not found');
        setBarber(null);
        setWorkImages([]);
        setLoading(false);
        return;
      }
      setBarber(barberData);
      const images = await getBarberWorkImages(id);
      setWorkImages(images || []);
      setLoading(false);
    };
    load();
  }, [id]);

  const handleBook = () => {
    if (!barber) return;
    if (barber.booking_type === 'external' && barber.booking_link) {
      window.open(barber.booking_link, '_blank');
    } else {
      setShowBooking(true);
    }
  };

  const [showBooking, setShowBooking] = useState(false);

  if (loading) {
    return (
      <div className="barber-gallery-page">
        <div className="barber-gallery-loading">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !barber) {
    return (
      <div className="barber-gallery-page">
        <section className="barber-gallery-hero">
          <div className="container">
            <p className="barber-gallery-error">{error || 'Barber not found'}</p>
            <button className="btn-back-barbers" onClick={() => navigate('/bookings')}>
              Back to Barbers
            </button>
          </div>
        </section>
      </div>
    );
  }

  // Inline booking (call) section when barber is internal
  if (showBooking && barber.booking_type === 'internal') {
    return (
      <div className="barber-gallery-page">
        <section className="barber-gallery-hero">
          <div className="container">
            <span className="page-label">Book with {barber.name}</span>
            <h1 className="page-title">How Would You Like to Book?</h1>
          </div>
        </section>
        <section className="booking-options-section">
          <div className="container">
            <div className="booking-options-grid">
              <div className="booking-option-card call-card">
                <div className="option-card-header">
                  <div className="option-card-icon call">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="option-card-title">
                    <h3>Call {barber.name}</h3>
                    <p>Book directly by phone</p>
                  </div>
                </div>
                <div className="option-card-content always-open">
                  <div className="call-barber-phone">{barber.phone}</div>
                  <p className="call-barber-hint">Tap to call or text directly</p>
                  <div className="call-barber-actions">
                    <a href={`tel:${(barber.phone || '').replace(/[^0-9+]/g, '')}`} className="call-action-btn call">Call Now</a>
                    <a href={`sms:${(barber.phone || '').replace(/[^0-9+]/g, '')}`} className="call-action-btn text">Send Text</a>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn-back-barbers" onClick={() => setShowBooking(false)}>
              ← Back to Gallery
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="barber-gallery-page">
      <section className="barber-gallery-hero">
        <div className="container">
          <button className="barber-gallery-back" onClick={() => navigate('/bookings')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Barbers
          </button>
          <div className="barber-gallery-profile">
            <div className="barber-gallery-avatar">
              <img src={getBarberDisplayImage(barber)} alt={barber.name} />
            </div>
            <div className="barber-gallery-info">
              <span className="page-label">Barber</span>
              <h1 className="page-title">{barber.name}</h1>
              <p className="barber-gallery-tagline">Work by {barber.name}</p>
              <button className="barber-gallery-book-btn" onClick={handleBook}>
                {barber.booking_type === 'external' ? 'Book Online' : 'Book Now'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="barber-gallery-work">
        <div className="container">
          <h2 className="barber-gallery-work-title">Work Gallery</h2>
          {(() => {
            const displayImages = getBarberWorkImagesForDisplay(barber, workImages);
            if (displayImages.length === 0) {
              return (
                <div className="barber-gallery-empty-wrap">
                  <p className="barber-gallery-empty">
                    {`Fresh cuts from ${barber.name} are coming soon. Work added in the admin will show here.`}
                  </p>
                  <div className="barber-gallery-grid barber-gallery-grid-placeholders">
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div key={idx} className="barber-gallery-item placeholder-card">
                        <div className="barber-gallery-placeholder-inner">
                          <span>+</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <div className="barber-gallery-grid">
                {displayImages.map((img) => (
                  <div key={img.id} className="barber-gallery-item">
                    {img.type === 'video' ? (
                      <video
                        src={img.image_url}
                        controls
                        playsInline
                        preload="metadata"
                        aria-label={`Work by ${barber.name}`}
                      />
                    ) : (
                      <img src={img.image_url} alt={`Work by ${barber.name}`} loading="lazy" />
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
};

export default BarberGalleryPage;
