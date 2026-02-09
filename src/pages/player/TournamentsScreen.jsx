import React, { useState, useMemo } from 'react';
import './TournamentsScreen.css';

const TournamentsScreen = () => {
    const [view, setView] = useState('list'); // list, detail, myTournaments
    const [selectedTournament, setSelectedTournament] = useState(null);
    const [detailTab, setDetailTab] = useState('info');
    const [filters, setFilters] = useState({ type: 'all', level: 'all', status: 'all' });
    const [showInscription, setShowInscription] = useState(false);
    const [inscriptionStep, setInscriptionStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [inscribed, setInscribed] = useState([3, 5]); // IDs of inscribed tournaments

    const tournaments = [
        {
            id: 1, name: 'Torneo Apertura River 2026', club: 'Club Atlético River Plate',
            clubImage: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=200',
            type: 'singles', level: 'all', surface: 'Polvo de ladrillo',
            startDate: '2026-03-15', endDate: '2026-03-22', inscriptionDeadline: '2026-03-10',
            price: 8500, maxPlayers: 32, currentPlayers: 24, status: 'open',
            description: 'Torneo de singles abierto a todas las categorías. Formato eliminación directa con cuadro de 32.',
            prizes: ['🥇 $50.000 + Trofeo', '🥈 $25.000', '🥉 $10.000 (x2)'],
            address: 'Av. Libertador 7395, Núñez, CABA',
            schedule: 'Partidos de 9:00 a 21:00',
            rules: 'Sets a 6 juegos con tiebreak. 3 sets para final.',
            bracket: null,
        },
        {
            id: 2, name: 'Copa Dobles Hindú', club: 'Club Hindú',
            clubImage: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=200',
            type: 'doubles', level: 'intermediate', surface: 'Cemento',
            startDate: '2026-03-08', endDate: '2026-03-09', inscriptionDeadline: '2026-03-05',
            price: 12000, maxPlayers: 16, currentPlayers: 14, status: 'open',
            description: 'Torneo de dobles nivel intermedio. Inscripción por pareja. 2 días de competencia.',
            prizes: ['🥇 $40.000/pareja', '🥈 $20.000/pareja'],
            address: 'Don Bosco 3575, Quilmes', schedule: 'Sábado y Domingo 9:00 a 20:00',
            rules: 'Super tiebreak en 3er set. Sin ventajas.',
            bracket: null,
        },
        {
            id: 3, name: 'Torneo Mixto Lawn Tennis', club: 'Lawn Tennis Club',
            clubImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=200',
            type: 'mixed', level: 'all', surface: 'Césped',
            startDate: '2026-02-20', endDate: '2026-02-23', inscriptionDeadline: '2026-02-15',
            price: 10000, maxPlayers: 16, currentPlayers: 16, status: 'in_progress',
            description: 'Torneo mixto en césped natural. Parejas hombre-mujer obligatorio.',
            prizes: ['🥇 $60.000/pareja + Copa', '🥈 $30.000/pareja'],
            address: 'Olleros 1510, Belgrano', schedule: 'Jueves a Domingo',
            rules: 'Sets cortos a 4 juegos. Tiebreak a 5-5.',
            bracket: {
                rounds: [
                    { name: 'Cuartos', matches: [
                        { p1: 'Martínez/López', p2: 'Sánchez/Torres', score: '6-3, 6-4', winner: 1 },
                        { p1: 'Pérez/Herrera', p2: 'González/Ruiz', score: '7-5, 4-6, 10-7', winner: 1 },
                        { p1: 'Aguirre/Fernández', p2: 'Vos/Pareja', score: '6-2, 6-1', winner: 1 },
                        { p1: 'Silva/Moreno', p2: 'Castro/Díaz', score: '3-6, 7-5, 10-5', winner: 2 },
                    ]},
                    { name: 'Semifinal', matches: [
                        { p1: 'Martínez/López', p2: 'Pérez/Herrera', score: null, winner: null },
                        { p1: 'Aguirre/Fernández', p2: 'Castro/Díaz', score: null, winner: null },
                    ]},
                    { name: 'Final', matches: [
                        { p1: 'Por definir', p2: 'Por definir', score: null, winner: null },
                    ]},
                ],
            },
        },
        {
            id: 4, name: 'Copa Principiantes BA Tenis', club: 'Buenos Aires Tenis Club',
            clubImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200',
            type: 'singles', level: 'beginner', surface: 'Cemento',
            startDate: '2026-04-01', endDate: '2026-04-03', inscriptionDeadline: '2026-03-25',
            price: 5000, maxPlayers: 16, currentPlayers: 8, status: 'open',
            description: 'Torneo exclusivo para principiantes. Ideal para tu primer torneo.',
            prizes: ['🥇 $20.000 + Raqueta', '🥈 $10.000'],
            address: 'Av. Bullrich 345, Palermo', schedule: 'Viernes a Domingo',
            rules: 'Sets a 4 juegos. Ambiente amigable.',
            bracket: null,
        },
        {
            id: 5, name: 'Masters Profesional Hacoaj', club: 'Club Náutico Hacoaj',
            clubImage: 'https://images.unsplash.com/photo-1617883861744-87c6734c8b29?w=200',
            type: 'singles', level: 'professional', surface: 'Polvo de ladrillo',
            startDate: '2026-01-10', endDate: '2026-01-15', inscriptionDeadline: '2026-01-05',
            price: 15000, maxPlayers: 32, currentPlayers: 32, status: 'finished',
            description: 'Torneo profesional con los mejores jugadores de la región.',
            prizes: ['🥇 $150.000 + Copa', '🥈 $75.000', '🥉 $30.000 (x2)'],
            address: 'Av. San Martín 2845, Tigre', schedule: '6 días de competencia',
            rules: 'Mejor de 3 sets. Formato Grand Slam en final.',
            bracket: {
                rounds: [
                    { name: 'Final', matches: [
                        { p1: 'Roberto Sánchez', p2: 'Camila Herrera', score: '6-4, 3-6, 7-5', winner: 1 },
                    ]},
                ],
            },
            results: [
                { position: 1, name: 'Roberto Sánchez', points: 500 },
                { position: 2, name: 'Camila Herrera', points: 300 },
                { position: 3, name: 'Carlos Martínez', points: 150 },
                { position: 3, name: 'Nicolás Aguirre', points: 150 },
            ],
        },
    ];

    const formatCurrency = (n) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n);
    const formatDate = (d) => new Date(d + 'T12:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });

    const getStatusInfo = (s) => ({
        open: { label: 'Inscripción abierta', color: '#00A86B', bg: '#E6F9F1', icon: '🟢' },
        in_progress: { label: 'En curso', color: '#3B82F6', bg: '#DBEAFE', icon: '🔵' },
        finished: { label: 'Finalizado', color: '#888', bg: '#f0f0f0', icon: '⚫' },
    }[s] || { label: s, color: '#888', bg: '#f0f0f0', icon: '⚪' });

    const getTypeLabel = (t) => ({ singles: '🎾 Singles', doubles: '👥 Dobles', mixed: '💑 Mixto' }[t] || t);
    const getLevelLabel = (l) => ({ all: '🌐 Todas', beginner: '🌱 Principiante', intermediate: '📈 Intermedio', advanced: '⭐ Avanzado', professional: '🏆 Pro' }[l] || l);

    const filtered = useMemo(() => {
        return tournaments.filter(t => {
            if (filters.type !== 'all' && t.type !== filters.type) return false;
            if (filters.level !== 'all' && t.level !== filters.level && t.level !== 'all') return false;
            if (filters.status !== 'all' && t.status !== filters.status) return false;
            return true;
        });
    }, [filters]);

    const myTournaments = tournaments.filter(t => inscribed.includes(t.id));

    const handleInscribe = async () => {
        if (!paymentMethod) return;
        setProcessing(true);
        await new Promise(r => setTimeout(r, 2000));
        setProcessing(false);
        setInscribed([...inscribed, selectedTournament.id]);
        setInscriptionStep(3);
    };

    // ==================== TOURNAMENT DETAIL ====================
    if (selectedTournament) {
        const t = selectedTournament;
        const status = getStatusInfo(t.status);
        const isInscribed = inscribed.includes(t.id);
        const spotsLeft = t.maxPlayers - t.currentPlayers;

        if (showInscription) {
            return (
                <div className="tournaments-screen">
                    <div className="ts-header">
                        <button className="ts-back" onClick={() => { if (inscriptionStep === 3) { setShowInscription(false); setInscriptionStep(1); } else { setShowInscription(false); setInscriptionStep(1); } }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                        </button>
                        <h2>{inscriptionStep === 3 ? '✅ Inscrito' : 'Inscripción'}</h2>
                        <div style={{ width: 40 }} />
                    </div>

                    <div className="ts-content">
                        {inscriptionStep === 1 && (
                            <div className="inscription-card">
                                <h3>📋 Confirmar Inscripción</h3>
                                <div className="insc-summary">
                                    <div className="insc-row"><span>Torneo</span><strong>{t.name}</strong></div>
                                    <div className="insc-row"><span>Club</span><strong>{t.club}</strong></div>
                                    <div className="insc-row"><span>Tipo</span><strong>{getTypeLabel(t.type)}</strong></div>
                                    <div className="insc-row"><span>Fechas</span><strong>{formatDate(t.startDate)} - {formatDate(t.endDate)}</strong></div>
                                    <div className="insc-divider" />
                                    <div className="insc-row total"><span>Inscripción</span><strong>{formatCurrency(t.price)}</strong></div>
                                </div>
                                <div className="insc-note">
                                    <span>💡</span><p>El pago de la inscripción es obligatorio para confirmar tu lugar en el torneo.</p>
                                </div>
                                <button className="btn-insc-continue" onClick={() => setInscriptionStep(2)}>Continuar al pago</button>
                            </div>
                        )}

                        {inscriptionStep === 2 && (
                            <div className="inscription-card">
                                <h3>💳 Pagar Inscripción</h3>
                                <p className="insc-amount">Monto: <strong>{formatCurrency(t.price)}</strong></p>
                                <div className="payment-methods-insc">
                                    {[{ key: 'mercadopago', label: 'MercadoPago', emoji: '💙', bg: '#EEF2FF' }, { key: 'modo', label: 'MODO', emoji: '💜', bg: '#F3E8FF' }].map(pm => (
                                        <button key={pm.key} className={`pm-btn ${paymentMethod === pm.key ? 'active' : ''}`} onClick={() => setPaymentMethod(pm.key)}>
                                            <span className="pm-emoji" style={{ background: pm.bg }}>{pm.emoji}</span>
                                            <strong>{pm.label}</strong>
                                            {paymentMethod === pm.key && <span className="pm-check">✓</span>}
                                        </button>
                                    ))}
                                </div>
                                <div className="insc-actions">
                                    <button className="btn-insc-back" onClick={() => setInscriptionStep(1)}>← Volver</button>
                                    <button className="btn-insc-pay" onClick={handleInscribe} disabled={!paymentMethod || processing}>
                                        {processing ? <><span className="insc-spinner" /> Procesando...</> : `Pagar ${formatCurrency(t.price)}`}
                                    </button>
                                </div>
                            </div>
                        )}

                        {inscriptionStep === 3 && (
                            <div className="inscription-card confirmation">
                                <div className="insc-confirm-icon">
                                    <svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="38" fill="#00A86B" fillOpacity="0.1"/><circle cx="40" cy="40" r="28" fill="#00A86B" fillOpacity="0.2"/><path d="M25 40L35 50L55 30" stroke="#00A86B" strokeWidth="4" strokeLinecap="round"/></svg>
                                </div>
                                <h2>¡Estás inscripto!</h2>
                                <p>{t.name}</p>
                                <p className="insc-confirm-date">{formatDate(t.startDate)} - {formatDate(t.endDate)} · {t.club}</p>
                                <div className="insc-confirm-code">
                                    <span>Código</span><strong>INS-{Date.now().toString().slice(-6)}</strong>
                                </div>
                                <button className="btn-insc-continue" onClick={() => { setShowInscription(false); setInscriptionStep(1); }}>Ver Torneo</button>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className="tournaments-screen">
                <div className="ts-header">
                    <button className="ts-back" onClick={() => setSelectedTournament(null)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </button>
                    <h2>Detalle del Torneo</h2>
                    <div style={{ width: 40 }} />
                </div>

                <div className="ts-content">
                    {/* Hero */}
                    <div className="td-hero">
                        <img src={t.clubImage} alt="" className="td-hero-img" />
                        <div className="td-hero-overlay">
                            <span className="td-status" style={{ background: status.bg, color: status.color }}>{status.icon} {status.label}</span>
                            <h1>{t.name}</h1>
                            <p>{t.club}</p>
                        </div>
                    </div>

                    {/* Quick Info */}
                    <div className="td-quick-info">
                        <div className="td-qi"><span>📅</span><div><strong>{formatDate(t.startDate)} - {formatDate(t.endDate)}</strong><p>Fechas</p></div></div>
                        <div className="td-qi"><span>{getTypeLabel(t.type).split(' ')[0]}</span><div><strong>{getTypeLabel(t.type).split(' ')[1]}</strong><p>Tipo</p></div></div>
                        <div className="td-qi"><span>👥</span><div><strong>{t.currentPlayers}/{t.maxPlayers}</strong><p>Jugadores</p></div></div>
                        <div className="td-qi"><span>💰</span><div><strong>{formatCurrency(t.price)}</strong><p>Inscripción</p></div></div>
                    </div>

                    {/* Tabs */}
                    <div className="td-tabs">
                        {[
                            { key: 'info', label: 'ℹ️ Info' },
                            { key: 'bracket', label: '🏆 Cuadro' },
                            { key: 'results', label: '📊 Resultados' },
                        ].map(tab => (
                            <button key={tab.key} className={`td-tab ${detailTab === tab.key ? 'active' : ''}`} onClick={() => setDetailTab(tab.key)}>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Info Tab */}
                    {detailTab === 'info' && (
                        <div className="td-section">
                            <div className="td-card"><h4>Descripción</h4><p>{t.description}</p></div>
                            <div className="td-card"><h4>Premios</h4>{t.prizes.map((p, i) => <p key={i} className="td-prize">{p}</p>)}</div>
                            <div className="td-card"><h4>Detalles</h4>
                                <div className="td-detail-row"><span>📍 Dirección</span><strong>{t.address}</strong></div>
                                <div className="td-detail-row"><span>🏟️ Superficie</span><strong>{t.surface}</strong></div>
                                <div className="td-detail-row"><span>⏰ Horarios</span><strong>{t.schedule}</strong></div>
                                <div className="td-detail-row"><span>📏 Reglas</span><strong>{t.rules}</strong></div>
                                <div className="td-detail-row"><span>📝 Cierre inscripción</span><strong>{formatDate(t.inscriptionDeadline)}</strong></div>
                                <div className="td-detail-row"><span>🎯 Nivel</span><strong>{getLevelLabel(t.level)}</strong></div>
                            </div>
                        </div>
                    )}

                    {/* Bracket Tab */}
                    {detailTab === 'bracket' && (
                        <div className="td-section">
                            {t.bracket ? (
                                <div className="bracket-container">
                                    {t.bracket.rounds.map((round, ri) => (
                                        <div key={ri} className="bracket-round">
                                            <h4 className="bracket-round-title">{round.name}</h4>
                                            {round.matches.map((m, mi) => (
                                                <div key={mi} className={`bracket-match ${m.winner !== null ? 'played' : ''}`}>
                                                    <div className={`bracket-player ${m.winner === 1 ? 'winner' : ''}`}>
                                                        <span>{m.p1}</span>
                                                        {m.winner === 1 && <span className="bracket-win-badge">🏆</span>}
                                                    </div>
                                                    <div className="bracket-vs">{m.score || 'vs'}</div>
                                                    <div className={`bracket-player ${m.winner === 2 ? 'winner' : ''}`}>
                                                        <span>{m.p2}</span>
                                                        {m.winner === 2 && <span className="bracket-win-badge">🏆</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="td-empty"><span>🏆</span><p>El cuadro se publicará cuando se cierre la inscripción</p></div>
                            )}
                        </div>
                    )}

                    {/* Results Tab */}
                    {detailTab === 'results' && (
                        <div className="td-section">
                            {t.results ? (
                                <div className="td-card">
                                    <h4>Clasificación Final</h4>
                                    {t.results.map((r, i) => (
                                        <div key={i} className={`results-row ${r.position <= 3 ? 'top' : ''}`}>
                                            <span className="results-pos">{r.position === 1 ? '🥇' : r.position === 2 ? '🥈' : r.position === 3 ? '🥉' : `#${r.position}`}</span>
                                            <strong>{r.name}</strong>
                                            <span className="results-pts">+{r.points} pts</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="td-empty"><span>📊</span><p>{t.status === 'in_progress' ? 'Resultados en vivo próximamente' : 'Los resultados estarán disponibles al finalizar el torneo'}</p></div>
                            )}
                        </div>
                    )}

                    {/* CTA */}
                    {t.status === 'open' && !isInscribed && spotsLeft > 0 && (
                        <div className="td-cta">
                            <div className="td-cta-info">
                                <span className="td-cta-spots">{spotsLeft} lugares disponibles</span>
                                <span className="td-cta-price">{formatCurrency(t.price)}</span>
                            </div>
                            <button className="td-cta-btn" onClick={() => setShowInscription(true)}>Inscribirme</button>
                        </div>
                    )}
                    {isInscribed && (
                        <div className="td-inscribed-banner">✅ Ya estás inscripto en este torneo</div>
                    )}
                </div>
            </div>
        );
    }

    // ==================== MY TOURNAMENTS ====================
    if (view === 'myTournaments') {
        return (
            <div className="tournaments-screen">
                <div className="ts-header">
                    <button className="ts-back" onClick={() => setView('list')}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </button>
                    <h2>Mis Torneos</h2>
                    <div style={{ width: 40 }} />
                </div>
                <div className="ts-content">
                    {myTournaments.length === 0 ? (
                        <div className="td-empty full"><span>🏆</span><h3>No estás inscripto en ningún torneo</h3><p>Explorá los torneos disponibles y anotate</p></div>
                    ) : (
                        myTournaments.map(t => {
                            const status = getStatusInfo(t.status);
                            return (
                                <button key={t.id} className="tournament-card" onClick={() => { setSelectedTournament(t); setView('list'); }}>
                                    <img src={t.clubImage} alt="" className="tc-image" />
                                    <div className="tc-info">
                                        <div className="tc-top"><strong>{t.name}</strong><span className="tc-status" style={{ background: status.bg, color: status.color }}>{status.label}</span></div>
                                        <p className="tc-club">{t.club}</p>
                                        <div className="tc-meta">
                                            <span>📅 {formatDate(t.startDate)}</span><span>{getTypeLabel(t.type)}</span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        );
    }

    // ==================== TOURNAMENT LIST ====================
    return (
        <div className="tournaments-screen">
            <div className="ts-header">
                <h2>🏆 Torneos</h2>
                <button className="ts-my-btn" onClick={() => setView('myTournaments')}>
                    Mis Torneos ({myTournaments.length})
                </button>
            </div>

            {/* Filters */}
            <div className="ts-filters">
                <div className="ts-filter-row">
                    <label>Tipo</label>
                    <div className="ts-filter-options">
                        {[{ v: 'all', l: 'Todos' }, { v: 'singles', l: '🎾 Singles' }, { v: 'doubles', l: '👥 Dobles' }, { v: 'mixed', l: '💑 Mixto' }].map(f => (
                            <button key={f.v} className={`ts-chip ${filters.type === f.v ? 'active' : ''}`} onClick={() => setFilters({ ...filters, type: f.v })}>{f.l}</button>
                        ))}
                    </div>
                </div>
                <div className="ts-filter-row">
                    <label>Nivel</label>
                    <div className="ts-filter-options">
                        {[{ v: 'all', l: 'Todos' }, { v: 'beginner', l: '🌱' }, { v: 'intermediate', l: '📈' }, { v: 'advanced', l: '⭐' }, { v: 'professional', l: '🏆' }].map(f => (
                            <button key={f.v} className={`ts-chip ${filters.level === f.v ? 'active' : ''}`} onClick={() => setFilters({ ...filters, level: f.v })}>{f.l}</button>
                        ))}
                    </div>
                </div>
                <div className="ts-filter-row">
                    <label>Estado</label>
                    <div className="ts-filter-options">
                        {[{ v: 'all', l: 'Todos' }, { v: 'open', l: '🟢 Abierto' }, { v: 'in_progress', l: '🔵 En curso' }, { v: 'finished', l: '⚫ Terminado' }].map(f => (
                            <button key={f.v} className={`ts-chip ${filters.status === f.v ? 'active' : ''}`} onClick={() => setFilters({ ...filters, status: f.v })}>{f.l}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="ts-content">
                <p className="ts-count">{filtered.length} torneo{filtered.length !== 1 ? 's' : ''}</p>
                {filtered.map(t => {
                    const status = getStatusInfo(t.status);
                    const isInsc = inscribed.includes(t.id);
                    const spotsLeft = t.maxPlayers - t.currentPlayers;
                    return (
                        <button key={t.id} className="tournament-card" onClick={() => { setSelectedTournament(t); setDetailTab('info'); }}>
                            <img src={t.clubImage} alt="" className="tc-image" />
                            <div className="tc-info">
                                <div className="tc-top">
                                    <strong>{t.name}</strong>
                                    <span className="tc-status" style={{ background: status.bg, color: status.color }}>{status.label}</span>
                                </div>
                                <p className="tc-club">{t.club}</p>
                                <div className="tc-meta">
                                    <span>📅 {formatDate(t.startDate)} - {formatDate(t.endDate)}</span>
                                    <span>{getTypeLabel(t.type)}</span>
                                </div>
                                <div className="tc-bottom">
                                    <span className="tc-price">{formatCurrency(t.price)}</span>
                                    <span className="tc-spots">{spotsLeft > 0 ? `${spotsLeft} lugares` : 'Completo'}</span>
                                    {isInsc && <span className="tc-inscribed">✅ Inscripto</span>}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TournamentsScreen;