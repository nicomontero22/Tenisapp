import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './PlayerProfile.css';

const PlayerProfile = ({ isPublicView = false, viewingPlayer = null }) => {
    const { user, updateProfile, updateAvatar, logout } = useAuth();
    const [activeSection, setActiveSection] = useState('stats');
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    // Si es vista pública, usar viewingPlayer; si no, usar user propio
    const player = isPublicView ? viewingPlayer : user;
    const profile = player?.profile || {};

    // Mock stats
    const stats = profile.stats || {
        matchesPlayed: 47,
        matchesWon: 31,
        winRate: 66,
        currentStreak: 3,
        longestStreak: 8,
        ranking: 1250,
        points: 3420
    };

    // Mock historial de reservas
    const bookingHistory = [
        {
            id: 1, clubName: 'Club River Plate', courtName: 'Cancha 1',
            date: '2025-02-05', time: '18:00 - 19:30', duration: '1.5h',
            price: 5000, status: 'completed', surface: 'Polvo de ladrillo'
        },
        {
            id: 2, clubName: 'Lawn Tennis Club', courtName: 'Cancha 3',
            date: '2025-02-03', time: '10:00 - 11:00', duration: '1h',
            price: 4200, status: 'completed', surface: 'Césped'
        },
        {
            id: 3, clubName: 'Club Hindú', courtName: 'Cancha 2',
            date: '2025-02-08', time: '16:00 - 18:00', duration: '2h',
            price: 5500, status: 'upcoming', surface: 'Cemento'
        },
        {
            id: 4, clubName: 'Buenos Aires Tenis', courtName: 'Cancha 1',
            date: '2025-01-28', time: '09:00 - 10:00', duration: '1h',
            price: 3500, status: 'cancelled', surface: 'Polvo de ladrillo'
        },
    ];

    // Mock match history
    const matchHistory = [
        { id: 1, opponent: 'Carlos M.', result: 'win', score: '6-3, 6-4', date: '2025-02-04', surface: 'Polvo de ladrillo' },
        { id: 2, opponent: 'Roberto S.', result: 'win', score: '7-5, 6-2', date: '2025-02-01', surface: 'Cemento' },
        { id: 3, opponent: 'Ana L.', result: 'loss', score: '4-6, 3-6', date: '2025-01-28', surface: 'Polvo de ladrillo' },
        { id: 4, opponent: 'Diego P.', result: 'win', score: '6-1, 6-0', date: '2025-01-25', surface: 'Césped' },
        { id: 5, opponent: 'Martín G.', result: 'loss', score: '6-7, 4-6', date: '2025-01-20', surface: 'Cemento' },
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency', currency: 'ARS', minimumFractionDigits: 0
        }).format(amount);
    };

    const getHandLabel = (hand) => {
        return hand === 'right' ? 'Diestro' : hand === 'left' ? 'Zurdo' : hand || '—';
    };

    const getPlayStyleLabel = (style) => {
        const map = { singles: 'Singles', doubles: 'Dobles', both: 'Singles y Dobles' };
        return map[style] || style || '—';
    };

    const getLevelLabel = (level) => {
        const map = {
            beginner: '🌱 Principiante',
            intermediate: '📈 Intermedio',
            advanced: '⭐ Avanzado',
            professional: '🏆 Profesional'
        };
        return map[level] || level || '—';
    };

    const getCourtLabel = (court) => {
        const map = {
            clay: 'Polvo de ladrillo', hard: 'Cemento', grass: 'Césped',
            carpet: 'Sintética', any: 'Todas'
        };
        return map[court] || court || '—';
    };

    const startEditing = () => {
        setEditData({
            name: player?.name || '',
            bio: profile.bio || '',
            location: profile.location || '',
            dominantHand: profile.dominantHand || '',
            playStyle: profile.playStyle || '',
            courtPreference: profile.courtPreference || '',
            skillLevel: profile.skillLevel || '',
        });
        setIsEditing(true);
    };

    const saveEdit = async () => {
        await updateProfile(editData);
        setIsEditing(false);
    };

    const handleAvatarChange = () => {
        const url = prompt('Ingresá la URL de tu nueva foto de perfil:');
        if (url) {
            updateAvatar(url);
        }
    };

    const getStatusBadge = (status) => {
        const map = {
            completed: { label: 'Completada', color: '#00A86B', bg: '#E6F9F1' },
            upcoming: { label: 'Próxima', color: '#3B82F6', bg: '#DBEAFE' },
            cancelled: { label: 'Cancelada', color: '#EF4444', bg: '#FEE2E2' },
        };
        return map[status] || map.completed;
    };

    return (
        <div className="player-profile-page">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-header-bg" />
                <div className="profile-header-content">
                    {/* Avatar */}
                    <div className="profile-avatar-section">
                        <div className="profile-avatar-wrapper">
                            {player?.avatar ? (
                                <img src={player.avatar} alt={player.name} className="profile-avatar-img" />
                            ) : (
                                <div className="profile-avatar-placeholder">
                                    {(player?.name || 'U').charAt(0).toUpperCase()}
                                </div>
                            )}
                            {!isPublicView && (
                                <button className="avatar-edit-btn" onClick={handleAvatarChange}>
                                    📷
                                </button>
                            )}
                        </div>

                        <div className="profile-name-section">
                            <h1>{player?.name || 'Jugador'}</h1>
                            <p className="profile-email">{player?.email}</p>
                            {profile.location && (
                                <p className="profile-location">📍 {profile.location}</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Info Pills */}
                    <div className="profile-pills">
                        {profile.skillLevel && (
                            <span className="profile-pill level">{getLevelLabel(profile.skillLevel)}</span>
                        )}
                        {profile.dominantHand && (
                            <span className="profile-pill">✋ {getHandLabel(profile.dominantHand)}</span>
                        )}
                        {profile.playStyle && (
                            <span className="profile-pill">🎾 {getPlayStyleLabel(profile.playStyle)}</span>
                        )}
                        {profile.courtPreference && (
                            <span className="profile-pill">🏟️ {getCourtLabel(profile.courtPreference)}</span>
                        )}
                    </div>

                    {/* Bio */}
                    {profile.bio && (
                        <p className="profile-bio">{profile.bio}</p>
                    )}

                    {/* Action Buttons */}
                    {!isPublicView && (
                        <div className="profile-actions">
                            <button className="btn-edit-profile" onClick={startEditing}>
                                ✏️ Editar Perfil
                            </button>
                            <button className="btn-logout-profile" onClick={() => {
                                if (window.confirm('¿Cerrar sesión?')) logout();
                            }}>
                                Cerrar Sesión
                            </button>
                        </div>
                    )}

                    {isPublicView && (
                        <div className="profile-actions">
                            <button className="btn-challenge">
                                ⚔️ Desafiar a un partido
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="profile-stats-grid">
                <div className="stat-card-profile ranking">
                    <span className="stat-card-icon">🏆</span>
                    <span className="stat-card-value">{stats.ranking}</span>
                    <span className="stat-card-label">Ranking</span>
                </div>
                <div className="stat-card-profile points">
                    <span className="stat-card-icon">⭐</span>
                    <span className="stat-card-value">{stats.points.toLocaleString()}</span>
                    <span className="stat-card-label">Puntos</span>
                </div>
                <div className="stat-card-profile wins">
                    <span className="stat-card-icon">✅</span>
                    <span className="stat-card-value">{stats.winRate}%</span>
                    <span className="stat-card-label">Victorias</span>
                </div>
                <div className="stat-card-profile streak">
                    <span className="stat-card-icon">🔥</span>
                    <span className="stat-card-value">{stats.currentStreak}</span>
                    <span className="stat-card-label">Racha actual</span>
                </div>
            </div>

            {/* Section Tabs */}
            <div className="profile-section-tabs">
                {[
                    { key: 'stats', label: '📊 Estadísticas' },
                    { key: 'history', label: '📅 Reservas' },
                    { key: 'matches', label: '🎾 Partidos' },
                ].map(tab => (
                    <button
                        key={tab.key}
                        className={`profile-section-tab ${activeSection === tab.key ? 'active' : ''}`}
                        onClick={() => setActiveSection(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Stats Section */}
            {activeSection === 'stats' && (
                <div className="profile-section-content">
                    <div className="stats-detail-card">
                        <h3>Resumen de Juego</h3>
                        <div className="stats-detail-grid">
                            <div className="stats-detail-row">
                                <span>Partidos jugados</span>
                                <strong>{stats.matchesPlayed}</strong>
                            </div>
                            <div className="stats-detail-row">
                                <span>Partidos ganados</span>
                                <strong style={{ color: '#00A86B' }}>{stats.matchesWon}</strong>
                            </div>
                            <div className="stats-detail-row">
                                <span>Partidos perdidos</span>
                                <strong style={{ color: '#EF4444' }}>{stats.matchesPlayed - stats.matchesWon}</strong>
                            </div>
                            <div className="stats-detail-row">
                                <span>Porcentaje de victorias</span>
                                <strong>{stats.winRate}%</strong>
                            </div>
                            <div className="stats-detail-row">
                                <span>Racha actual</span>
                                <strong>🔥 {stats.currentStreak} victorias</strong>
                            </div>
                            <div className="stats-detail-row">
                                <span>Mejor racha</span>
                                <strong>⚡ {stats.longestStreak} victorias</strong>
                            </div>
                        </div>
                    </div>

                    {/* Win Rate Bar */}
                    <div className="stats-detail-card">
                        <h3>Rendimiento</h3>
                        <div className="win-rate-bar">
                            <div className="win-rate-fill" style={{ width: `${stats.winRate}%` }}>
                                <span>{stats.matchesWon}W</span>
                            </div>
                            <div className="loss-rate-fill" style={{ width: `${100 - stats.winRate}%` }}>
                                <span>{stats.matchesPlayed - stats.matchesWon}L</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking History */}
            {activeSection === 'history' && (
                <div className="profile-section-content">
                    {bookingHistory.map(booking => {
                        const statusInfo = getStatusBadge(booking.status);
                        return (
                            <div key={booking.id} className="booking-history-card">
                                <div className="booking-history-date">
                                    <span className="booking-day">
                                        {new Date(booking.date + 'T12:00').toLocaleDateString('es-AR', { day: '2-digit' })}
                                    </span>
                                    <span className="booking-month">
                                        {new Date(booking.date + 'T12:00').toLocaleDateString('es-AR', { month: 'short' })}
                                    </span>
                                </div>
                                <div className="booking-history-info">
                                    <h4>{booking.clubName}</h4>
                                    <p>{booking.courtName} · {booking.surface}</p>
                                    <p className="booking-time">{booking.time} ({booking.duration})</p>
                                </div>
                                <div className="booking-history-right">
                                    <span className="booking-price">{formatCurrency(booking.price)}</span>
                                    <span className="booking-status" style={{ background: statusInfo.bg, color: statusInfo.color }}>
                                        {statusInfo.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Match History */}
            {activeSection === 'matches' && (
                <div className="profile-section-content">
                    {matchHistory.map(match => (
                        <div key={match.id} className={`match-history-card ${match.result}`}>
                            <div className={`match-result-indicator ${match.result}`}>
                                {match.result === 'win' ? 'V' : 'D'}
                            </div>
                            <div className="match-info">
                                <h4>vs {match.opponent}</h4>
                                <p>{match.surface} · {new Date(match.date + 'T12:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                            </div>
                            <div className="match-score">
                                {match.score}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {isEditing && (
                <div className="edit-modal-overlay">
                    <div className="edit-modal">
                        <div className="edit-modal-header">
                            <h2>Editar Perfil</h2>
                            <button className="edit-modal-close" onClick={() => setIsEditing(false)}>✕</button>
                        </div>

                        <div className="edit-modal-body">
                            <div className="edit-field">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    value={editData.name}
                                    onChange={e => setEditData({ ...editData, name: e.target.value })}
                                    className="edit-input"
                                />
                            </div>

                            <div className="edit-field">
                                <label>Ubicación</label>
                                <input
                                    type="text"
                                    value={editData.location}
                                    onChange={e => setEditData({ ...editData, location: e.target.value })}
                                    placeholder="Ej: Rosario, Santa Fe"
                                    className="edit-input"
                                />
                            </div>

                            <div className="edit-field">
                                <label>Bio</label>
                                <textarea
                                    value={editData.bio}
                                    onChange={e => setEditData({ ...editData, bio: e.target.value })}
                                    placeholder="Contá algo sobre vos..."
                                    rows={3}
                                    className="edit-textarea"
                                    maxLength={300}
                                />
                                <span className="edit-char-count">{(editData.bio || '').length}/300</span>
                            </div>

                            <div className="edit-field">
                                <label>Mano dominante</label>
                                <div className="edit-options-row">
                                    {[{ v: 'right', l: '🤚 Diestro' }, { v: 'left', l: '🖐️ Zurdo' }].map(o => (
                                        <button key={o.v}
                                            className={`edit-option ${editData.dominantHand === o.v ? 'active' : ''}`}
                                            onClick={() => setEditData({ ...editData, dominantHand: o.v })}
                                        >{o.l}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="edit-field">
                                <label>Estilo de juego</label>
                                <div className="edit-options-row">
                                    {[{ v: 'singles', l: '🎾 Singles' }, { v: 'doubles', l: '👥 Dobles' }, { v: 'both', l: '⚡ Ambos' }].map(o => (
                                        <button key={o.v}
                                            className={`edit-option ${editData.playStyle === o.v ? 'active' : ''}`}
                                            onClick={() => setEditData({ ...editData, playStyle: o.v })}
                                        >{o.l}</button>
                                    ))}
                                </div>
                            </div>

                            <div className="edit-field">
                                <label>Nivel</label>
                                <div className="edit-options-row">
                                    {[
                                        { v: 'beginner', l: '🌱 Principiante' },
                                        { v: 'intermediate', l: '📈 Intermedio' },
                                        { v: 'advanced', l: '⭐ Avanzado' },
                                        { v: 'professional', l: '🏆 Pro' }
                                    ].map(o => (
                                        <button key={o.v}
                                            className={`edit-option ${editData.skillLevel === o.v ? 'active' : ''}`}
                                            onClick={() => setEditData({ ...editData, skillLevel: o.v })}
                                        >{o.l}</button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="edit-modal-footer">
                            <button className="btn-cancel-edit" onClick={() => setIsEditing(false)}>
                                Cancelar
                            </button>
                            <button className="btn-save-edit" onClick={saveEdit}>
                                💾 Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayerProfile;