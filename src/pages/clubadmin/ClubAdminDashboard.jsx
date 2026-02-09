import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CourtsSection from './sections/CourtsSection';
import ScheduleSection from './sections/ScheduleSection';
import PricingSection from './sections/PricingSection';
import BlocksSection from './sections/BlocksSection';
import BookingsSection from './sections/BookingsSection';
import IdentitySection from './sections/IdentitySection';
import TournamentsSection from './sections/TournamentsSection';
import './ClubAdminDashboard.css';

const ClubAdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeSection, setActiveSection] = useState('dashboard');

    // ============ STATE CENTRALIZADO DEL CLUB ============
    const [clubIdentity, setClubIdentity] = useState({
        name: 'Club River Plate',
        description: '',
        address: '',
        phone: '',
        email: '',
        coverImage: null,
        logo: null,
        gallery: [],
        amenities: ['vestuarios', 'estacionamiento'],
        website: '',
        instagram: '',
        facebook: '',
        whatsapp: '',
    });

    const [courts, setCourts] = useState([
        {
            id: 1,
            name: 'Cancha 1',
            sport: 'tennis',
            surface: 'clay',
            surfaceName: 'Polvo de ladrillo',
            covered: false,
            hasLights: true,
            status: 'active',
            image: null,
        },
        {
            id: 2,
            name: 'Cancha 2',
            sport: 'tennis',
            surface: 'hard',
            surfaceName: 'Cemento',
            covered: false,
            hasLights: true,
            status: 'active',
            image: null,
        }
    ]);

    const [schedule, setSchedule] = useState({
        monday: { active: true, shifts: [{ start: '08:00', end: '23:00' }] },
        tuesday: { active: true, shifts: [{ start: '08:00', end: '23:00' }] },
        wednesday: { active: true, shifts: [{ start: '08:00', end: '23:00' }] },
        thursday: { active: true, shifts: [{ start: '08:00', end: '23:00' }] },
        friday: { active: true, shifts: [{ start: '08:00', end: '23:00' }] },
        saturday: { active: true, shifts: [{ start: '09:00', end: '22:00' }] },
        sunday: { active: true, shifts: [{ start: '09:00', end: '20:00' }] },
        slotInterval: 30,
    });

    const [pricing, setPricing] = useState({
        depositPercentage: 30,
        cashDiscountPercentage: 5,
        basePrices: {},
        timeRules: [],
    });

    const [blocks, setBlocks] = useState([]);

    // ============ STATS (mock) ============
    const stats = {
        todayBookings: 12,
        monthRevenue: 850000,
        occupancyRate: 68,
        activeBookings: 5,
    };

    // ============ MENU ============
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', badge: null },
        { id: 'bookings', label: 'Reservas', icon: '📅', badge: stats.activeBookings },
        { id: 'courts', label: 'Mis Canchas', icon: '🎾', badge: courts.length },
        { id: 'schedule', label: 'Horarios', icon: '⏰', badge: null },
        { id: 'pricing', label: 'Precios', icon: '💰', badge: null },
        { id: 'blocks', label: 'Bloqueos', icon: '🚫', badge: null },
        { id: 'identity', label: 'Mi Club', icon: '🏢', badge: null },
        { id: 'tournaments', label: 'Torneos', icon: '🏆', badge: null },
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // ============ DASHBOARD VIEW ============
    const renderDashboard = () => (
        <div className="dashboard-content">
            <div className="welcome-section">
                <div>
                    <h1>Bienvenido, {clubIdentity.name}</h1>
                    <p>Panel de administración del club</p>
                </div>
                <button className="btn-primary btn-large" onClick={() => setActiveSection('bookings')}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Ver Reservas
                </button>
            </div>

            <div className="kpi-grid">
                <div className="kpi-card blue">
                    <div className="kpi-icon">📅</div>
                    <div className="kpi-content">
                        <h3>{stats.todayBookings}</h3>
                        <p>Reservas de Hoy</p>
                    </div>
                </div>
                <div className="kpi-card green">
                    <div className="kpi-icon">💰</div>
                    <div className="kpi-content">
                        <h3>{formatCurrency(stats.monthRevenue)}</h3>
                        <p>Ingresos del Mes</p>
                    </div>
                </div>
                <div className="kpi-card orange">
                    <div className="kpi-icon">📊</div>
                    <div className="kpi-content">
                        <h3>{stats.occupancyRate}%</h3>
                        <p>Ocupación Promedio</p>
                    </div>
                </div>
                <div className="kpi-card purple">
                    <div className="kpi-icon">🔔</div>
                    <div className="kpi-content">
                        <h3>{stats.activeBookings}</h3>
                        <p>Reservas Activas</p>
                    </div>
                </div>
            </div>

            <div className="quick-actions-section">
                <h2>Acciones Rápidas</h2>
                <div className="actions-grid">
                    <button className="action-card" onClick={() => setActiveSection('courts')}>
                        <div className="action-icon" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF5252)' }}>🎾</div>
                        <h3>Gestionar Canchas</h3>
                        <p>Agregar, editar o eliminar canchas</p>
                    </button>
                    <button className="action-card" onClick={() => setActiveSection('schedule')}>
                        <div className="action-icon" style={{ background: 'linear-gradient(135deg, #4ECDC4, #44A08D)' }}>⏰</div>
                        <h3>Configurar Horarios</h3>
                        <p>Definir días y horarios de apertura</p>
                    </button>
                    <button className="action-card" onClick={() => setActiveSection('pricing')}>
                        <div className="action-icon" style={{ background: 'linear-gradient(135deg, #F7B731, #FFA502)' }}>💰</div>
                        <h3>Definir Precios</h3>
                        <p>Configurar precios por duración</p>
                    </button>
                    <button className="action-card" onClick={() => setActiveSection('blocks')}>
                        <div className="action-icon" style={{ background: 'linear-gradient(135deg, #A29BFE, #6C5CE7)' }}>🚫</div>
                        <h3>Gestionar Bloqueos</h3>
                        <p>Clases fijas, mantenimiento, eventos</p>
                    </button>
                </div>
            </div>

            <div className="recent-activity-section">
                <h2>Actividad Reciente</h2>
                <div className="activity-list">
                    <div className="activity-item">
                        <div className="activity-icon new">📅</div>
                        <div className="activity-content">
                            <strong>Nueva Reserva</strong>
                            <p>Juan Pérez reservó Cancha 1 para hoy 18:00</p>
                            <span className="activity-time">Hace 5 minutos</span>
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-icon cancel">❌</div>
                        <div className="activity-content">
                            <strong>Cancelación</strong>
                            <p>María González canceló su reserva de mañana</p>
                            <span className="activity-time">Hace 1 hora</span>
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-icon payment">💳</div>
                        <div className="activity-content">
                            <strong>Pago Recibido</strong>
                            <p>Seña de $3,500 - Reserva #1234</p>
                            <span className="activity-time">Hace 2 horas</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // ============ RENDER SECTION ============
    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return renderDashboard();
            case 'courts':
                return <CourtsSection courts={courts} setCourts={setCourts} />;
            case 'schedule':
                return <ScheduleSection schedule={schedule} setSchedule={setSchedule} />;
            case 'pricing':
                return <PricingSection courts={courts} pricing={pricing} setPricing={setPricing} />;
            case 'blocks':
                return <BlocksSection courts={courts} blocks={blocks} setBlocks={setBlocks} />;
            case 'bookings':
                return <BookingsSection courts={courts} />;
            case 'identity':
                return <IdentitySection identity={clubIdentity} setIdentity={setClubIdentity} />;
            case 'tournaments':
                return <TournamentsSection />;
            default:
                return renderDashboard();
        }
    };

    return (
        <div className="club-admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <div className="club-logo">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <circle cx="20" cy="20" r="18" fill="#FFD700" stroke="#00A86B" strokeWidth="2" />
                            <path d="M10 20 Q20 10 30 20 Q20 30 10 20" stroke="#00A86B" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                    <div className="club-info">
                        <h3>{clubIdentity.name}</h3>
                        <span className="club-role">Administrador</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => setActiveSection(item.id)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                            {item.badge && <span className="nav-badge">{item.badge}</span>}
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="btn-secondary btn-block" onClick={logout}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M3 2a1 1 0 00-1 1v10a1 1 0 001 1h4a1 1 0 001-1V3a1 1 0 00-1-1H3zm7.5 2.5a.5.5 0 01.5-.5h2a.5.5 0 01.354.854l-2 2a.5.5 0 01-.708-.708L11.293 5H10.5a.5.5 0 01-.5-.5z" />
                        </svg>
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <div className="main-content">
                    {renderSection()}
                </div>
            </main>
        </div>
    );
};

export default ClubAdminDashboard;