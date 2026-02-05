import React, { useState } from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="header">
            <div className="container-fluid">
                <div className="header-content">
                    {/* Logo */}
                    <div className="header-logo">
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
                        <a href="/" className="nav-link active">Inicio</a>
                        <a href="/clubs" className="nav-link">Clubes</a>
                        <a href="/players" className="nav-link">Jugadores</a>
                        <a href="/challenges" className="nav-link">Desafíos</a>
                    </nav>

                    {/* User Menu */}
                    <div className="header-actions">
                        <button className="icon-button">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                            <span className="notification-badge">3</span>
                        </button>

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
                                        <a href="/profile" className="dropdown-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM12.5 14a.5.5 0 00.5-.5c0-2.5-2-4.5-5-4.5s-5 2-5 4.5a.5.5 0 00.5.5h9z" />
                                            </svg>
                                            Mi Perfil
                                        </a>
                                        <a href="/bookings" className="dropdown-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M4 2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H4zm1 3h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z" />
                                            </svg>
                                            Mis Reservas
                                        </a>
                                        <a href="/settings" className="dropdown-item">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 4.754a3.246 3.246 0 100 6.492 3.246 3.246 0 000-6.492zM5.754 8a2.246 2.246 0 114.492 0 2.246 2.246 0 01-4.492 0z" />
                                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 01-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 01-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 01.52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 011.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 011.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 01.52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 01-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 01-1.255-.52l-.094-.319z" />
                                            </svg>
                                            Configuración
                                        </a>
                                        <hr className="dropdown-divider" />
                                        <button onClick={onLogout} className="dropdown-item logout">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M3 2a1 1 0 00-1 1v10a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1H3zm7.5 2.5a.5.5 0 01.5-.5h2a.5.5 0 01.354.854l-2 2a.5.5 0 01-.708-.708L11.293 5H10.5a.5.5 0 01-.5-.5zM13 8a.5.5 0 01.5.5v2a.5.5 0 01-.854.354l-2-2a.5.5 0 01.708-.708L12.707 9.5H11.5a.5.5 0 010-1H13z" />
                                            </svg>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <a href="/login" className="btn-secondary">Ingresar</a>
                                <a href="/register" className="btn-primary">Registrarse</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;