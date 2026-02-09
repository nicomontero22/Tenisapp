import React, { useState, useMemo } from 'react';
import './PlayerSearch.css';

const PlayerSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        level: 'all',
        playStyle: 'all',
        location: 'all',
    });
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [messageSent, setMessageSent] = useState(false);

    // Mock de jugadores
    const allPlayers = [
        {
            id: 1, name: 'Carlos Martínez', email: 'carlos@test.com',
            avatar: 'https://i.pravatar.cc/150?img=11',
            level: 'advanced', playStyle: 'singles', location: 'Rosario',
            age: 32, dominantHand: 'right', courtPreference: 'clay',
            bio: 'Jugador competitivo con 10 años de experiencia. Me encanta el polvo de ladrillo.',
            stats: { matchesPlayed: 89, matchesWon: 61, winRate: 69, ranking: 850, points: 4200, currentStreak: 5 },
        },
        {
            id: 2, name: 'Ana López', email: 'ana@test.com',
            avatar: 'https://i.pravatar.cc/150?img=5',
            level: 'intermediate', playStyle: 'doubles', location: 'Buenos Aires',
            age: 27, dominantHand: 'right', courtPreference: 'hard',
            bio: 'Amo el tenis y busco compañeras de dobles para torneos.',
            stats: { matchesPlayed: 45, matchesWon: 28, winRate: 62, ranking: 1100, points: 2800, currentStreak: 2 },
        },
        {
            id: 3, name: 'Roberto Sánchez', email: 'roberto@test.com',
            avatar: 'https://i.pravatar.cc/150?img=12',
            level: 'professional', playStyle: 'singles', location: 'Córdoba',
            age: 29, dominantHand: 'left', courtPreference: 'clay',
            bio: 'Ex jugador profesional, ahora compito en torneos amateurs. Zurdo natural.',
            stats: { matchesPlayed: 156, matchesWon: 121, winRate: 78, ranking: 320, points: 7500, currentStreak: 8 },
        },
        {
            id: 4, name: 'Diego Pérez', email: 'diego@test.com',
            avatar: 'https://i.pravatar.cc/150?img=15',
            level: 'beginner', playStyle: 'both', location: 'Rosario',
            age: 22, dominantHand: 'right', courtPreference: 'any',
            bio: 'Recién empiezo a jugar, busco gente para practicar y mejorar.',
            stats: { matchesPlayed: 12, matchesWon: 4, winRate: 33, ranking: 1800, points: 450, currentStreak: 0 },
        },
        {
            id: 5, name: 'Martín González', email: 'martin@test.com',
            avatar: 'https://i.pravatar.cc/150?img=33',
            level: 'intermediate', playStyle: 'singles', location: 'Buenos Aires',
            age: 35, dominantHand: 'right', courtPreference: 'hard',
            bio: 'Juego 3 veces por semana. Busco rivales de nivel similar.',
            stats: { matchesPlayed: 67, matchesWon: 38, winRate: 57, ranking: 1050, points: 3100, currentStreak: 1 },
        },
        {
            id: 6, name: 'Lucía Fernández', email: 'lucia@test.com',
            avatar: 'https://i.pravatar.cc/150?img=9',
            level: 'advanced', playStyle: 'both', location: 'Mendoza',
            age: 30, dominantHand: 'right', courtPreference: 'clay',
            bio: 'Juego competitivo y recreativo. Participé en varios torneos nacionales.',
            stats: { matchesPlayed: 102, matchesWon: 72, winRate: 71, ranking: 780, points: 4800, currentStreak: 3 },
        },
        {
            id: 7, name: 'Fernando Ruiz', email: 'fernando@test.com',
            avatar: 'https://i.pravatar.cc/150?img=53',
            level: 'intermediate', playStyle: 'doubles', location: 'Rosario',
            age: 40, dominantHand: 'right', courtPreference: 'clay',
            bio: 'Veterano del dobles. Busco pareja fija para torneos.',
            stats: { matchesPlayed: 78, matchesWon: 45, winRate: 58, ranking: 1200, points: 2600, currentStreak: 0 },
        },
        {
            id: 8, name: 'Valentina Torres', email: 'valentina@test.com',
            avatar: 'https://i.pravatar.cc/150?img=20',
            level: 'beginner', playStyle: 'singles', location: 'Buenos Aires',
            age: 19, dominantHand: 'left', courtPreference: 'hard',
            bio: 'Estudiante universitaria, empecé hace poco y me enganché mal.',
            stats: { matchesPlayed: 8, matchesWon: 2, winRate: 25, ranking: 1950, points: 200, currentStreak: 0 },
        },
        {
            id: 9, name: 'Nicolás Aguirre', email: 'nicolas@test.com',
            avatar: 'https://i.pravatar.cc/150?img=60',
            level: 'advanced', playStyle: 'singles', location: 'Córdoba',
            age: 28, dominantHand: 'right', courtPreference: 'grass',
            bio: 'Apasionado del tenis sobre césped. Entreno 5 días por semana.',
            stats: { matchesPlayed: 94, matchesWon: 65, winRate: 69, ranking: 890, points: 4100, currentStreak: 4 },
        },
        {
            id: 10, name: 'Camila Herrera', email: 'camila@test.com',
            avatar: 'https://i.pravatar.cc/150?img=23',
            level: 'professional', playStyle: 'both', location: 'Mendoza',
            age: 26, dominantHand: 'right', courtPreference: 'clay',
            bio: 'Jugadora profesional retirada. Ahora doy clases y compito por diversión.',
            stats: { matchesPlayed: 203, matchesWon: 167, winRate: 82, ranking: 180, points: 9200, currentStreak: 12 },
        },
    ];

    const locations = [...new Set(allPlayers.map(p => p.location))];

    // Filtrar jugadores
    const filteredPlayers = useMemo(() => {
        return allPlayers.filter(player => {
            const matchesSearch = searchQuery === '' ||
                player.name.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesLevel = filters.level === 'all' || player.level === filters.level;
            const matchesStyle = filters.playStyle === 'all' || player.playStyle === filters.playStyle || player.playStyle === 'both';
            const matchesLocation = filters.location === 'all' || player.location === filters.location;

            return matchesSearch && matchesLevel && matchesStyle && matchesLocation;
        });
    }, [searchQuery, filters]);

    const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length;

    const getLevelInfo = (level) => {
        const map = {
            beginner: { label: 'Principiante', emoji: '🌱', color: '#10B981', bg: '#D1FAE5' },
            intermediate: { label: 'Intermedio', emoji: '📈', color: '#F59E0B', bg: '#FEF3C7' },
            advanced: { label: 'Avanzado', emoji: '⭐', color: '#3B82F6', bg: '#DBEAFE' },
            professional: { label: 'Profesional', emoji: '🏆', color: '#8B5CF6', bg: '#EDE9FE' },
        };
        return map[level] || map.beginner;
    };

    const getStyleLabel = (style) => {
        const map = { singles: 'Singles', doubles: 'Dobles', both: 'Singles y Dobles' };
        return map[style] || style;
    };

    const getHandLabel = (hand) => {
        return hand === 'right' ? 'Diestro' : 'Zurdo';
    };

    const handleSendMessage = () => {
        if (!messageText.trim()) return;
        console.log('📨 Mensaje enviado a', selectedPlayer.name, ':', messageText);
        setMessageSent(true);
        setTimeout(() => {
            setShowMessageModal(false);
            setMessageText('');
            setMessageSent(false);
        }, 2000);
    };

    const clearFilters = () => {
        setFilters({ level: 'all', playStyle: 'all', location: 'all' });
        setSearchQuery('');
    };

    // ==================== PLAYER PROFILE VIEW ====================
    if (selectedPlayer) {
        const level = getLevelInfo(selectedPlayer.level);
        const stats = selectedPlayer.stats;

        return (
            <div className="player-search-page">
                {/* Back header */}
                <div className="search-profile-header">
                    <button className="search-back-btn" onClick={() => setSelectedPlayer(null)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                    </button>
                    <h2>Perfil de Jugador</h2>
                    <div style={{ width: 44 }} />
                </div>

                <div className="search-profile-content">
                    {/* Profile Card */}
                    <div className="sp-hero">
                        <div className="sp-hero-bg" />
                        <div className="sp-hero-content">
                            <img src={selectedPlayer.avatar} alt={selectedPlayer.name} className="sp-avatar" />
                            <h1>{selectedPlayer.name}</h1>
                            <p className="sp-location">📍 {selectedPlayer.location} · {selectedPlayer.age} años</p>
                            <div className="sp-pills">
                                <span className="sp-pill" style={{ background: level.bg, color: level.color }}>
                                    {level.emoji} {level.label}
                                </span>
                                <span className="sp-pill">✋ {getHandLabel(selectedPlayer.dominantHand)}</span>
                                <span className="sp-pill">🎾 {getStyleLabel(selectedPlayer.playStyle)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    {selectedPlayer.bio && (
                        <div className="sp-section">
                            <p className="sp-bio">{selectedPlayer.bio}</p>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="sp-stats-grid">
                        <div className="sp-stat">
                            <span className="sp-stat-value" style={{ color: '#F59E0B' }}>{stats.ranking}</span>
                            <span className="sp-stat-label">Ranking</span>
                        </div>
                        <div className="sp-stat">
                            <span className="sp-stat-value" style={{ color: '#8B5CF6' }}>{stats.points.toLocaleString()}</span>
                            <span className="sp-stat-label">Puntos</span>
                        </div>
                        <div className="sp-stat">
                            <span className="sp-stat-value" style={{ color: '#00A86B' }}>{stats.winRate}%</span>
                            <span className="sp-stat-label">Victorias</span>
                        </div>
                        <div className="sp-stat">
                            <span className="sp-stat-value" style={{ color: '#EF4444' }}>🔥{stats.currentStreak}</span>
                            <span className="sp-stat-label">Racha</span>
                        </div>
                    </div>

                    {/* Detail Stats */}
                    <div className="sp-section">
                        <h3>📊 Estadísticas</h3>
                        <div className="sp-detail-rows">
                            <div className="sp-detail-row">
                                <span>Partidos jugados</span>
                                <strong>{stats.matchesPlayed}</strong>
                            </div>
                            <div className="sp-detail-row">
                                <span>Ganados</span>
                                <strong style={{ color: '#00A86B' }}>{stats.matchesWon}</strong>
                            </div>
                            <div className="sp-detail-row">
                                <span>Perdidos</span>
                                <strong style={{ color: '#EF4444' }}>{stats.matchesPlayed - stats.matchesWon}</strong>
                            </div>
                        </div>

                        {/* Win bar */}
                        <div className="sp-win-bar">
                            <div className="sp-win-fill" style={{ width: `${stats.winRate}%` }} />
                        </div>
                        <div className="sp-win-labels">
                            <span style={{ color: '#00A86B' }}>{stats.winRate}% victorias</span>
                            <span style={{ color: '#EF4444' }}>{100 - stats.winRate}% derrotas</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="sp-actions">
                        <button className="sp-btn-message" onClick={() => setShowMessageModal(true)}>
                            💬 Enviar Mensaje
                        </button>
                        <button className="sp-btn-challenge">
                            ⚔️ Desafiar
                        </button>
                    </div>
                </div>

                {/* Message Modal */}
                {showMessageModal && (
                    <div className="message-modal-overlay" onClick={() => { if (!messageSent) { setShowMessageModal(false); setMessageText(''); } }}>
                        <div className="message-modal" onClick={e => e.stopPropagation()}>
                            {messageSent ? (
                                <div className="message-sent-confirmation">
                                    <div className="message-sent-icon">✅</div>
                                    <h3>¡Mensaje enviado!</h3>
                                    <p>{selectedPlayer.name} recibirá tu mensaje</p>
                                </div>
                            ) : (
                                <>
                                    <div className="message-modal-header">
                                        <div className="message-modal-user">
                                            <img src={selectedPlayer.avatar} alt="" className="message-modal-avatar" />
                                            <div>
                                                <strong>Mensaje para {selectedPlayer.name}</strong>
                                                <span>{getLevelInfo(selectedPlayer.level).emoji} {getLevelInfo(selectedPlayer.level).label}</span>
                                            </div>
                                        </div>
                                        <button className="message-modal-close" onClick={() => { setShowMessageModal(false); setMessageText(''); }}>✕</button>
                                    </div>

                                    <div className="message-modal-body">
                                        {/* Quick messages */}
                                        <div className="quick-messages">
                                            {[
                                                '¡Hola! ¿Querés jugar un partido?',
                                                '¿Tenés disponibilidad esta semana?',
                                                '¿Te sumás a un dobles?',
                                                '¡Vi tu perfil, buen nivel!'
                                            ].map((msg, idx) => (
                                                <button
                                                    key={idx}
                                                    className="quick-message-btn"
                                                    onClick={() => setMessageText(msg)}
                                                >
                                                    {msg}
                                                </button>
                                            ))}
                                        </div>

                                        <textarea
                                            className="message-textarea"
                                            placeholder="Escribí tu mensaje..."
                                            value={messageText}
                                            onChange={e => setMessageText(e.target.value)}
                                            rows={4}
                                            maxLength={500}
                                        />
                                        <span className="message-char-count">{messageText.length}/500</span>
                                    </div>

                                    <div className="message-modal-footer">
                                        <button
                                            className="message-send-btn"
                                            onClick={handleSendMessage}
                                            disabled={!messageText.trim()}
                                        >
                                            📨 Enviar Mensaje
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ==================== SEARCH LIST VIEW ====================
    return (
        <div className="player-search-page">
            {/* Search Header */}
            <div className="search-header-bar">
                <div className="search-input-wrapper">
                    <svg className="search-icon-input" width="20" height="20" viewBox="0 0 20 20" fill="#aaa">
                        <circle cx="9" cy="9" r="7" fill="none" stroke="#aaa" strokeWidth="2" />
                        <path d="M14 14l4 4" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <input
                        type="text"
                        className="search-input-main"
                        placeholder="Buscar jugadores por nombre..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
                    )}
                </div>
                <button
                    className={`filter-toggle-btn ${showFilters ? 'active' : ''} ${activeFilterCount > 0 ? 'has-filters' : ''}`}
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 3h14v2H3V3zm2 4h10v2H5V7zm2 4h6v2H7v-2zm2 4h2v2H9v-2z" />
                    </svg>
                    {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
                </button>
            </div>

            {/* Filters */}
            {showFilters && (
                <div className="filters-panel">
                    <div className="filter-group">
                        <label>Nivel</label>
                        <div className="filter-options">
                            {[
                                { value: 'all', label: 'Todos' },
                                { value: 'beginner', label: '🌱 Principiante' },
                                { value: 'intermediate', label: '📈 Intermedio' },
                                { value: 'advanced', label: '⭐ Avanzado' },
                                { value: 'professional', label: '🏆 Pro' },
                            ].map(opt => (
                                <button
                                    key={opt.value}
                                    className={`filter-chip ${filters.level === opt.value ? 'active' : ''}`}
                                    onClick={() => setFilters({ ...filters, level: opt.value })}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Estilo de juego</label>
                        <div className="filter-options">
                            {[
                                { value: 'all', label: 'Todos' },
                                { value: 'singles', label: '🎾 Singles' },
                                { value: 'doubles', label: '👥 Dobles' },
                                { value: 'both', label: '⚡ Ambos' },
                            ].map(opt => (
                                <button
                                    key={opt.value}
                                    className={`filter-chip ${filters.playStyle === opt.value ? 'active' : ''}`}
                                    onClick={() => setFilters({ ...filters, playStyle: opt.value })}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Ubicación</label>
                        <div className="filter-options">
                            <button
                                className={`filter-chip ${filters.location === 'all' ? 'active' : ''}`}
                                onClick={() => setFilters({ ...filters, location: 'all' })}
                            >
                                Todas
                            </button>
                            {locations.map(loc => (
                                <button
                                    key={loc}
                                    className={`filter-chip ${filters.location === loc ? 'active' : ''}`}
                                    onClick={() => setFilters({ ...filters, location: loc })}
                                >
                                    📍 {loc}
                                </button>
                            ))}
                        </div>
                    </div>

                    {activeFilterCount > 0 && (
                        <button className="clear-filters-btn" onClick={clearFilters}>
                            ✕ Limpiar filtros
                        </button>
                    )}
                </div>
            )}

            {/* Results count */}
            <div className="search-results-info">
                <span>{filteredPlayers.length} jugador{filteredPlayers.length !== 1 ? 'es' : ''} encontrado{filteredPlayers.length !== 1 ? 's' : ''}</span>
            </div>

            {/* Player List */}
            <div className="player-list">
                {filteredPlayers.length === 0 ? (
                    <div className="no-results">
                        <span className="no-results-icon">😕</span>
                        <h3>No se encontraron jugadores</h3>
                        <p>Probá con otros filtros o buscá un nombre diferente</p>
                        <button className="clear-filters-btn" onClick={clearFilters}>Limpiar filtros</button>
                    </div>
                ) : (
                    filteredPlayers.map(player => {
                        const level = getLevelInfo(player.level);
                        return (
                            <button
                                key={player.id}
                                className="player-card-search"
                                onClick={() => setSelectedPlayer(player)}
                            >
                                <img src={player.avatar} alt={player.name} className="player-card-avatar" />
                                <div className="player-card-info">
                                    <div className="player-card-top">
                                        <strong>{player.name}</strong>
                                        <span className="player-card-level" style={{ background: level.bg, color: level.color }}>
                                            {level.emoji} {level.label}
                                        </span>
                                    </div>
                                    <div className="player-card-meta">
                                        <span>📍 {player.location}</span>
                                        <span>·</span>
                                        <span>🎾 {getStyleLabel(player.playStyle)}</span>
                                        <span>·</span>
                                        <span>{player.age} años</span>
                                    </div>
                                    <div className="player-card-stats">
                                        <span className="player-mini-stat">🏆 #{player.stats.ranking}</span>
                                        <span className="player-mini-stat">✅ {player.stats.winRate}%</span>
                                        <span className="player-mini-stat">🎮 {player.stats.matchesPlayed} partidos</span>
                                    </div>
                                </div>
                                <svg className="player-card-arrow" width="20" height="20" viewBox="0 0 20 20" fill="#ccc">
                                    <path d="M7 4l6 6-6 6" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default PlayerSearch;