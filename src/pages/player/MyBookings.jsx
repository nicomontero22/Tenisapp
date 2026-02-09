import React, { useState } from 'react';
import './MyBookings.css';

const MyBookings = ({ onRepeatBooking }) => {
    const [filter, setFilter] = useState('all');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showCancelConfirm, setShowCancelConfirm] = useState(null);

    const [bookings, setBookings] = useState([
        {
            id: 'TB-284731',
            clubName: 'Club Atlético River Plate',
            clubImage: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=200&h=200&fit=crop',
            courtName: 'Cancha 1',
            surface: 'Polvo de ladrillo',
            surfaceColor: '#D2691E',
            date: '2026-02-12',
            time: '18:00',
            endTime: '19:30',
            duration: '1.5h',
            totalPrice: 4900,
            depositPaid: 1470,
            remainingPayment: 3430,
            paymentMethod: 'MercadoPago',
            status: 'upcoming',
            address: 'Av. Libertador 7395, Núñez, CABA',
            covered: false,
            hasLights: true,
        },
        {
            id: 'TB-284650',
            clubName: 'Club Hindú',
            clubImage: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=200&h=200&fit=crop',
            courtName: 'Cancha 3',
            surface: 'Césped',
            surfaceColor: '#228B22',
            date: '2026-02-15',
            time: '10:00',
            endTime: '12:00',
            duration: '2h',
            totalPrice: 12600,
            depositPaid: 3780,
            remainingPayment: 8820,
            paymentMethod: 'MODO',
            status: 'upcoming',
            address: 'Don Bosco 3575, Quilmes, Buenos Aires',
            covered: true,
            hasLights: true,
        },
        {
            id: 'TB-283912',
            clubName: 'Lawn Tennis Club',
            clubImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=200&h=200&fit=crop',
            courtName: 'Cancha 2',
            surface: 'Polvo de ladrillo',
            surfaceColor: '#D2691E',
            date: '2026-02-05',
            time: '16:00',
            endTime: '17:00',
            duration: '1h',
            totalPrice: 4200,
            depositPaid: 1260,
            remainingPayment: 2940,
            paymentMethod: 'MercadoPago',
            status: 'completed',
            address: 'Olleros 1510, Belgrano, CABA',
            covered: false,
            hasLights: true,
        },
        {
            id: 'TB-283801',
            clubName: 'Buenos Aires Tenis Club',
            clubImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200&h=200&fit=crop',
            courtName: 'Cancha 1',
            surface: 'Cemento',
            surfaceColor: '#808080',
            date: '2026-02-01',
            time: '09:00',
            endTime: '10:30',
            duration: '1.5h',
            totalPrice: 6720,
            depositPaid: 2016,
            remainingPayment: 4704,
            paymentMethod: 'MercadoPago',
            status: 'completed',
            address: 'Av. Bullrich 345, Palermo, CABA',
            covered: true,
            hasLights: true,
        },
        {
            id: 'TB-283455',
            clubName: 'Club Náutico Hacoaj',
            clubImage: 'https://images.unsplash.com/photo-1617883861744-87c6734c8b29?w=200&h=200&fit=crop',
            courtName: 'Cancha 1',
            surface: 'Polvo de ladrillo',
            surfaceColor: '#D2691E',
            date: '2026-01-28',
            time: '18:00',
            endTime: '19:00',
            duration: '1h',
            totalPrice: 3200,
            depositPaid: 960,
            remainingPayment: 2240,
            paymentMethod: 'MODO',
            status: 'cancelled',
            cancelReason: 'Lluvia',
            refunded: true,
            address: 'Av. San Martín 2845, Tigre, Buenos Aires',
            covered: false,
            hasLights: true,
        },
        {
            id: 'TB-282990',
            clubName: 'Club Atlético River Plate',
            clubImage: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=200&h=200&fit=crop',
            courtName: 'Cancha 3',
            surface: 'Cemento',
            surfaceColor: '#808080',
            date: '2026-01-20',
            time: '20:00',
            endTime: '21:30',
            duration: '1.5h',
            totalPrice: 5880,
            depositPaid: 1764,
            remainingPayment: 4116,
            paymentMethod: 'MercadoPago',
            status: 'completed',
            address: 'Av. Libertador 7395, Núñez, CABA',
            covered: true,
            hasLights: true,
        },
    ]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency', currency: 'ARS', minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr + 'T12:00');
        return date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
    };

    const formatDateShort = (dateStr) => {
        const date = new Date(dateStr + 'T12:00');
        return {
            day: date.toLocaleDateString('es-AR', { day: '2-digit' }),
            month: date.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase(),
            weekday: date.toLocaleDateString('es-AR', { weekday: 'short' }),
        };
    };

    const getStatusInfo = (status) => {
        const map = {
            upcoming: { label: 'Próxima', color: '#3B82F6', bg: '#DBEAFE', icon: '📅' },
            completed: { label: 'Completada', color: '#00A86B', bg: '#E6F9F1', icon: '✅' },
            cancelled: { label: 'Cancelada', color: '#EF4444', bg: '#FEE2E2', icon: '❌' },
        };
        return map[status] || map.upcoming;
    };

    const getDaysUntil = (dateStr) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(dateStr + 'T12:00');
        target.setHours(0, 0, 0, 0);
        const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
        if (diff === 0) return 'Hoy';
        if (diff === 1) return 'Mañana';
        if (diff < 0) return `Hace ${Math.abs(diff)} días`;
        return `En ${diff} días`;
    };

    const filteredBookings = filter === 'all'
        ? bookings
        : bookings.filter(b => b.status === filter);

    const upcomingCount = bookings.filter(b => b.status === 'upcoming').length;
    const completedCount = bookings.filter(b => b.status === 'completed').length;
    const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

    const handleCancel = (bookingId) => {
        setBookings(bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'cancelled', cancelReason: 'Cancelada por el jugador', refunded: true } : b
        ));
        setShowCancelConfirm(null);
        setSelectedBooking(null);
    };

    const handleRepeat = (booking) => {
        if (onRepeatBooking) {
            onRepeatBooking(booking);
        } else {
            alert(`Reservar de nuevo: ${booking.courtName} en ${booking.clubName}\n\nEsta función redirigirá al sistema de reservas con los datos precargados.`);
        }
    };

    // Generate QR code as SVG (simple mock)
    const generateQRCode = (code) => {
        const size = 160;
        const modules = 21;
        const moduleSize = size / modules;

        // Pseudo-random pattern based on code
        const seed = code.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        const rects = [];

        for (let r = 0; r < modules; r++) {
            for (let c = 0; c < modules; c++) {
                // Fixed patterns (corners)
                const isCorner = (r < 7 && c < 7) || (r < 7 && c > modules - 8) || (r > modules - 8 && c < 7);
                const isBorder = isCorner && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
                    (r === 0 || r === 6 || c === modules - 7 || c === modules - 1 || (r >= 2 && r <= 4 && c >= modules - 5 && c <= modules - 3)) ||
                    (r === modules - 7 || r === modules - 1 || c === 0 || c === 6 || (r >= modules - 5 && r <= modules - 3 && c >= 2 && c <= 4)));

                const hash = ((seed + r * 31 + c * 17) * 2654435761) >>> 0;
                const shouldFill = isCorner || (hash % 3 === 0);

                if (shouldFill) {
                    rects.push(
                        <rect key={`${r}-${c}`} x={c * moduleSize} y={r * moduleSize}
                            width={moduleSize} height={moduleSize} fill="#1a1a1a" />
                    );
                }
            }
        }

        return (
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <rect width={size} height={size} fill="white" />
                {rects}
            </svg>
        );
    };

    // ==================== BOOKING DETAIL ====================
    if (selectedBooking) {
        const b = selectedBooking;
        const status = getStatusInfo(b.status);

        return (
            <div className="my-bookings">
                {/* Header */}
                <div className="booking-detail-header">
                    <button className="bd-back" onClick={() => setSelectedBooking(null)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                    </button>
                    <h2>Detalle de Reserva</h2>
                    <div style={{ width: 40 }} />
                </div>

                <div className="booking-detail-content">
                    {/* Status */}
                    <div className="bd-status-banner" style={{ background: status.bg, color: status.color }}>
                        <span>{status.icon} {status.label}</span>
                        {b.status === 'upcoming' && <span className="bd-countdown">{getDaysUntil(b.date)}</span>}
                    </div>

                    {/* QR Code */}
                    {b.status !== 'cancelled' && (
                        <div className="bd-qr-section">
                            <div className="bd-qr-code">
                                {generateQRCode(b.id)}
                            </div>
                            <p className="bd-qr-label">Mostrá este código en el club</p>
                            <span className="bd-booking-code">{b.id}</span>
                        </div>
                    )}

                    {/* Club Info */}
                    <div className="bd-card">
                        <div className="bd-club-row">
                            <img src={b.clubImage} alt="" className="bd-club-img" />
                            <div>
                                <h3>{b.clubName}</h3>
                                <p>📍 {b.address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Info */}
                    <div className="bd-card">
                        <h4>Detalles de la reserva</h4>
                        <div className="bd-info-grid">
                            <div className="bd-info-row">
                                <span className="bd-info-icon">🎾</span>
                                <div>
                                    <strong>{b.courtName}</strong>
                                    <p>{b.surface} {b.covered ? '· Techada' : ''} {b.hasLights ? '· Con luz' : ''}</p>
                                </div>
                            </div>
                            <div className="bd-info-row">
                                <span className="bd-info-icon">📅</span>
                                <div>
                                    <strong>{formatDate(b.date)}</strong>
                                    <p>{b.time} - {b.endTime} ({b.duration})</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bd-card">
                        <h4>Detalle de pago</h4>
                        <div className="bd-payment-rows">
                            <div className="bd-payment-row">
                                <span>Precio total</span>
                                <strong>{formatCurrency(b.totalPrice)}</strong>
                            </div>
                            <div className="bd-payment-row">
                                <span>Seña pagada ({b.paymentMethod})</span>
                                <strong style={{ color: '#00A86B' }}>- {formatCurrency(b.depositPaid)}</strong>
                            </div>
                            <div className="bd-payment-divider" />
                            {b.status === 'cancelled' && b.refunded ? (
                                <div className="bd-payment-row">
                                    <span>Seña devuelta</span>
                                    <strong style={{ color: '#3B82F6' }}>{formatCurrency(b.depositPaid)}</strong>
                                </div>
                            ) : (
                                <div className="bd-payment-row total">
                                    <span>Resta pagar en el club</span>
                                    <strong>{formatCurrency(b.remainingPayment)}</strong>
                                </div>
                            )}
                        </div>

                        {b.status !== 'cancelled' && (
                            <div className="bd-deposit-note">
                                <span>💡</span>
                                <p>La seña fue abonada con {b.paymentMethod}. El resto se paga en el club el día de juego.</p>
                            </div>
                        )}

                        {b.status === 'cancelled' && (
                            <div className="bd-cancel-note">
                                <span>ℹ️</span>
                                <p>Motivo: {b.cancelReason}. {b.refunded ? 'La seña fue devuelta a tu cuenta.' : 'La seña no es reembolsable.'}</p>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="bd-actions">
                        {b.status === 'upcoming' && (
                            <button className="bd-btn-cancel" onClick={() => setShowCancelConfirm(b.id)}>
                                ❌ Cancelar Reserva
                            </button>
                        )}
                        {(b.status === 'completed' || b.status === 'cancelled') && (
                            <button className="bd-btn-repeat" onClick={() => handleRepeat(b)}>
                                🔄 Reservar de nuevo
                            </button>
                        )}
                    </div>
                </div>

                {/* Cancel Confirmation */}
                {showCancelConfirm && (
                    <div className="cancel-overlay" onClick={() => setShowCancelConfirm(null)}>
                        <div className="cancel-modal" onClick={e => e.stopPropagation()}>
                            <h3>⚠️ ¿Cancelar reserva?</h3>
                            <p>Si cancelás con más de 24hs de anticipación, te devolvemos la seña. Si no, se pierde.</p>
                            <div className="cancel-modal-info">
                                <strong>{b.clubName}</strong>
                                <span>{b.courtName} · {formatDate(b.date)} · {b.time}</span>
                            </div>
                            <div className="cancel-modal-actions">
                                <button className="btn-keep" onClick={() => setShowCancelConfirm(null)}>
                                    Mantener reserva
                                </button>
                                <button className="btn-confirm-cancel" onClick={() => handleCancel(showCancelConfirm)}>
                                    Sí, cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // ==================== BOOKINGS LIST ====================
    return (
        <div className="my-bookings">
            {/* Stats Summary */}
            <div className="bookings-summary-cards">
                <div className="bs-card" onClick={() => setFilter('upcoming')}>
                    <span className="bs-card-number" style={{ color: '#3B82F6' }}>{upcomingCount}</span>
                    <span className="bs-card-label">Próximas</span>
                </div>
                <div className="bs-card" onClick={() => setFilter('completed')}>
                    <span className="bs-card-number" style={{ color: '#00A86B' }}>{completedCount}</span>
                    <span className="bs-card-label">Completadas</span>
                </div>
                <div className="bs-card" onClick={() => setFilter('cancelled')}>
                    <span className="bs-card-number" style={{ color: '#EF4444' }}>{cancelledCount}</span>
                    <span className="bs-card-label">Canceladas</span>
                </div>
            </div>

            {/* Filter Chips */}
            <div className="bookings-filters">
                {[
                    { key: 'all', label: `Todas (${bookings.length})` },
                    { key: 'upcoming', label: `📅 Próximas (${upcomingCount})` },
                    { key: 'completed', label: `✅ Completadas (${completedCount})` },
                    { key: 'cancelled', label: `❌ Canceladas (${cancelledCount})` },
                ].map(f => (
                    <button
                        key={f.key}
                        className={`booking-filter-chip ${filter === f.key ? 'active' : ''}`}
                        onClick={() => setFilter(f.key)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Deposit Reminder */}
            <div className="deposit-reminder">
                <span className="deposit-reminder-icon">💡</span>
                <p>Recordá: todas las reservas requieren el pago de una <strong>seña</strong> para confirmarse. Sin seña, no hay reserva.</p>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
                <div className="no-bookings">
                    <span className="no-bookings-icon">📅</span>
                    <h3>No hay reservas {filter !== 'all' ? 'con este filtro' : ''}</h3>
                    <p>Buscá un club y hacé tu primera reserva</p>
                </div>
            ) : (
                <div className="bookings-list">
                    {filteredBookings.map(booking => {
                        const dateInfo = formatDateShort(booking.date);
                        const status = getStatusInfo(booking.status);

                        return (
                            <button
                                key={booking.id}
                                className="booking-list-card"
                                onClick={() => setSelectedBooking(booking)}
                            >
                                {/* Date block */}
                                <div className="blc-date">
                                    <span className="blc-day">{dateInfo.day}</span>
                                    <span className="blc-month">{dateInfo.month}</span>
                                </div>

                                {/* Info */}
                                <div className="blc-info">
                                    <div className="blc-top">
                                        <strong>{booking.clubName}</strong>
                                        <span className="blc-status" style={{ background: status.bg, color: status.color }}>
                                            {status.label}
                                        </span>
                                    </div>
                                    <div className="blc-details">
                                        <span>
                                            <span className="blc-dot" style={{ background: booking.surfaceColor }} />
                                            {booking.courtName} · {booking.surface}
                                        </span>
                                    </div>
                                    <div className="blc-time-row">
                                        <span>🕐 {booking.time} - {booking.endTime}</span>
                                        <span className="blc-price">{formatCurrency(booking.totalPrice)}</span>
                                    </div>
                                    {booking.status === 'upcoming' && (
                                        <span className="blc-countdown">{getDaysUntil(booking.date)}</span>
                                    )}
                                </div>

                                <svg className="blc-arrow" width="20" height="20" viewBox="0 0 20 20">
                                    <path d="M7 4l6 6-6 6" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyBookings;