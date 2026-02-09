import React, { useState } from 'react';
import './Header.css';

const Header = ({ user, onLogout, onNavigate }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleNavClick = (tab) => {
        if (onNavigate) {
            onNavigate(tab);
        }
        setShowUserMenu(false);
    };

    return (
        <header className="header">
            <div className="container-fluid">
                <div className="header-content">
                    {/* Logo */}
                    <div className="header-logo" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
                        <div className="logo-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <circle cx="16" cy="16" r="14" fill="#FFD700" stroke="#00A86B" strokeWidth="2" />
                                <path d="M8 16 Q16 8 24 16 Q16 24 8 16" stroke="#00A86B" strokeWidth="2" fill="none" />
                            </svg>
                        </div>
                        <span className="logo-text">Tennis Booking</span>
                    </div>

                    {/* Navigation */}
                    <nav className="header-nav">
                        <button className="nav-link active" onClick={() => handleNavClick('home')}>Inicio</button>
                        <button className="nav-link" onClick={() => handleNavClick('search')}>Jugadores</button>
                        <button className="nav-link" onClick={() => handleNavClick('bookings')}>Mensajes</button>
                        <button className="nav-link" onClick={() => handleNavClick('tournaments')}>Torneos</button>
                    </nav>

                    {/* User Menu */}
                    <div className="header-actions">
                        {user ? (
                            <div className="user-menu">
                                <button
                                    className="user-button"
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                >
                                    <div className="user-avatar">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} />
                                        ) : (
                                            <span>{user.name?.charAt(0)}</span>
                                        )}
                                    </div>
                                    <span className="user-name">{user.name}</span>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className={`chevron ${showUserMenu ? 'open' : ''}`}
                                    >
                                        <path d="M4 6l4 4 4-4" />
                                    </svg>
                                </button>

                                {showUserMenu && (
                                    <div className="user-dropdown">
                                        <button className="dropdown-item" onClick={() => handleNavClick('profile')}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM12.5 14a.5.5 0 00.5-.5c0-2.5-2-4.5-5-4.5s-5 2-5 4.5a.5.5 0 00.5.5h9z" />
                                            </svg>
                                            Mi Perfil
                                        </button>
                                        <button className="dropdown-item" onClick={() => handleNavClick('profile')}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M4 2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 3h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z" />
                                            </svg>
                                            Mis Reservas
                                        </button>
                                        <button className="dropdown-item" onClick={() => handleNavClick('bookings')}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 1a5 5 0 00-5 5v2.586l-.707.707A1 1 0 003 11h10a1 1 0 00.707-1.707L13 8.586V6a5 5 0 00-5-5z" />
                                            </svg>
                                            Mensajes
                                        </button>
                                        <hr className="dropdown-divider" />
                                        <button onClick={() => { setShowUserMenu(false); if (onLogout) onLogout(); }} className="dropdown-item logout">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M6 12.5a.5.5 0 00.5.5h8a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5h-8a.5.5 0 00-.5.5v2a.5.5 0 01-1 0v-2A1.5 1.5 0 016.5 2h8A1.5 1.5 0 0116 3.5v9a1.5 1.5 0 01-1.5 1.5h-8A1.5 1.5 0 015 12.5v-2a.5.5 0 011 0v2z" />
                                                <path d="M.146 8.354a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L1.707 7.5H10.5a.5.5 0 010 1H1.707l2.147 2.146a.5.5 0 01-.708.708l-3-3z" />
                                            </svg>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <button className="btn-secondary" onClick={() => handleNavClick('login')}>Ingresar</button>
                                <button className="btn-primary" onClick={() => handleNavClick('register')}>Registrarse</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;