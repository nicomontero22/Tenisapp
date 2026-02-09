import React, { useState } from 'react';
import './TournamentsSection.css';

const TournamentsSection = () => {
    const [view, setView] = useState('list'); // list, create, edit, inscribed, bracket
    const [selectedTournament, setSelectedTournament] = useState(null);

    const [tournaments, setTournaments] = useState([
        {
            id: 1, name: 'Torneo Apertura 2026', type: 'singles', level: 'all',
            startDate: '2026-03-15', endDate: '2026-03-22', inscriptionDeadline: '2026-03-10',
            price: 8500, maxPlayers: 32, status: 'open', surface: 'Polvo de ladrillo',
            description: 'Torneo de singles abierto a todas las categorías. Formato eliminación directa.',
            prizes: '1er: $50.000 + Trofeo\n2do: $25.000\n3ero: $10.000 (x2)',
            schedule: 'Partidos de 9:00 a 21:00', rules: 'Sets a 6 juegos con tiebreak. 3 sets para final.',
            inscribed: [
                { id: 1, name: 'Carlos Martínez', avatar: 'https://i.pravatar.cc/150?img=11', level: 'advanced', phone: '+54 11 5555-0001', email: 'carlos@test.com', inscDate: '2026-02-20', paid: true, seed: 3 },
                { id: 2, name: 'Roberto Sánchez', avatar: 'https://i.pravatar.cc/150?img=12', level: 'professional', phone: '+54 11 5555-0002', email: 'roberto@test.com', inscDate: '2026-02-21', paid: true, seed: 1 },
                { id: 3, name: 'Martín González', avatar: 'https://i.pravatar.cc/150?img=33', level: 'intermediate', phone: '+54 11 5555-0003', email: 'martin@test.com', inscDate: '2026-02-22', paid: true, seed: null },
                { id: 4, name: 'Nicolás Aguirre', avatar: 'https://i.pravatar.cc/150?img=60', level: 'advanced', phone: '+54 11 5555-0004', email: 'nicolas@test.com', inscDate: '2026-02-23', paid: true, seed: 2 },
                { id: 5, name: 'Diego Pérez', avatar: 'https://i.pravatar.cc/150?img=15', level: 'beginner', phone: '+54 11 5555-0005', email: 'diego@test.com', inscDate: '2026-02-24', paid: false, seed: null },
                { id: 6, name: 'Fernando Ruiz', avatar: 'https://i.pravatar.cc/150?img=53', level: 'intermediate', phone: '+54 11 5555-0006', email: 'fernando@test.com', inscDate: '2026-02-25', paid: true, seed: null },
                { id: 7, name: 'Ana López', avatar: 'https://i.pravatar.cc/150?img=5', level: 'intermediate', phone: '+54 11 5555-0007', email: 'ana@test.com', inscDate: '2026-02-25', paid: true, seed: 4 },
                { id: 8, name: 'Lucía Fernández', avatar: 'https://i.pravatar.cc/150?img=9', level: 'advanced', phone: '+54 11 5555-0008', email: 'lucia@test.com', inscDate: '2026-02-26', paid: true, seed: null },
            ],
            bracket: null,
        },
        {
            id: 2, name: 'Copa Dobles Otoño', type: 'doubles', level: 'intermediate',
            startDate: '2026-04-05', endDate: '2026-04-06', inscriptionDeadline: '2026-04-01',
            price: 12000, maxPlayers: 16, status: 'open', surface: 'Cemento',
            description: 'Torneo de dobles nivel intermedio.',
            prizes: '1er: $40.000/pareja\n2do: $20.000/pareja',
            schedule: 'Sábado y Domingo 9:00 a 20:00', rules: 'Super tiebreak en 3er set.',
            inscribed: [
                { id: 1, name: 'Martínez / López', avatar: 'https://i.pravatar.cc/150?img=11', level: 'intermediate', phone: '+54 11 5555-0001', email: 'carlos@test.com', inscDate: '2026-03-15', paid: true, seed: 1 },
                { id: 2, name: 'Sánchez / Torres', avatar: 'https://i.pravatar.cc/150?img=12', level: 'intermediate', phone: '+54 11 5555-0002', email: 'roberto@test.com', inscDate: '2026-03-16', paid: true, seed: null },
                { id: 3, name: 'Pérez / Herrera', avatar: 'https://i.pravatar.cc/150?img=15', level: 'intermediate', phone: '+54 11 5555-0003', email: 'diego@test.com', inscDate: '2026-03-17', paid: false, seed: null },
            ],
            bracket: null,
        },
        {
            id: 3, name: 'Torneo Verano 2026', type: 'singles', level: 'advanced',
            startDate: '2026-01-10', endDate: '2026-01-15', inscriptionDeadline: '2026-01-05',
            price: 10000, maxPlayers: 8, status: 'finished', surface: 'Polvo de ladrillo',
            description: 'Torneo de verano para jugadores avanzados.',
            prizes: '1er: $80.000\n2do: $40.000',
            schedule: '6 días', rules: 'Mejor de 3 sets.',
            inscribed: [
                { id: 1, name: 'Roberto Sánchez', avatar: 'https://i.pravatar.cc/150?img=12', level: 'professional', phone: '', email: '', inscDate: '2025-12-20', paid: true, seed: 1 },
                { id: 2, name: 'Camila Herrera', avatar: 'https://i.pravatar.cc/150?img=23', level: 'professional', phone: '', email: '', inscDate: '2025-12-21', paid: true, seed: 2 },
                { id: 3, name: 'Carlos Martínez', avatar: 'https://i.pravatar.cc/150?img=11', level: 'advanced', phone: '', email: '', inscDate: '2025-12-22', paid: true, seed: 3 },
                { id: 4, name: 'Nicolás Aguirre', avatar: 'https://i.pravatar.cc/150?img=60', level: 'advanced', phone: '', email: '', inscDate: '2025-12-22', paid: true, seed: 4 },
            ],
            bracket: {
                rounds: [
                    { name: 'Semifinal', matches: [
                        { id: 'm1', p1: 'Roberto Sánchez', p2: 'Nicolás Aguirre', score: '6-3, 6-2', winner: 1 },
                        { id: 'm2', p1: 'Camila Herrera', p2: 'Carlos Martínez', score: '6-4, 7-5', winner: 1 },
                    ]},
                    { name: 'Final', matches: [
                        { id: 'm3', p1: 'Roberto Sánchez', p2: 'Camila Herrera', score: '6-4, 3-6, 7-5', winner: 1 },
                    ]},
                ],
            },
        },
    ]);

    const [editData, setEditData] = useState({});
    const [inscribedFilter, setInscribedFilter] = useState('all');
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(null);
    const [bracketEditMatch, setBracketEditMatch] = useState(null);
    const [matchScore, setMatchScore] = useState({ score: '', winner: null });

    const formatCurrency = (n) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 }).format(n);
    const getStatusBadge = (s) => ({ open: { label: 'Inscripción abierta', bg: '#E6F9F1', color: '#00A86B' }, in_progress: { label: 'En curso', bg: '#DBEAFE', color: '#3B82F6' }, finished: { label: 'Finalizado', bg: '#f0f0f0', color: '#888' } }[s]);
    const getLevelLabel = (l) => ({ all: 'Todas', beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado', professional: 'Profesional' }[l] || l);
    const getTypeLabel = (t) => ({ singles: 'Singles', doubles: 'Dobles', mixed: 'Mixto' }[t] || t);

    // ============ REMOVE INSCRIBED ============
    const removeInscribed = (tournamentId, playerId) => {
        setTournaments(tournaments.map(t => {
            if (t.id === tournamentId) {
                return { ...t, inscribed: t.inscribed.filter(p => p.id !== playerId) };
            }
            return t;
        }));
        setShowRemoveConfirm(null);
        // Update selectedTournament
        setSelectedTournament(prev => prev ? { ...prev, inscribed: prev.inscribed.filter(p => p.id !== playerId) } : null);
    };

    // ============ TOGGLE PAYMENT ============
    const togglePayment = (tournamentId, playerId) => {
        setTournaments(tournaments.map(t => {
            if (t.id === tournamentId) {
                return { ...t, inscribed: t.inscribed.map(p => p.id === playerId ? { ...p, paid: !p.paid } : p) };
            }
            return t;
        }));
        setSelectedTournament(prev => {
            if (!prev) return null;
            return { ...prev, inscribed: prev.inscribed.map(p => p.id === playerId ? { ...p, paid: !p.paid } : p) };
        });
    };

    // ============ SET SEED ============
    const updateSeed = (tournamentId, playerId, seed) => {
        const val = seed === '' ? null : Number(seed);
        setTournaments(tournaments.map(t => {
            if (t.id === tournamentId) {
                return { ...t, inscribed: t.inscribed.map(p => p.id === playerId ? { ...p, seed: val } : p) };
            }
            return t;
        }));
        setSelectedTournament(prev => {
            if (!prev) return null;
            return { ...prev, inscribed: prev.inscribed.map(p => p.id === playerId ? { ...p, seed: val } : p) };
        });
    };

    // ============ GENERATE BRACKET ============
    const generateBracket = (tournament) => {
        const players = [...tournament.inscribed].filter(p => p.paid);
        // Sort by seed (seeded first, then random)
        const seeded = players.filter(p => p.seed).sort((a, b) => a.seed - b.seed);
        const unseeded = players.filter(p => !p.seed).sort(() => Math.random() - 0.5);
        const ordered = [...seeded, ...unseeded];

        // Calculate rounds needed
        let size = 2;
        while (size < ordered.length) size *= 2;

        // Fill with BYE
        while (ordered.length < size) {
            ordered.push({ id: `bye-${ordered.length}`, name: 'BYE', level: '', paid: true, seed: null });
        }

        // Create first round matches
        const firstRoundMatches = [];
        for (let i = 0; i < ordered.length; i += 2) {
            const isBye = ordered[i + 1].name === 'BYE';
            firstRoundMatches.push({
                id: `r1-m${i / 2}`,
                p1: ordered[i].name,
                p2: ordered[i + 1].name,
                score: isBye ? 'W/O' : null,
                winner: isBye ? 1 : null,
            });
        }

        const roundNames = { 2: ['Final'], 4: ['Semifinal', 'Final'], 8: ['Cuartos', 'Semifinal', 'Final'], 16: ['Octavos', 'Cuartos', 'Semifinal', 'Final'] };
        const names = roundNames[size] || [`Ronda 1`, 'Cuartos', 'Semifinal', 'Final'];

        const rounds = [{ name: names[0], matches: firstRoundMatches }];

        // Create subsequent empty rounds
        let prevCount = firstRoundMatches.length;
        for (let r = 1; r < names.length; r++) {
            const matches = [];
            for (let i = 0; i < prevCount / 2; i++) {
                matches.push({ id: `r${r + 1}-m${i}`, p1: 'Por definir', p2: 'Por definir', score: null, winner: null });
            }
            rounds.push({ name: names[r], matches });
            prevCount = matches.length;
        }

        // Auto-advance BYE winners
        const firstRoundWinners = firstRoundMatches.map(m => m.winner === 1 ? m.p1 : m.winner === 2 ? m.p2 : null);
        if (rounds.length > 1) {
            for (let i = 0; i < rounds[1].matches.length; i++) {
                const w1 = firstRoundWinners[i * 2];
                const w2 = firstRoundWinners[i * 2 + 1];
                if (w1) rounds[1].matches[i].p1 = w1;
                if (w2) rounds[1].matches[i].p2 = w2;
            }
        }

        const newBracket = { rounds };

        setTournaments(tournaments.map(t => t.id === tournament.id ? { ...t, bracket: newBracket, status: 'in_progress' } : t));
        setSelectedTournament({ ...tournament, bracket: newBracket, status: 'in_progress' });
    };

    // ============ SAVE MATCH RESULT ============
    const saveMatchResult = () => {
        if (!bracketEditMatch || !matchScore.score || matchScore.winner === null) return;

        const { roundIndex, matchIndex } = bracketEditMatch;
        const updatedBracket = JSON.parse(JSON.stringify(selectedTournament.bracket));
        const match = updatedBracket.rounds[roundIndex].matches[matchIndex];
        match.score = matchScore.score;
        match.winner = matchScore.winner;

        // Advance winner to next round
        const winnerName = matchScore.winner === 1 ? match.p1 : match.p2;
        if (roundIndex + 1 < updatedBracket.rounds.length) {
            const nextRound = updatedBracket.rounds[roundIndex + 1];
            const nextMatchIndex = Math.floor(matchIndex / 2);
            if (matchIndex % 2 === 0) {
                nextRound.matches[nextMatchIndex].p1 = winnerName;
            } else {
                nextRound.matches[nextMatchIndex].p2 = winnerName;
            }
        }

        setTournaments(tournaments.map(t => t.id === selectedTournament.id ? { ...t, bracket: updatedBracket } : t));
        setSelectedTournament({ ...selectedTournament, bracket: updatedBracket });
        setBracketEditMatch(null);
        setMatchScore({ score: '', winner: null });
    };

    // ============ SAVE EDIT ============
    const handleSaveEdit = () => {
        const updated = {
            ...selectedTournament,
            ...editData,
            price: Number(editData.price),
            maxPlayers: Number(editData.maxPlayers),
        };
        setTournaments(tournaments.map(t => t.id === updated.id ? updated : t));
        setSelectedTournament(updated);
        setView('list');
    };

    // ============ CREATE ============
    const handleCreate = () => {
        if (!editData.name || !editData.startDate || !editData.price) return;
        const newT = {
            ...editData,
            id: Date.now(),
            price: Number(editData.price),
            maxPlayers: Number(editData.maxPlayers || 32),
            status: 'open',
            inscribed: [],
            bracket: null,
        };
        setTournaments([newT, ...tournaments]);
        setView('list');
        setEditData({});
    };

    // ============ FORM (shared for create/edit) ============
    const renderForm = (isEdit) => (
        <div className="ts-form-view">
            <div className="ts-form-header">
                <button className="ts-back-btn" onClick={() => setView('list')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                </button>
                <h2>{isEdit ? '✏️ Editar Torneo' : '➕ Crear Torneo'}</h2>
            </div>

            <div className="ts-form-body">
                <div className="form-group">
                    <label>Nombre del torneo *</label>
                    <input type="text" value={editData.name || ''} onChange={e => setEditData({ ...editData, name: e.target.value })} placeholder="Ej: Copa Primavera 2026" className="form-input" />
                </div>

                <div className="form-group">
                    <label>Descripción</label>
                    <textarea value={editData.description || ''} onChange={e => setEditData({ ...editData, description: e.target.value })} placeholder="Descripción del torneo..." rows={3} className="form-input" />
                </div>

                <div className="form-row-2">
                    <div className="form-group">
                        <label>Tipo *</label>
                        <select value={editData.type || 'singles'} onChange={e => setEditData({ ...editData, type: e.target.value })} className="form-input">
                            <option value="singles">🎾 Singles</option>
                            <option value="doubles">👥 Dobles</option>
                            <option value="mixed">💑 Mixto</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Nivel</label>
                        <select value={editData.level || 'all'} onChange={e => setEditData({ ...editData, level: e.target.value })} className="form-input">
                            <option value="all">Todas las categorías</option>
                            <option value="beginner">Principiante</option>
                            <option value="intermediate">Intermedio</option>
                            <option value="advanced">Avanzado</option>
                            <option value="professional">Profesional</option>
                        </select>
                    </div>
                </div>

                <div className="form-row-2">
                    <div className="form-group">
                        <label>Superficie</label>
                        <select value={editData.surface || 'Polvo de ladrillo'} onChange={e => setEditData({ ...editData, surface: e.target.value })} className="form-input">
                            <option>Polvo de ladrillo</option>
                            <option>Cemento</option>
                            <option>Césped</option>
                            <option>Sintético</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Estado</label>
                        <select value={editData.status || 'open'} onChange={e => setEditData({ ...editData, status: e.target.value })} className="form-input">
                            <option value="open">Inscripción abierta</option>
                            <option value="in_progress">En curso</option>
                            <option value="finished">Finalizado</option>
                        </select>
                    </div>
                </div>

                <div className="form-row-3">
                    <div className="form-group">
                        <label>Fecha inicio *</label>
                        <input type="date" value={editData.startDate || ''} onChange={e => setEditData({ ...editData, startDate: e.target.value })} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Fecha fin *</label>
                        <input type="date" value={editData.endDate || ''} onChange={e => setEditData({ ...editData, endDate: e.target.value })} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Cierre inscripción</label>
                        <input type="date" value={editData.inscriptionDeadline || ''} onChange={e => setEditData({ ...editData, inscriptionDeadline: e.target.value })} className="form-input" />
                    </div>
                </div>

                <div className="form-row-2">
                    <div className="form-group">
                        <label>Precio inscripción ($) *</label>
                        <input type="number" value={editData.price || ''} onChange={e => setEditData({ ...editData, price: e.target.value })} placeholder="8500" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Máx. jugadores *</label>
                        <select value={editData.maxPlayers || 32} onChange={e => setEditData({ ...editData, maxPlayers: e.target.value })} className="form-input">
                            {[4, 8, 16, 32, 64].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Horario de partidos</label>
                    <input type="text" value={editData.schedule || ''} onChange={e => setEditData({ ...editData, schedule: e.target.value })} placeholder="Ej: 9:00 a 21:00" className="form-input" />
                </div>

                <div className="form-group">
                    <label>Reglas</label>
                    <textarea value={editData.rules || ''} onChange={e => setEditData({ ...editData, rules: e.target.value })} placeholder="Ej: Sets a 6 juegos con tiebreak..." rows={2} className="form-input" />
                </div>

                <div className="form-group">
                    <label>Premios</label>
                    <textarea value={editData.prizes || ''} onChange={e => setEditData({ ...editData, prizes: e.target.value })} placeholder="1er: $50.000&#10;2do: $25.000" rows={3} className="form-input" />
                </div>

                <div className="form-actions">
                    <button className="btn-cancel" onClick={() => setView('list')}>Cancelar</button>
                    <button className="btn-save" onClick={isEdit ? handleSaveEdit : handleCreate}>
                        {isEdit ? '💾 Guardar Cambios' : '🏆 Crear Torneo'}
                    </button>
                </div>
            </div>
        </div>
    );

    // ============ INSCRIBED VIEW ============
    if (view === 'inscribed' && selectedTournament) {
        const t = selectedTournament;
        const filtered = inscribedFilter === 'all' ? t.inscribed
            : inscribedFilter === 'paid' ? t.inscribed.filter(p => p.paid)
            : t.inscribed.filter(p => !p.paid);

        return (
            <div className="ts-sub-view">
                <div className="ts-sub-header">
                    <button className="ts-back-btn" onClick={() => { setView('list'); setSelectedTournament(null); }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </button>
                    <div>
                        <h2>📋 Inscriptos</h2>
                        <p className="ts-sub-subtitle">{t.name} · {t.inscribed.length}/{t.maxPlayers} jugadores</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="insc-stats">
                    <div className="insc-stat" onClick={() => setInscribedFilter('all')}>
                        <span className="insc-stat-num">{t.inscribed.length}</span>
                        <span>Total</span>
                    </div>
                    <div className="insc-stat" onClick={() => setInscribedFilter('paid')}>
                        <span className="insc-stat-num" style={{ color: '#00A86B' }}>{t.inscribed.filter(p => p.paid).length}</span>
                        <span>Pagaron</span>
                    </div>
                    <div className="insc-stat" onClick={() => setInscribedFilter('unpaid')}>
                        <span className="insc-stat-num" style={{ color: '#EF4444' }}>{t.inscribed.filter(p => !p.paid).length}</span>
                        <span>Sin pagar</span>
                    </div>
                    <div className="insc-stat">
                        <span className="insc-stat-num" style={{ color: '#3B82F6' }}>{formatCurrency(t.inscribed.filter(p => p.paid).length * t.price)}</span>
                        <span>Recaudado</span>
                    </div>
                </div>

                {/* Filter chips */}
                <div className="insc-filter-bar">
                    {[{ k: 'all', l: 'Todos' }, { k: 'paid', l: '✅ Pagaron' }, { k: 'unpaid', l: '⏳ Sin pagar' }].map(f => (
                        <button key={f.k} className={`insc-chip ${inscribedFilter === f.k ? 'active' : ''}`} onClick={() => setInscribedFilter(f.k)}>{f.l}</button>
                    ))}
                </div>

                {/* Player list */}
                <div className="insc-list">
                    {filtered.map((p, idx) => (
                        <div key={p.id} className="insc-player-card">
                            <span className="insc-number">{idx + 1}</span>
                            <img src={p.avatar} alt="" className="insc-avatar" />
                            <div className="insc-player-info">
                                <div className="insc-player-top">
                                    <strong>{p.name}</strong>
                                    {p.seed && <span className="insc-seed">Seed #{p.seed}</span>}
                                </div>
                                <div className="insc-player-meta">
                                    <span>{getLevelLabel(p.level)}</span>
                                    <span>· Inscripto: {p.inscDate}</span>
                                </div>
                                {(p.phone || p.email) && (
                                    <div className="insc-player-contact">
                                        {p.phone && <span>📞 {p.phone}</span>}
                                        {p.email && <span>📧 {p.email}</span>}
                                    </div>
                                )}
                            </div>
                            <div className="insc-player-actions">
                                <div className="insc-seed-input">
                                    <label>Seed</label>
                                    <input
                                        type="number" min="1" max={t.maxPlayers}
                                        value={p.seed || ''}
                                        onChange={e => updateSeed(t.id, p.id, e.target.value)}
                                        placeholder="-"
                                        className="seed-input"
                                    />
                                </div>
                                <button
                                    className={`insc-pay-toggle ${p.paid ? 'paid' : 'unpaid'}`}
                                    onClick={() => togglePayment(t.id, p.id)}
                                    title={p.paid ? 'Marcar como no pagado' : 'Marcar como pagado'}
                                >
                                    {p.paid ? '✅ Pagó' : '⏳ Pendiente'}
                                </button>
                                <button className="insc-remove-btn" onClick={() => setShowRemoveConfirm(p.id)} title="Quitar del torneo">
                                    🗑️
                                </button>
                            </div>

                            {/* Remove confirmation */}
                            {showRemoveConfirm === p.id && (
                                <div className="insc-remove-confirm">
                                    <p>¿Quitar a <strong>{p.name}</strong> del torneo?</p>
                                    <div className="insc-remove-actions">
                                        <button className="btn-keep-sm" onClick={() => setShowRemoveConfirm(null)}>No</button>
                                        <button className="btn-remove-sm" onClick={() => removeInscribed(t.id, p.id)}>Sí, quitar</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ============ BRACKET VIEW ============
    if (view === 'bracket' && selectedTournament) {
        const t = selectedTournament;
        const paidCount = t.inscribed.filter(p => p.paid).length;

        return (
            <div className="ts-sub-view">
                <div className="ts-sub-header">
                    <button className="ts-back-btn" onClick={() => { setView('list'); setSelectedTournament(null); }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </button>
                    <div>
                        <h2>🏆 Cuadro del Torneo</h2>
                        <p className="ts-sub-subtitle">{t.name}</p>
                    </div>
                </div>

                {!t.bracket ? (
                    <div className="bracket-empty">
                        <div className="bracket-empty-icon">🏆</div>
                        <h3>Cuadro no generado</h3>
                        <p>Tenés {paidCount} jugadores confirmados (pagaron). Necesitás al menos 2 para generar el cuadro.</p>
                        <button className="btn-generate-bracket" onClick={() => generateBracket(t)} disabled={paidCount < 2}>
                            ⚡ Generar Cuadro Automático
                        </button>
                        <p className="bracket-note">Los jugadores con seed se ubicarán primero. El resto se sortea.</p>
                    </div>
                ) : (
                    <div className="bracket-management">
                        <div className="bracket-info-bar">
                            <span>📊 {t.bracket.rounds.length} rondas · Tocá un partido para cargar resultado</span>
                            <button className="btn-regen" onClick={() => { if (window.confirm('¿Regenerar cuadro? Se perderán los resultados actuales.')) generateBracket(t); }}>
                                🔄 Regenerar
                            </button>
                        </div>

                        <div className="bracket-scroll">
                            {t.bracket.rounds.map((round, ri) => (
                                <div key={ri} className="bracket-round-admin">
                                    <h4 className="bracket-round-name">{round.name}</h4>
                                    {round.matches.map((m, mi) => (
                                        <div
                                            key={m.id}
                                            className={`bracket-match-admin ${m.winner ? 'played' : 'pending'} ${bracketEditMatch?.roundIndex === ri && bracketEditMatch?.matchIndex === mi ? 'editing' : ''}`}
                                            onClick={() => {
                                                if (!m.winner && m.p1 !== 'Por definir' && m.p2 !== 'Por definir' && m.p1 !== 'BYE' && m.p2 !== 'BYE') {
                                                    setBracketEditMatch({ roundIndex: ri, matchIndex: mi });
                                                    setMatchScore({ score: '', winner: null });
                                                }
                                            }}
                                        >
                                            <div className={`bm-player ${m.winner === 1 ? 'winner' : ''}`}>
                                                <span>{m.p1}</span>
                                                {m.winner === 1 && <span className="bm-trophy">🏆</span>}
                                            </div>
                                            <div className="bm-score">{m.score || 'vs'}</div>
                                            <div className={`bm-player ${m.winner === 2 ? 'winner' : ''}`}>
                                                <span>{m.p2}</span>
                                                {m.winner === 2 && <span className="bm-trophy">🏆</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Match Score Modal */}
                {bracketEditMatch && (
                    <div className="score-modal-overlay" onClick={() => setBracketEditMatch(null)}>
                        <div className="score-modal" onClick={e => e.stopPropagation()}>
                            <h3>📝 Cargar Resultado</h3>
                            {(() => {
                                const m = selectedTournament.bracket.rounds[bracketEditMatch.roundIndex].matches[bracketEditMatch.matchIndex];
                                return (
                                    <>
                                        <div className="score-players">
                                            <button className={`score-player-btn ${matchScore.winner === 1 ? 'selected' : ''}`} onClick={() => setMatchScore({ ...matchScore, winner: 1 })}>
                                                <strong>{m.p1}</strong>
                                                {matchScore.winner === 1 && <span>🏆 Ganador</span>}
                                            </button>
                                            <span className="score-vs">vs</span>
                                            <button className={`score-player-btn ${matchScore.winner === 2 ? 'selected' : ''}`} onClick={() => setMatchScore({ ...matchScore, winner: 2 })}>
                                                <strong>{m.p2}</strong>
                                                {matchScore.winner === 2 && <span>🏆 Ganador</span>}
                                            </button>
                                        </div>
                                        <div className="form-group">
                                            <label>Resultado (ej: 6-3, 7-5)</label>
                                            <input
                                                type="text" value={matchScore.score}
                                                onChange={e => setMatchScore({ ...matchScore, score: e.target.value })}
                                                placeholder="6-3, 7-5" className="form-input"
                                            />
                                        </div>
                                        <div className="score-modal-actions">
                                            <button className="btn-cancel" onClick={() => setBracketEditMatch(null)}>Cancelar</button>
                                            <button className="btn-save" onClick={saveMatchResult} disabled={!matchScore.score || matchScore.winner === null}>
                                                ✅ Guardar Resultado
                                            </button>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ============ EDIT VIEW ============
    if (view === 'edit') return renderForm(true);

    // ============ CREATE VIEW ============
    if (view === 'create') return renderForm(false);

    // ============ TOURNAMENT LIST ============
    return (
        <div>
            <div className="ts-list-header">
                <div>
                    <h2>🏆 Gestión de Torneos</h2>
                    <p>{tournaments.length} torneos creados</p>
                </div>
                <button className="btn-create-tournament" onClick={() => { setEditData({}); setView('create'); }}>
                    + Crear Torneo
                </button>
            </div>

            <div className="ts-tournament-list">
                {tournaments.map(t => {
                    const st = getStatusBadge(t.status);
                    const paidCount = t.inscribed.filter(p => p.paid).length;
                    return (
                        <div key={t.id} className="ts-tournament-card">
                            <div className="ts-tc-header">
                                <div>
                                    <h3>{t.name}</h3>
                                    <p className="ts-tc-meta">
                                        {getTypeLabel(t.type)} · {t.surface} · {getLevelLabel(t.level)}
                                    </p>
                                </div>
                                <span className="ts-tc-status" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                            </div>

                            <div className="ts-tc-stats">
                                <span>📅 {t.startDate} → {t.endDate}</span>
                                <span>👥 {t.inscribed.length}/{t.maxPlayers} ({paidCount} pagaron)</span>
                                <span>💰 {formatCurrency(t.price)} · Recaudado: {formatCurrency(paidCount * t.price)}</span>
                            </div>

                            <div className="ts-tc-actions">
                                <button className="ts-action-btn blue" onClick={() => { setSelectedTournament(t); setView('inscribed'); }}>
                                    📋 Inscriptos ({t.inscribed.length})
                                </button>
                                <button className="ts-action-btn green" onClick={() => { setSelectedTournament(t); setView('bracket'); }}>
                                    🏆 Cuadro {t.bracket ? '(activo)' : ''}
                                </button>
                                <button className="ts-action-btn orange" onClick={() => { setSelectedTournament(t); setEditData({ ...t }); setView('edit'); }}>
                                    ✏️ Editar
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TournamentsSection;