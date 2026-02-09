import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './CEODashboard.css';

const CEODashboard = () => {
    const { logout } = useAuth();
    const [activeSection, setActiveSection] = useState('dashboard');
    const [clubFilter, setClubFilter] = useState('all');
    const [playerFilter, setPlayerFilter] = useState('all');
    const [selectedClub, setSelectedClub] = useState(null);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [showCommissionModal, setShowCommissionModal] = useState(null);
    const [showModAction, setShowModAction] = useState(null);
    const [reportPeriod, setReportPeriod] = useState('month');

    // ============ MOCK DATA ============
    const kpis = {
        totalRevenue: 12450000, monthRevenue: 3200000, prevMonthRevenue: 2800000,
        totalBookings: 10234, monthBookings: 1890, prevMonthBookings: 1650,
        totalUsers: 5420, monthNewUsers: 312, prevMonthNewUsers: 280,
        totalClubs: 156, activeClubs: 142, pendingClubs: 8,
        avgOccupancy: 72, totalCourts: 534, totalTournaments: 45,
        commission: 15, monthCommission: 480000,
    };

    const clubs = [
        { id: 1, name: 'Club Atlético River Plate', owner: 'Juan Martínez', email: 'admin@river.com', phone: '+54 11 4789-1234', courts: 6, bookingsMonth: 245, revenue: 856000, commission: 128400, status: 'active', plan: 'premium', joinDate: '2025-06-15', rating: 4.8, occupancy: 78 },
        { id: 2, name: 'Lawn Tennis Club', owner: 'María García', email: 'admin@ltc.com', phone: '+54 11 4555-5678', courts: 8, bookingsMonth: 312, revenue: 1200000, commission: 180000, status: 'active', plan: 'premium', joinDate: '2025-05-20', rating: 4.9, occupancy: 85 },
        { id: 3, name: 'Buenos Aires Tenis Club', owner: 'Roberto López', email: 'admin@batc.com', phone: '+54 11 4333-9012', courts: 10, bookingsMonth: 189, revenue: 650000, commission: 97500, status: 'active', plan: 'standard', joinDate: '2025-07-01', rating: 4.7, occupancy: 62 },
        { id: 4, name: 'Club Náutico Hacoaj', owner: 'Ana Fernández', email: 'admin@hacoaj.com', phone: '+54 11 4222-3456', courts: 4, bookingsMonth: 98, revenue: 320000, commission: 48000, status: 'active', plan: 'basic', joinDate: '2025-08-10', rating: 4.6, occupancy: 55 },
        { id: 5, name: 'Tenis Club Palermo', owner: 'Diego Sánchez', email: 'admin@tcp.com', phone: '+54 11 4111-7890', courts: 3, bookingsMonth: 0, revenue: 0, commission: 0, status: 'pending', plan: 'basic', joinDate: '2026-02-01', rating: 0, occupancy: 0 },
        { id: 6, name: 'Club Deportivo Norte', owner: 'Laura Torres', email: 'admin@cdn.com', phone: '+54 11 4666-1234', courts: 5, bookingsMonth: 0, revenue: 0, commission: 0, status: 'pending', plan: 'standard', joinDate: '2026-02-05', rating: 0, occupancy: 0 },
        { id: 7, name: 'Racquet Club', owner: 'Pedro Ruiz', email: 'admin@racquet.com', phone: '+54 11 4777-5678', courts: 6, bookingsMonth: 145, revenue: 480000, commission: 72000, status: 'suspended', plan: 'premium', joinDate: '2025-04-01', rating: 3.2, occupancy: 40 },
    ];

    const players = [
        { id: 1, name: 'Carlos Martínez', email: 'carlos@test.com', avatar: 'https://i.pravatar.cc/150?img=11', level: 'advanced', bookings: 34, spent: 125000, joinDate: '2025-07-01', status: 'active', reports: 0 },
        { id: 2, name: 'Ana López', email: 'ana@test.com', avatar: 'https://i.pravatar.cc/150?img=5', level: 'intermediate', bookings: 22, spent: 78000, joinDate: '2025-08-15', status: 'active', reports: 0 },
        { id: 3, name: 'Roberto Sánchez', email: 'roberto@test.com', avatar: 'https://i.pravatar.cc/150?img=12', level: 'professional', bookings: 56, spent: 245000, joinDate: '2025-05-20', status: 'active', reports: 0 },
        { id: 4, name: 'Diego Pérez', email: 'diego@test.com', avatar: 'https://i.pravatar.cc/150?img=15', level: 'beginner', bookings: 8, spent: 28000, joinDate: '2025-11-01', status: 'active', reports: 1 },
        { id: 5, name: 'Lucía Fernández', email: 'lucia@test.com', avatar: 'https://i.pravatar.cc/150?img=9', level: 'advanced', bookings: 41, spent: 178000, joinDate: '2025-06-10', status: 'active', reports: 0 },
        { id: 6, name: 'Valentina Torres', email: 'valentina@test.com', avatar: 'https://i.pravatar.cc/150?img=20', level: 'beginner', bookings: 3, spent: 9500, joinDate: '2026-01-15', status: 'active', reports: 0 },
        { id: 7, name: 'Camila Herrera', email: 'camila@test.com', avatar: 'https://i.pravatar.cc/150?img=23', level: 'professional', bookings: 67, spent: 310000, joinDate: '2025-04-01', status: 'active', reports: 0 },
        { id: 8, name: 'UsuarioSpam', email: 'spam@fake.com', avatar: '', level: 'beginner', bookings: 0, spent: 0, joinDate: '2026-02-01', status: 'suspended', reports: 5 },
    ];

    const moderationItems = [
        { id: 1, type: 'report_user', reporter: 'Ana López', reported: 'UsuarioSpam', reason: 'Spam y mensajes ofensivos', date: '2026-02-08', status: 'pending', details: 'Envía mensajes masivos con links sospechosos a múltiples jugadores.' },
        { id: 2, type: 'report_content', reporter: 'Carlos Martínez', content: 'Publicación ofensiva en el feed', reason: 'Contenido inapropiado', date: '2026-02-07', status: 'pending', details: 'Publicación con lenguaje ofensivo y discriminatorio.' },
        { id: 3, type: 'report_club', reporter: 'Lucía Fernández', reported: 'Racquet Club', reason: 'Canchas en mal estado', date: '2026-02-05', status: 'reviewed', details: 'Las canchas no están en condiciones. Cobran pero no mantienen.' },
        { id: 4, type: 'report_user', reporter: 'Diego Pérez', reported: 'Fernando Ruiz', reason: 'No se presentó al partido', date: '2026-02-03', status: 'dismissed', details: 'Reservó cancha y no se presentó, perdí mi tiempo.' },
    ];

    const revenueChartData = [
        { month: 'Sep', value: 1800000 }, { month: 'Oct', value: 2100000 }, { month: 'Nov', value: 2400000 },
        { month: 'Dic', value: 2650000 }, { month: 'Ene', value: 2800000 }, { month: 'Feb', value: 3200000 },
    ];

    const userGrowthData = [
        { month: 'Sep', value: 3200 }, { month: 'Oct', value: 3650 }, { month: 'Nov', value: 4100 },
        { month: 'Dic', value: 4500 }, { month: 'Ene', value: 5100 }, { month: 'Feb', value: 5420 },
    ];

    const formatCurrency = (n) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n);
    const pctChange = (curr, prev) => { const pct = ((curr - prev) / prev * 100).toFixed(1); return pct >= 0 ? `+${pct}%` : `${pct}%`; };
    const getLevelLabel = (l) => ({ beginner: '🌱', intermediate: '📈', advanced: '⭐', professional: '🏆' }[l] || '');
    const getPlanInfo = (p) => ({ basic: { label: 'Básico', bg: '#f0f0f0', color: '#888' }, standard: { label: 'Standard', bg: '#DBEAFE', color: '#3B82F6' }, premium: { label: 'Premium', bg: '#FEF3C7', color: '#D97706' } }[p]);

    // Simple bar chart component
    const BarChart = ({ data, color, formatValue }) => {
        const max = Math.max(...data.map(d => d.value));
        return (
            <div className="bar-chart">
                {data.map((d, i) => (
                    <div key={i} className="bar-col">
                        <div className="bar-value">{formatValue ? formatValue(d.value) : d.value}</div>
                        <div className="bar-track">
                            <div className="bar-fill" style={{ height: `${(d.value / max) * 100}%`, background: color }} />
                        </div>
                        <div className="bar-label">{d.month}</div>
                    </div>
                ))}
            </div>
        );
    };

    // ============ DASHBOARD ============
    const renderDashboard = () => (
        <div className="ceo-dashboard">
            {/* Header */}
            <div className="ceo-header">
                <div>
                    <h1>Panel CEO</h1>
                    <p>Tennis Booking · Vista global de la plataforma</p>
                </div>
                <button className="ceo-logout" onClick={logout}>Cerrar Sesión</button>
            </div>

            {/* KPI Cards */}
            <div className="kpi-grid-ceo">
                <div className="kpi-card-ceo green" onClick={() => setActiveSection('stats')}>
                    <div className="kpi-icon-ceo">💰</div>
                    <div>
                        <h3>{formatCurrency(kpis.monthRevenue)}</h3>
                        <p>Ingresos del mes</p>
                        <span className="kpi-change positive">{pctChange(kpis.monthRevenue, kpis.prevMonthRevenue)}</span>
                    </div>
                </div>
                <div className="kpi-card-ceo blue" onClick={() => setActiveSection('stats')}>
                    <div className="kpi-icon-ceo">📅</div>
                    <div>
                        <h3>{kpis.monthBookings.toLocaleString()}</h3>
                        <p>Reservas del mes</p>
                        <span className="kpi-change positive">{pctChange(kpis.monthBookings, kpis.prevMonthBookings)}</span>
                    </div>
                </div>
                <div className="kpi-card-ceo purple" onClick={() => setActiveSection('players')}>
                    <div className="kpi-icon-ceo">👥</div>
                    <div>
                        <h3>{kpis.totalUsers.toLocaleString()}</h3>
                        <p>Usuarios totales</p>
                        <span className="kpi-change positive">+{kpis.monthNewUsers} este mes</span>
                    </div>
                </div>
                <div className="kpi-card-ceo orange" onClick={() => setActiveSection('clubs')}>
                    <div className="kpi-icon-ceo">🏢</div>
                    <div>
                        <h3>{kpis.totalClubs}</h3>
                        <p>Clubes registrados</p>
                        <span className="kpi-change">{kpis.pendingClubs} pendientes</span>
                    </div>
                </div>
            </div>

            {/* Secondary KPIs */}
            <div className="kpi-row-secondary">
                <div className="kpi-mini"><span>📊</span><div><strong>{kpis.avgOccupancy}%</strong><p>Ocupación prom.</p></div></div>
                <div className="kpi-mini"><span>🎾</span><div><strong>{kpis.totalCourts}</strong><p>Canchas totales</p></div></div>
                <div className="kpi-mini"><span>🏆</span><div><strong>{kpis.totalTournaments}</strong><p>Torneos</p></div></div>
                <div className="kpi-mini"><span>💳</span><div><strong>{formatCurrency(kpis.monthCommission)}</strong><p>Comisión del mes</p></div></div>
            </div>

            {/* Navigation Cards */}
            <h2 className="ceo-section-title">Gestión de la Plataforma</h2>
            <div className="nav-cards-grid">
                {[
                    { id: 'clubs', icon: '🏢', title: 'Clubes', desc: `${kpis.totalClubs} registrados · ${kpis.pendingClubs} pendientes`, color: '#FF6B6B' },
                    { id: 'players', icon: '👥', title: 'Jugadores', desc: `${kpis.totalUsers.toLocaleString()} usuarios activos`, color: '#4ECDC4' },
                    { id: 'stats', icon: '📊', title: 'Estadísticas', desc: 'Gráficos de ingresos y crecimiento', color: '#45B7D1' },
                    { id: 'commissions', icon: '💳', title: 'Comisiones', desc: 'Gestión de planes y comisiones', color: '#F7B731' },
                    { id: 'reports', icon: '📄', title: 'Reportes', desc: 'Exportar datos de la plataforma', color: '#6C5CE7' },
                    { id: 'moderation', icon: '🛡️', title: 'Moderación', desc: `${moderationItems.filter(m => m.status === 'pending').length} denuncias pendientes`, color: '#E17055' },
                ].map(card => (
                    <button key={card.id} className="nav-card-ceo" onClick={() => setActiveSection(card.id)}>
                        <div className="nav-card-icon" style={{ background: card.color }}>{card.icon}</div>
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                    </button>
                ))}
            </div>
        </div>
    );

    // ============ CLUBS SECTION ============
    const renderClubs = () => {
        const filtered = clubFilter === 'all' ? clubs : clubs.filter(c => c.status === clubFilter);
        return (
            <div>
                <div className="section-back-header">
                    <button className="ceo-back" onClick={() => { setActiveSection('dashboard'); setSelectedClub(null); }}>← Volver</button>
                    <h2>🏢 Clubes Registrados</h2>
                </div>

                {selectedClub ? (
                    <div className="detail-panel">
                        <button className="detail-close" onClick={() => setSelectedClub(null)}>← Lista</button>
                        <div className="detail-header-card">
                            <h2>{selectedClub.name}</h2>
                            <span className={`status-badge ${selectedClub.status}`}>{selectedClub.status === 'active' ? '✅ Activo' : selectedClub.status === 'pending' ? '⏳ Pendiente' : '⛔ Suspendido'}</span>
                        </div>
                        <div className="detail-grid">
                            <div className="detail-item"><span>👤 Dueño</span><strong>{selectedClub.owner}</strong></div>
                            <div className="detail-item"><span>📧 Email</span><strong>{selectedClub.email}</strong></div>
                            <div className="detail-item"><span>📞 Teléfono</span><strong>{selectedClub.phone}</strong></div>
                            <div className="detail-item"><span>📅 Registro</span><strong>{selectedClub.joinDate}</strong></div>
                            <div className="detail-item"><span>🎾 Canchas</span><strong>{selectedClub.courts}</strong></div>
                            <div className="detail-item"><span>📊 Ocupación</span><strong>{selectedClub.occupancy}%</strong></div>
                            <div className="detail-item"><span>⭐ Rating</span><strong>{selectedClub.rating || '-'}</strong></div>
                            <div className="detail-item"><span>💼 Plan</span><strong>{getPlanInfo(selectedClub.plan).label}</strong></div>
                            <div className="detail-item"><span>📅 Reservas/mes</span><strong>{selectedClub.bookingsMonth}</strong></div>
                            <div className="detail-item"><span>💰 Facturación/mes</span><strong>{formatCurrency(selectedClub.revenue)}</strong></div>
                            <div className="detail-item"><span>💳 Comisión/mes</span><strong>{formatCurrency(selectedClub.commission)}</strong></div>
                        </div>
                        <div className="detail-actions">
                            {selectedClub.status === 'pending' && <button className="btn-approve">✅ Aprobar Club</button>}
                            {selectedClub.status === 'active' && <button className="btn-suspend">⛔ Suspender</button>}
                            {selectedClub.status === 'suspended' && <button className="btn-approve">✅ Reactivar</button>}
                            <button className="btn-delete">🗑️ Eliminar</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="filter-bar-ceo">
                            {[{ k: 'all', l: `Todos (${clubs.length})` }, { k: 'active', l: `✅ Activos (${clubs.filter(c => c.status === 'active').length})` }, { k: 'pending', l: `⏳ Pendientes (${clubs.filter(c => c.status === 'pending').length})` }, { k: 'suspended', l: `⛔ Suspendidos (${clubs.filter(c => c.status === 'suspended').length})` }].map(f => (
                                <button key={f.k} className={`ceo-chip ${clubFilter === f.k ? 'active' : ''}`} onClick={() => setClubFilter(f.k)}>{f.l}</button>
                            ))}
                        </div>
                        <div className="data-table">
                            <div className="table-header">
                                <span className="col-wide">Club</span><span>Plan</span><span>Canchas</span><span>Reservas/mes</span><span>Facturación</span><span>Estado</span>
                            </div>
                            {filtered.map(c => {
                                const plan = getPlanInfo(c.plan);
                                return (
                                    <button key={c.id} className="table-row" onClick={() => setSelectedClub(c)}>
                                        <span className="col-wide"><strong>{c.name}</strong><br /><small>{c.owner}</small></span>
                                        <span><span className="plan-badge" style={{ background: plan.bg, color: plan.color }}>{plan.label}</span></span>
                                        <span>{c.courts}</span>
                                        <span>{c.bookingsMonth}</span>
                                        <span>{formatCurrency(c.revenue)}</span>
                                        <span><span className={`status-dot ${c.status}`} />{c.status === 'active' ? 'Activo' : c.status === 'pending' ? 'Pendiente' : 'Suspendido'}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        );
    };

    // ============ PLAYERS SECTION ============
    const renderPlayers = () => {
        const filtered = playerFilter === 'all' ? players : players.filter(p => p.status === playerFilter);
        return (
            <div>
                <div className="section-back-header">
                    <button className="ceo-back" onClick={() => { setActiveSection('dashboard'); setSelectedPlayer(null); }}>← Volver</button>
                    <h2>👥 Jugadores Registrados</h2>
                </div>
                <div className="filter-bar-ceo">
                    {[{ k: 'all', l: `Todos (${players.length})` }, { k: 'active', l: `Activos (${players.filter(p => p.status === 'active').length})` }, { k: 'suspended', l: `Suspendidos (${players.filter(p => p.status === 'suspended').length})` }].map(f => (
                        <button key={f.k} className={`ceo-chip ${playerFilter === f.k ? 'active' : ''}`} onClick={() => setPlayerFilter(f.k)}>{f.l}</button>
                    ))}
                </div>
                <div className="data-table">
                    <div className="table-header">
                        <span className="col-wide">Jugador</span><span>Nivel</span><span>Reservas</span><span>Gastó</span><span>Registro</span><span>Estado</span>
                    </div>
                    {filtered.map(p => (
                        <div key={p.id} className="table-row">
                            <span className="col-wide player-cell">
                                {p.avatar ? <img src={p.avatar} alt="" className="table-avatar" /> : <div className="table-avatar-placeholder">{p.name.charAt(0)}</div>}
                                <div><strong>{p.name}</strong><br /><small>{p.email}</small></div>
                            </span>
                            <span>{getLevelLabel(p.level)} {p.level}</span>
                            <span>{p.bookings}</span>
                            <span>{formatCurrency(p.spent)}</span>
                            <span>{p.joinDate}</span>
                            <span>
                                <span className={`status-dot ${p.status}`} />
                                {p.status === 'active' ? 'Activo' : 'Suspendido'}
                                {p.reports > 0 && <span className="report-badge">⚠️ {p.reports}</span>}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // ============ STATS SECTION ============
    const renderStats = () => (
        <div>
            <div className="section-back-header">
                <button className="ceo-back" onClick={() => setActiveSection('dashboard')}>← Volver</button>
                <h2>📊 Estadísticas de la Plataforma</h2>
            </div>
            <div className="charts-grid">
                <div className="chart-card">
                    <h3>💰 Ingresos Mensuales</h3>
                    <BarChart data={revenueChartData} color="#00A86B" formatValue={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                </div>
                <div className="chart-card">
                    <h3>👥 Crecimiento de Usuarios</h3>
                    <BarChart data={userGrowthData} color="#3B82F6" formatValue={(v) => v.toLocaleString()} />
                </div>
            </div>
            <div className="stats-summary-cards">
                <div className="stat-summary"><h4>Total Histórico</h4><span className="stat-big">{formatCurrency(kpis.totalRevenue)}</span><p>en ingresos</p></div>
                <div className="stat-summary"><h4>Reservas Totales</h4><span className="stat-big">{kpis.totalBookings.toLocaleString()}</span><p>desde el inicio</p></div>
                <div className="stat-summary"><h4>Ocupación Promedio</h4><span className="stat-big">{kpis.avgOccupancy}%</span><p>en todos los clubes</p></div>
                <div className="stat-summary"><h4>Ticket Promedio</h4><span className="stat-big">{formatCurrency(Math.round(kpis.monthRevenue / kpis.monthBookings))}</span><p>por reserva</p></div>
            </div>
        </div>
    );

    // ============ COMMISSIONS SECTION ============
    const renderCommissions = () => (
        <div>
            <div className="section-back-header">
                <button className="ceo-back" onClick={() => setActiveSection('dashboard')}>← Volver</button>
                <h2>💳 Gestión de Comisiones</h2>
            </div>
            <div className="commission-overview">
                <div className="comm-card"><h4>Comisión Actual</h4><span className="comm-big">{kpis.commission}%</span><p>sobre cada reserva</p></div>
                <div className="comm-card"><h4>Recaudado este mes</h4><span className="comm-big green">{formatCurrency(kpis.monthCommission)}</span></div>
                <div className="comm-card"><h4>Clubes Premium</h4><span className="comm-big">{clubs.filter(c => c.plan === 'premium').length}</span><p>10% comisión</p></div>
                <div className="comm-card"><h4>Clubes Standard</h4><span className="comm-big">{clubs.filter(c => c.plan === 'standard').length}</span><p>15% comisión</p></div>
            </div>
            <h3 className="subsection-title">Planes disponibles</h3>
            <div className="plans-grid">
                {[
                    { name: 'Básico', price: 'Gratis', commission: '20%', features: ['Hasta 4 canchas', 'Panel básico', 'Soporte email'] },
                    { name: 'Standard', price: '$25.000/mes', commission: '15%', features: ['Hasta 10 canchas', 'Panel completo', 'Torneos', 'Soporte prioritario'] },
                    { name: 'Premium', price: '$50.000/mes', commission: '10%', features: ['Canchas ilimitadas', 'Panel completo', 'Torneos', 'Reportes avanzados', 'Soporte 24/7', 'Posición destacada'] },
                ].map((plan, i) => (
                    <div key={i} className={`plan-card ${i === 2 ? 'featured' : ''}`}>
                        <h4>{plan.name}</h4>
                        <div className="plan-price">{plan.price}</div>
                        <div className="plan-commission">Comisión: {plan.commission}</div>
                        <ul>{plan.features.map((f, fi) => <li key={fi}>✓ {f}</li>)}</ul>
                    </div>
                ))}
            </div>
            <h3 className="subsection-title">Comisión por Club</h3>
            <div className="data-table">
                <div className="table-header"><span className="col-wide">Club</span><span>Plan</span><span>Comisión</span><span>Facturación</span><span>Comisión $</span></div>
                {clubs.filter(c => c.status === 'active').map(c => {
                    const plan = getPlanInfo(c.plan);
                    return (
                        <div key={c.id} className="table-row">
                            <span className="col-wide"><strong>{c.name}</strong></span>
                            <span><span className="plan-badge" style={{ background: plan.bg, color: plan.color }}>{plan.label}</span></span>
                            <span>{c.plan === 'premium' ? '10%' : c.plan === 'standard' ? '15%' : '20%'}</span>
                            <span>{formatCurrency(c.revenue)}</span>
                            <span className="green-text">{formatCurrency(c.commission)}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // ============ REPORTS SECTION ============
    const renderReports = () => (
        <div>
            <div className="section-back-header">
                <button className="ceo-back" onClick={() => setActiveSection('dashboard')}>← Volver</button>
                <h2>📄 Reportes</h2>
            </div>
            <div className="report-period-selector">
                {[{ k: 'week', l: 'Última semana' }, { k: 'month', l: 'Último mes' }, { k: 'quarter', l: 'Último trimestre' }, { k: 'year', l: 'Último año' }].map(p => (
                    <button key={p.k} className={`ceo-chip ${reportPeriod === p.k ? 'active' : ''}`} onClick={() => setReportPeriod(p.k)}>{p.l}</button>
                ))}
            </div>
            <div className="reports-grid">
                {[
                    { icon: '💰', title: 'Reporte de Ingresos', desc: 'Ingresos, comisiones y facturación por club', format: 'Excel' },
                    { icon: '📅', title: 'Reporte de Reservas', desc: 'Detalle de todas las reservas del período', format: 'Excel' },
                    { icon: '👥', title: 'Reporte de Usuarios', desc: 'Nuevos registros, actividad y retención', format: 'Excel' },
                    { icon: '🏢', title: 'Reporte de Clubes', desc: 'Performance, ocupación y ranking por club', format: 'Excel' },
                    { icon: '🏆', title: 'Reporte de Torneos', desc: 'Torneos realizados, participantes e ingresos', format: 'PDF' },
                    { icon: '📊', title: 'Reporte General', desc: 'Resumen ejecutivo de la plataforma', format: 'PDF' },
                ].map((r, i) => (
                    <div key={i} className="report-card">
                        <div className="report-icon">{r.icon}</div>
                        <div className="report-info">
                            <h4>{r.title}</h4>
                            <p>{r.desc}</p>
                        </div>
                        <button className="btn-export" onClick={() => alert(`Exportando ${r.title} como ${r.format}...\n\n(Requiere backend para generar el archivo real)`)}>
                            📥 {r.format}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    // ============ MODERATION SECTION ============
    const renderModeration = () => (
        <div>
            <div className="section-back-header">
                <button className="ceo-back" onClick={() => setActiveSection('dashboard')}>← Volver</button>
                <h2>🛡️ Moderación</h2>
            </div>
            <div className="mod-stats">
                <div className="mod-stat"><span className="mod-stat-num" style={{ color: '#EF4444' }}>{moderationItems.filter(m => m.status === 'pending').length}</span><span>Pendientes</span></div>
                <div className="mod-stat"><span className="mod-stat-num" style={{ color: '#00A86B' }}>{moderationItems.filter(m => m.status === 'reviewed').length}</span><span>Revisadas</span></div>
                <div className="mod-stat"><span className="mod-stat-num" style={{ color: '#888' }}>{moderationItems.filter(m => m.status === 'dismissed').length}</span><span>Descartadas</span></div>
            </div>
            <div className="mod-list">
                {moderationItems.map(item => (
                    <div key={item.id} className={`mod-card ${item.status}`}>
                        <div className="mod-card-header">
                            <div className="mod-type">{item.type === 'report_user' ? '👤 Denuncia Usuario' : item.type === 'report_content' ? '📝 Contenido' : '🏢 Denuncia Club'}</div>
                            <span className={`mod-status ${item.status}`}>{item.status === 'pending' ? '⏳ Pendiente' : item.status === 'reviewed' ? '✅ Revisada' : '❌ Descartada'}</span>
                        </div>
                        <div className="mod-card-body">
                            <p><strong>Reportado por:</strong> {item.reporter}</p>
                            {item.reported && <p><strong>Reportado:</strong> {item.reported}</p>}
                            <p><strong>Motivo:</strong> {item.reason}</p>
                            <p className="mod-details">{item.details}</p>
                            <span className="mod-date">📅 {item.date}</span>
                        </div>
                        {item.status === 'pending' && (
                            <div className="mod-card-actions">
                                <button className="btn-mod-action" onClick={() => alert('Marcando como revisada...')}>✅ Marcar Revisada</button>
                                <button className="btn-mod-warn" onClick={() => alert('Enviando advertencia...')}>⚠️ Advertir</button>
                                <button className="btn-mod-ban" onClick={() => alert('Suspendiendo usuario/club...')}>⛔ Suspender</button>
                                <button className="btn-mod-dismiss" onClick={() => alert('Descartando denuncia...')}>❌ Descartar</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    // ============ RENDER ============
    return (
        <div className="ceo-layout">
            {activeSection === 'dashboard' && renderDashboard()}
            {activeSection === 'clubs' && renderClubs()}
            {activeSection === 'players' && renderPlayers()}
            {activeSection === 'stats' && renderStats()}
            {activeSection === 'commissions' && renderCommissions()}
            {activeSection === 'reports' && renderReports()}
            {activeSection === 'moderation' && renderModeration()}
        </div>
    );
};

export default CEODashboard;