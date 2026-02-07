import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../context/AuthContext';
import { calculatePaymentBreakdown } from '../../models/BookingModels';
import './ClubDetailPage.css';

const ClubDetailPage = ({ clubId, onBack, onNavigateToBooking }) => {
    const { user, logout } = useAuth();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Mock data del club - TODO: Obtener del API
    const club = {
        id: clubId,
        name: 'Club Atlético River Plate',
        description: 'Club deportivo con las mejores instalaciones de tenis en Buenos Aires. Canchas de polvo de ladrillo y cemento, vestuarios amplios, estacionamiento gratuito y cafetería.',
        address: 'Av. Figueroa Alcorta 7597, CABA',
        phone: '+54 11 4789-1200',
        email: 'tenis@cariverplate.com.ar',
        images: [
            'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800',
            'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800',
            'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800',
        ],
        rating: 4.8,
        reviewCount: 234,
        distance: '2.5 km',

        amenities: [
            { icon: '🚿', name: 'Vestuarios' },
            { icon: '🅿️', name: 'Estacionamiento' },
            { icon: '☕', name: 'Cafetería' },
            { icon: '💡', name: 'Iluminación' },
            { icon: '🏪', name: 'Pro Shop' },
            { icon: '📶', name: 'WiFi' },
        ],

        pricing: {
            depositPercentage: 30,
            cashDiscountPercentage: 5,
        },

        policies: {
            cancellationPolicy: 'Seña no reembolsable. Si cancelás o no te presentás, perdés la seña.',
            rainPolicy: 'En caso de lluvia, la seña se convierte en crédito válido por 90 días para reservar otro día.',
            minAdvanceBooking: 2,
            maxAdvanceBooking: 30,
        },

        courts: [
            {
                id: 1,
                name: 'Cancha 1',
                courtType: 'clay',
                courtTypeName: 'Polvo de ladrillo',
                hasLights: true,
                isIndoor: false,
                pricing: {
                    '1h': 3500,
                    '1.5h': 5000,
                    '2h': 6500,
                    '2.5h': 8000,
                },
                nightPricing: {
                    '1h': 4000,
                    '1.5h': 5500,
                    '2h': 7000,
                    '2.5h': 8500,
                },
                status: 'ACTIVE',
                availability: 'Alta disponibilidad',
            },
            {
                id: 2,
                name: 'Cancha 2',
                courtType: 'hard',
                courtTypeName: 'Cemento',
                hasLights: true,
                isIndoor: false,
                pricing: {
                    '1h': 3800,
                    '1.5h': 5400,
                    '2h': 7000,
                    '2.5h': 8600,
                },
                nightPricing: {
                    '1h': 4300,
                    '1.5h': 5900,
                    '2h': 7500,
                    '2.5h': 9100,
                },
                status: 'ACTIVE',
                availability: 'Media disponibilidad',
            },
            {
                id: 3,
                name: 'Cancha 3 - Court Central',
                courtType: 'clay',
                courtTypeName: 'Polvo de ladrillo',
                hasLights: true,
                isIndoor: false,
                pricing: {
                    '1h': 4500,
                    '1.5h': 6500,
                    '2h': 8500,
                    '2.5h': 10500,
                },
                nightPricing: {
                    '1h': 5000,
                    '1.5h': 7000,
                    '2h': 9000,
                    '2.5h': 11000,
                },
                status: 'ACTIVE',
                availability: 'Poca disponibilidad',
            },
        ],
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % club.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + club.images.length) % club.images.length);
    };

    const handleSelectCourt = (court) => {
        onNavigateToBooking(court);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="club-detail-page">
            <Header user={user} onLogout={logout} />

            {/* Breadcrumb */}
            <div className="container">
                <div className="breadcrumb">
                    <button onClick={onBack} className="breadcrumb-link">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path fillRule="evenodd" d="M12 8a.5.5 0 01-.5.5H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5a.5.5 0 01.5.5z" />
                        </svg>
                        Volver a clubes
                    </button>
                </div>
            </div>

            {/* Gallery */}
            <div className="club-gallery">
                <div className="gallery-main">
                    <img src={club.images[currentImageIndex]} alt={club.name} />
                    <button className="gallery-nav prev" onClick={prevImage}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                    <button className="gallery-nav next" onClick={nextImage}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                    </button>
                    <div className="gallery-indicators">
                        {club.images.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container">
                <div className="club-content">
                    {/* Main Info */}
                    <div className="club-main">
                        <div className="club-header">
                            <div>
                                <h1 className="club-title">{club.name}</h1>
                                <div className="club-meta">
                                    <div className="rating">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                            <path d="M9 1l2.5 5 5.5.5-4 4 1 5.5L9 13l-5 3 1-5.5-4-4 5.5-.5L9 1z" />
                                        </svg>
                                        <span>{club.rating}</span>
                                        <span className="review-count">({club.reviewCount} reseñas)</span>
                                    </div>
                                    <div className="location">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                            <path fillRule="evenodd" d="M8 1a3 3 0 100 6 3 3 0 000-6zM4 4a4 4 0 114.5 3.969V13.5a.5.5 0 01-1 0V7.97A4 4 0 014 3.999z" />
                                        </svg>
                                        {club.distance}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="section">
                            <h2>Sobre el club</h2>
                            <p>{club.description}</p>
                        </div>

                        {/* Amenities */}
                        <div className="section">
                            <h2>Comodidades</h2>
                            <div className="amenities-grid">
                                {club.amenities.map((amenity, index) => (
                                    <div key={index} className="amenity-item">
                                        <span className="amenity-icon">{amenity.icon}</span>
                                        <span>{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Courts */}
                        <div className="section">
                            <h2>Canchas Disponibles</h2>
                            <div className="courts-list">
                                {club.courts.map((court) => (
                                    <div key={court.id} className="court-card">
                                        <div className="court-info">
                                            <h3>{court.name}</h3>
                                            <div className="court-details">
                                                <span className="court-type">{court.courtTypeName}</span>
                                                {court.hasLights && (
                                                    <span className="court-feature">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                                            <path d="M7 0a1 1 0 011 1v1a1 1 0 11-2 0V1a1 1 0 011-1zm4.95 2.05a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM13 7a1 1 0 011 1 1 1 0 01-1 1h-1a1 1 0 110-2h1zm-2.05 4.95a1 1 0 011.414 0 1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707zM7 11a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.95.05a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM2 7a1 1 0 110 2H1a1 1 0 110-2h1zm.05-4.95a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM7 3a4 4 0 100 8 4 4 0 000-8z" />
                                                        </svg>
                                                        Iluminación
                                                    </span>
                                                )}
                                                <span className={`availability ${court.availability}`}>
                                                    {court.availability}
                                                </span>
                                            </div>
                                            <div className="court-pricing">
                                                <div className="price-option">
                                                    <span className="duration">1 hora</span>
                                                    <span className="price">{formatPrice(court.pricing['1h'])}</span>
                                                </div>
                                                <div className="price-option">
                                                    <span className="duration">1.5 horas</span>
                                                    <span className="price">{formatPrice(court.pricing['1.5h'])}</span>
                                                </div>
                                                <div className="price-option">
                                                    <span className="duration">2 horas</span>
                                                    <span className="price">{formatPrice(court.pricing['2h'])}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="btn-reserve"
                                            onClick={() => handleSelectCourt(court)}
                                        >
                                            Ver disponibilidad
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Policies */}
                        <div className="section">
                            <h2>Políticas y Condiciones</h2>
                            <div className="policies">
                                <div className="policy-item">
                                    <h4>💳 Forma de Pago</h4>
                                    <p>
                                        Se cobra una <strong>seña del {club.pricing.depositPercentage}%</strong> online al reservar.
                                        El saldo restante se abona en el club.
                                        <span className="highlight">Si pagás el saldo en efectivo, tenés un {club.pricing.cashDiscountPercentage}% de descuento.</span>
                                    </p>
                                </div>
                                <div className="policy-item">
                                    <h4>❌ Cancelaciones</h4>
                                    <p>{club.policies.cancellationPolicy}</p>
                                </div>
                                <div className="policy-item">
                                    <h4>🌧️ Política de Lluvia</h4>
                                    <p>{club.policies.rainPolicy}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="club-sidebar">
                        <div className="sticky-card">
                            <div className="contact-info">
                                <h3>Información de Contacto</h3>
                                <div className="contact-item">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 1a3 3 0 100 6 3 3 0 000-6zM4 4a4 4 0 114.5 3.969V13.5a.5.5 0 01-1 0V7.97A4 4 0 014 3.999z" />
                                    </svg>
                                    <span>{club.address}</span>
                                </div>
                                <div className="contact-item">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 1v10h10V4H4z" />
                                    </svg>
                                    <span>{club.phone}</span>
                                </div>
                                <div className="contact-item">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                        <path d="M2 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v.217l6 3.5 6-3.5V5a1 1 0 00-1-1H4z" />
                                    </svg>
                                    <span>{club.email}</span>
                                </div>
                            </div>

                            <button className="btn-primary btn-block">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 1a3 3 0 100 6 3 3 0 000-6zM4 4a4 4 0 114.5 3.969V13.5a.5.5 0 01-1 0V7.97A4 4 0 014 3.999z" />
                                </svg>
                                Ver en el mapa
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal - TODO: Crear componente separado */}
        </div>
    );
};

export default ClubDetailPage;