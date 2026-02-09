import React from 'react';
import './BottomNavBar.css';

const BottomNavBar = ({ activeTab, onTabChange }) => {
    const tabs = [
        {
            id: 'home',
            label: 'Inicio',
            icon: (active) => (
                <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            ),
        },
        {
            id: 'search',
            label: 'Buscar',
            icon: (active) => (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
            ),
        },
        {
            id: 'bookings',
            label: 'Mensajes',
            icon: (active) => (
                <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
            ),
        },
        {
            id: 'tournaments',
            label: 'Torneos',
            icon: (active) => (
                <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 6 9 6 9zm12 0h1.5a2.5 2.5 0 000-5C17 4 18 9 18 9z" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0012 0V2z" />
                </svg>
            ),
        },
        {
            id: 'profile',
            label: 'Perfil',
            icon: (active) => (
                <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            ),
        },
    ];

    return (
        <nav className="bottom-nav-bar">
            {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        className={`bottom-nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        <span className="bottom-nav-icon">
                            {tab.icon(isActive)}
                        </span>
                        <span className="bottom-nav-label">{tab.label}</span>
                        {isActive && <span className="bottom-nav-indicator" />}
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNavBar;