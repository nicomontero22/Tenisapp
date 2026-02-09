import React, { useState } from 'react';
import BookingScreen from '../booking/BookingScreen';
import './ClubDetailPage.css';

const ClubDetailPage = ({ clubId, onBack }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [selectedImage, setSelectedImage] = useState(0);
    const [showBooking, setShowBooking] = useState(false);
    const [bookingCourt, setBookingCourt] = useState(null);

    // Mock data del club (TODO: traer del API por clubId)
    const club = {
        id: clubId || 1,
        name: 'Club Atlético River Plate',
        description: 'Uno de los clubes más prestigiosos de Buenos Aires con canchas de primer nivel. Contamos con instalaciones modernas, vestuarios completos y un equipo de profesionales para mejorar tu juego.',
        image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&h=400&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800&h=400&fit=crop',
            'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=400&fit=crop',
            'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop',
        ],
        rating: 4.8,
        reviewCount: 234,
        distance: '2.5 km',
        address: 'Av. Libertador 7395, Núñez, CABA',
        phone: '+54 11 4789-1234',
        email: 'tenis@riverplate.com.ar',
        website: 'www.cariverplate.com.ar',
        amenities: ['Vestuarios', 'Estacionamiento', 'Bar', 'Iluminación', 'Pro Shop', 'WiFi'],
        schedule: {
            weekdays: '08:00 - 23:00',
            saturday: '09:00 - 22:00',
            sunday: '09:00 - 20:00',
        },
        courts: [
            {
                id: 1,
                name: 'Cancha 1',
                surface: 'Polvo de ladrillo',
                surfaceColor: '#D2691E',
                covered: false,
                hasLights: true,
                status: 'available',
                pricePerHour: 3500,
            },
            {
                id: 2,
                name: 'Cancha 2',
                surface: 'Polvo de ladrillo',
                surfaceColor: '#D2691E',
                covered: false,
                hasLights: true,
                status: 'available',
                pricePerHour: 3500,
            },
            {
                id: 3,
                name: 'Cancha 3',
                surface: 'Cemento',
                surfaceColor: '#808080',
                covered: true,
                hasLights: true,
                status: 'available',
                pricePerHour: 4200,
            },
            {
                id: 4,
                name: 'Cancha 4',
                surface: 'Cemento',
                surfaceColor: '#808080',
                covered: false,
                hasLights: false,
                status: 'maintenance',
                pricePerHour: 4200,
            },
            {
                id: 5,
                name: 'Cancha 5',
                surface: 'Césped sintético',
                surfaceColor: '#228B22',
                covered: false,
                hasLights: true,
                status: 'available',
                pricePerHour: 5000,
            },
            {
                id: 6,
                name: 'Cancha 6',
                surface: 'Polvo de ladrillo',
                surfaceColor: '#D2691E',
                covered: true,
                hasLights: true,
                status: 'occupied',
                pricePerHour: 4500,
            },
        ],
        depositPercentage: 30,
        promocion: '20% OFF primera reserva',
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency', currency: 'ARS', minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusInfo = (status) => {
        const map = {
            available: { label: 'Disponible', color: '#00A86B', bg: '#E6F9F1' },
            occupied: { label: 'Ocupada', color: '#EF4444', bg: '#FEE2E2' },
            maintenance: { label: 'Mantenimiento', color: '#F59E0B', bg: '#FEF3C7' },
        };
        return map[status] || map.available;
    };

    const availableCourts = club.courts.filter(c => c.status === 'available');

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ color: i <= Math.round(rating) ? '#FFD700' : '#ddd', fontSize: '16px' }}>
                    ★
                </span>
            );
        }
        return stars;
    };

    const handleReserveCourt = (court) => {
        setBookingCourt(court);
        setShowBooking(true);
    };

    const handleReserveGeneral = () => {
        setBookingCourt(availableCourts[0] || null);
        setShowBooking(true);
    };

    // Si estamos en modo reserva, mostrar BookingScreen
    if (showBooking) {
        return (
            <BookingScreen
                club={club}
                court={bookingCourt}
                onBack={() => setShowBooking(false)}
                onBookingComplete={(booking) => {
                    console.log('✅ Reserva completada:', booking);
                }}
            />
        );
    }

    return (
        <div className="club-detail-page">
            {/* Header con imagen */}
            <div className="club-detail-hero">
                <img
                    src={club.images[selectedImage]}
                    alt={club.name}
                    className="hero-image"
                />
                <div className="hero-overlay" />

                {/* Back button */}
                <button className="back-button" onClick={onBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                    </svg>
                </button>

                {/* Image thumbnails */}
                <div className="hero-thumbnails">
                    {club.images.map((img, idx) => (
                        <button
                            key={idx}
                            className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                            onClick={() => setSelectedImage(idx)}
                        >
                            <img src={img} alt={`Vista ${idx + 1}`} />
                        </button>
                    ))}
                </div>

                {/* Promo badge */}
                {club.promocion && (
                    <div className="promo-badge-detail">
                        🔥 {club.promocion}
                    </div>
                )}

                {/* Club name overlay */}
                <div className="hero-info">
                    <h1>{club.name}</h1>
                    <div className="hero-meta">
                        <span className="hero-rating">
                            {renderStars(club.rating)}
                            <strong>{club.rating}</strong>
                            <span>({club.reviewCount} reseñas)</span>
                        </span>
                        <span className="hero-distance">📍 {club.distance}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="club-detail-content">
                {/* Quick stats */}
                <div className="quick-stats-row">
                    <div className="quick-stat">
                        <span className="quick-stat-value">{club.courts.length}</span>
                        <span className="quick-stat-label">Canchas</span>
                    </div>
                    <div className="quick-stat">
                        <span className="quick-stat-value">{availableCourts.length}</span>
                        <span className="quick-stat-label">Disponibles</span>
                    </div>
                    <div className="quick-stat">
                        <span className="quick-stat-value">{formatCurrency(Math.min(...club.courts.map(c => c.pricePerHour)))}</span>
                        <span className="quick-stat-label">Desde</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="detail-tabs">
                    {[
                        { key: 'info', label: 'Info' },
                        { key: 'courts', label: `Canchas (${club.courts.length})` },
                        { key: 'reviews', label: 'Reseñas' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            className={`detail-tab ${activeTab === tab.key ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab: Info */}
                {activeTab === 'info' && (
                    <div className="tab-content">
                        <div className="info-section">
                            <h3>Sobre el club</h3>
                            <p className="club-description">{club.description}</p>
                        </div>

                        <div className="info-section">
                            <h3>Servicios</h3>
                            <div className="amenities-grid">
                                {club.amenities.map((amenity, idx) => (
                                    <span key={idx} className="amenity-tag">
                                        ✓ {amenity}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="info-section">
                            <h3>Horarios</h3>
                            <div className="schedule-list">
                                <div className="schedule-row">
                                    <span>Lunes a Viernes</span>
                                    <strong>{club.schedule.weekdays}</strong>
                                </div>
                                <div className="schedule-row">
                                    <span>Sábados</span>
                                    <strong>{club.schedule.saturday}</strong>
                                </div>
                                <div className="schedule-row">
                                    <span>Domingos</span>
                                    <strong>{club.schedule.sunday}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="info-section">
                            <h3>Contacto</h3>
                            <div className="contact-list">
                                <div className="contact-item">
                                    <span className="contact-icon">📍</span>
                                    <span>{club.address}</span>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon">📞</span>
                                    <span>{club.phone}</span>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon">📧</span>
                                    <span>{club.email}</span>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon">🌐</span>
                                    <span>{club.website}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Courts */}
                {activeTab === 'courts' && (
                    <div className="tab-content">
                        <div className="courts-list">
                            {club.courts.map(court => {
                                const status = getStatusInfo(court.status);
                                return (
                                    <div key={court.id} className={`court-card-detail ${court.status !== 'available' ? 'disabled' : ''}`}>
                                        <div className="court-card-left">
                                            <div className="court-surface-dot" style={{ background: court.surfaceColor }} />
                                            <div className="court-card-info">
                                                <h4>{court.name}</h4>
                                                <p>{court.surface}</p>
                                                <div className="court-features">
                                                    {court.covered && <span className="court-feature">🏠 Techada</span>}
                                                    {court.hasLights && <span className="court-feature">💡 Luz</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="court-card-right">
                                            <span className="court-price">{formatCurrency(court.pricePerHour)}<small>/hora</small></span>
                                            <span className="court-status-badge" style={{ background: status.bg, color: status.color }}>
                                                {status.label}
                                            </span>
                                            {court.status === 'available' && (
                                                <button
                                                    className="btn-reserve-court"
                                                    onClick={() => handleReserveCourt(court)}
                                                >
                                                    Reservar
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Tab: Reviews */}
                {activeTab === 'reviews' && (
                    <div className="tab-content">
                        <div className="reviews-summary">
                            <div className="rating-big">
                                <span className="rating-number">{club.rating}</span>
                                <div>
                                    <div>{renderStars(club.rating)}</div>
                                    <span className="rating-count">{club.reviewCount} reseñas</span>
                                </div>
                            </div>
                        </div>

                        {/* Mock reviews */}
                        {[
                            { name: 'Carlos M.', rating: 5, date: 'Hace 2 días', text: 'Excelentes canchas, muy bien mantenidas. El polvo de ladrillo está perfecto.' },
                            { name: 'Ana L.', rating: 4, date: 'Hace 1 semana', text: 'Buen club, canchas en buen estado. Los vestuarios podrían mejorar.' },
                            { name: 'Roberto S.', rating: 5, date: 'Hace 2 semanas', text: 'Lo mejor de la zona. La cancha techada es genial para días de lluvia.' },
                        ].map((review, idx) => (
                            <div key={idx} className="review-card">
                                <div className="review-header">
                                    <div className="review-avatar">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div className="review-meta">
                                        <strong>{review.name}</strong>
                                        <span>{review.date}</span>
                                    </div>
                                    <div className="review-rating">{renderStars(review.rating)}</div>
                                </div>
                                <p className="review-text">{review.text}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom CTA */}
            <div className="bottom-cta">
                <div className="bottom-cta-info">
                    <span className="bottom-cta-price">Desde {formatCurrency(Math.min(...club.courts.map(c => c.pricePerHour)))}/hora</span>
                    <span className="bottom-cta-available">{availableCourts.length} canchas disponibles</span>
                </div>
                <button
                    className="btn-reserve-main"
                    onClick={handleReserveGeneral}
                    disabled={availableCourts.length === 0}
                >
                    Reservar Cancha
                </button>
            </div>
        </div>
    );
};

export default ClubDetailPage;