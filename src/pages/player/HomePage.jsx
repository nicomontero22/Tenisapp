import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import SearchBar from '../../components/common/SearchBar';
import ClubCard from '../../components/club/ClubCard';
import './HomePage.css';

const HomePage = () => {
    const [user] = useState({
        name: 'Juan Pérez',
        email: 'juan@example.com',
        avatar: null
    });

    // Mock data de clubes
    const clubs = [
        {
            id: 1,
            name: 'Club Atlético River Plate',
            image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=600&h=400&fit=crop',
            rating: 4.8,
            reviewCount: 234,
            distance: '2.5 km',
            courts: 6,
            courtTypes: ['Polvo de ladrillo', 'Cemento'],
            pricePerHour: 3500,
            availability: 3,
            amenities: ['Vestuarios', 'Estacionamiento', 'Bar', 'Iluminación'],
            promocion: '20% OFF'
        },
        {
            id: 2,
            name: 'Lawn Tennis Club',
            image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&h=400&fit=crop',
            rating: 4.9,
            reviewCount: 456,
            distance: '3.8 km',
            courts: 8,
            courtTypes: ['Césped', 'Polvo de ladrillo'],
            pricePerHour: 4200,
            availability: 5,
            amenities: ['Vestuarios', 'Estacionamiento', 'Gimnasio', 'Cafetería', 'WiFi'],
            promocion: null
        },
        {
            id: 3,
            name: 'Buenos Aires Tenis Club',
            image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop',
            rating: 4.7,
            reviewCount: 189,
            distance: '5.2 km',
            courts: 10,
            courtTypes: ['Cemento', 'Sintético'],
            pricePerHour: 4800,
            availability: 0,
            amenities: ['Vestuarios', 'Pro Shop', 'Sauna'],
            promocion: null
        },
        {
            id: 4,
            name: 'Club Náutico Hacoaj',
            image: 'https://images.unsplash.com/photo-1617883861744-87c6734c8b29?w=600&h=400&fit=crop',
            rating: 4.6,
            reviewCount: 145,
            distance: '4.1 km',
            courts: 4,
            courtTypes: ['Polvo de ladrillo'],
            pricePerHour: 3200,
            availability: 2,
            amenities: ['Vestuarios', 'Estacionamiento', 'Piscina'],
            promocion: '2x1 Miércoles'
        },
        {
            id: 5,
            name: 'Tenis Argentino Quilmes',
            image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=600&h=400&fit=crop',
            rating: 4.5,
            reviewCount: 98,
            distance: '6.7 km',
            courts: 5,
            courtTypes: ['Cemento', 'Polvo de ladrillo'],
            pricePerHour: 2800,
            availability: 4,
            amenities: ['Vestuarios', 'Cantina'],
            promocion: null
        },
        {
            id: 6,
            name: 'Club Hindú',
            image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=600&h=400&fit=crop',
            rating: 4.9,
            reviewCount: 312,
            distance: '1.8 km',
            courts: 12,
            courtTypes: ['Polvo de ladrillo', 'Cemento', 'Césped'],
            pricePerHour: 5500,
            availability: 6,
            amenities: ['Vestuarios', 'Estacionamiento', 'Restaurant', 'Gimnasio', 'Spa', 'WiFi'],
            promocion: 'Happy Hour 14-16hs'
        }
    ];

    const handleViewDetails = (club) => {
        console.log('Ver detalles de:', club);
        // Aquí navegarías a la página de detalles del club
    };

    const handleLogout = () => {
        console.log('Cerrar sesión');
    };

    return (
        <div className="home-page">
            <Header user={user} onLogout={handleLogout} />

            {/* Hero Section con SearchBar */}
            <section className="hero-section">
                <SearchBar />

                <div className="hero-stats">
                    <div className="stat-card">
                        <div className="stat-icon clubs">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>150+</h3>
                            <p>Clubes disponibles</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon courts">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>500+</h3>
                            <p>Canchas para reservar</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon players">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>5,000+</h3>
                            <p>Jugadores activos</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon bookings">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>10,000+</h3>
                            <p>Reservas mensuales</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Clubes destacados */}
            <section className="clubs-section container">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Clubes Destacados</h2>
                        <p className="section-subtitle">Los mejores clubes cerca de ti</p>
                    </div>
                    <button className="view-all-btn">
                        Ver todos
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="clubs-grid">
                    {clubs.map(club => (
                        <ClubCard
                            key={club.id}
                            club={club}
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                </div>
            </section>

            {/* Banner CTA */}
            <section className="cta-banner">
                <div className="cta-content">
                    <div className="cta-text">
                        <h2>¿Sos administrador de un club?</h2>
                        <p>Sumá tu club a nuestra plataforma y llegá a miles de jugadores</p>
                    </div>
                    <button className="cta-button">
                        Registrar mi club
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>Tennis Booking</h4>
                            <p>La plataforma líder para reservar canchas de tenis en Argentina</p>
                        </div>
                        <div className="footer-section">
                            <h4>Enlaces</h4>
                            <a href="/">Inicio</a>
                            <a href="/clubes">Clubes</a>
                            <a href="/jugadores">Jugadores</a>
                            <a href="/desafios">Desafíos</a>
                        </div>
                        <div className="footer-section">
                            <h4>Soporte</h4>
                            <a href="/ayuda">Ayuda</a>
                            <a href="/terminos">Términos</a>
                            <a href="/privacidad">Privacidad</a>
                            <a href="/contacto">Contacto</a>
                        </div>
                        <div className="footer-section">
                            <h4>Seguinos</h4>
                            <div className="social-links">
                                <a href="#" aria-label="Facebook">FB</a>
                                <a href="#" aria-label="Instagram">IG</a>
                                <a href="#" aria-label="Twitter">TW</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 Tennis Booking. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;