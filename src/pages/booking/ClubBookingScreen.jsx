import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import { useAuth } from '../../context/AuthContext';
import { calculatePaymentBreakdown } from '../../models/BookingModels';
import './ClubBookingScreen.css';

const ClubBookingScreen = ({ club, court, onBack, onBookingComplete }) => {
    const { user, logout } = useAuth();

    // Estados principales
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState('1.5h'); // Default: 1.5h (más elegida)
    const [availableDates, setAvailableDates] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(false);

    // Duraciones disponibles
    const durations = [
        { id: '1h', label: '1h', minutes: 60 },
        { id: '1.5h', label: '1.5h', minutes: 90 },
        { id: '2h', label: '2h', minutes: 120 },
        { id: '2.5h', label: '2.5h', minutes: 150 },
    ];

    // Generar fechas disponibles (próximos 30 días)
    useEffect(() => {
        generateAvailableDates();
    }, []);

    // Cuando cambia fecha o duración, obtener horarios disponibles
    useEffect(() => {
        if (selectedDate && selectedDuration) {
            fetchAvailableSlots(selectedDate, selectedDuration);
        }
    }, [selectedDate, selectedDuration]);

    const generateAvailableDates = () => {
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                date: date,
                dateString: date.toISOString().split('T')[0],
                dayName: date.toLocaleDateString('es-AR', { weekday: 'short' }),
                dayNumber: date.getDate(),
                monthName: date.toLocaleDateString('es-AR', { month: 'short' }),
                isToday: i === 0,
            });
        }

        setAvailableDates(dates);
        setSelectedDate(dates[0].dateString); // Seleccionar hoy por defecto
    };

    const fetchAvailableSlots = async (date, duration) => {
        setLoading(true);
        setSelectedSlot(null); // Reset selección al cambiar filtros

        try {
            // TODO: Llamada real a API Java
            // const response = await fetch(`/api/clubs/${club.id}/courts/${court.id}/availability?date=${date}&duration=${duration}`);
            // const data = await response.json();

            // Simulación de respuesta
            await new Promise(resolve => setTimeout(resolve, 500));

            const slots = generateMockSlots(date, duration);
            setAvailableSlots(slots);
        } catch (error) {
            console.error('Error al obtener disponibilidad:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateMockSlots = (date, durationId) => {
        const slots = [];
        const durationMinutes = durations.find(d => d.id === durationId).minutes;
        const startHour = 8;
        const endHour = 22;

        for (let hour = startHour; hour < endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const endMinutes = (hour * 60) + minute + durationMinutes;
                const endHour = Math.floor(endMinutes / 60);
                const endMinute = endMinutes % 60;
                const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

                if (endHour <= 22) {
                    const isNight = hour >= 18;
                    const basePrice = court.pricing[durationId];
                    const price = isNight && court.hasLights ? court.nightPricing[durationId] : basePrice;

                    // Simular disponibilidad (70% disponible)
                    const available = Math.random() > 0.3;
                    const reason = available ? null : ['RESERVED', 'CLASS', 'BLOCKED'][Math.floor(Math.random() * 3)];

                    slots.push({
                        id: `${date}-${startTime}-${court.id}`,
                        courtId: court.id,
                        courtName: court.name,
                        date,
                        startTime,
                        endTime,
                        duration: durationMinutes,
                        price,
                        isNight,
                        available,
                        reason,
                    });
                }
            }
        }

        return slots;
    };

    const handleSlotSelect = (slot) => {
        if (slot.available) {
            setSelectedSlot(slot);
        }
    };

    const handleContinueToPayment = () => {
        if (selectedSlot) {
            // TODO: Navegar a pantalla de pago
            console.log('Continuar a pago:', {
                club,
                court,
                slot: selectedSlot,
                breakdown: calculatePaymentBreakdown(
                    selectedSlot.price,
                    club.pricing.depositPercentage,
                    club.pricing.cashDiscountPercentage
                )
            });
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(price);
    };

    const getReasonLabel = (reason) => {
        const labels = {
            RESERVED: 'Reservado',
            CLASS: 'Clase',
            BLOCKED: 'Bloqueado'
        };
        return labels[reason] || 'No disponible';
    };

    return (
        <div className="booking-screen">
            <Header user={user} onLogout={logout} />

            {/* Breadcrumb */}
            <div className="container">
                <button onClick={onBack} className="back-link">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M12 8a.5.5 0 01-.5.5H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5a.5.5 0 01.5.5z" />
                    </svg>
                    Volver al club
                </button>
            </div>

            {/* Sticky Filters Header */}
            <div className="filters-sticky">
                <div className="container">
                    <div className="filters-content">
                        {/* Club Info */}
                        <div className="booking-info">
                            <h1>{club.name}</h1>
                            <p>
                                {court.name} • {court.courtTypeName}
                                {court.hasLights && ' • Iluminación'}
                            </p>
                        </div>

                        {/* Date Selector */}
                        <div className="filter-section">
                            <label className="filter-label">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5zM1 4v10a1 1 0 001 1h12a1 1 0 001-1V4H1z" />
                                </svg>
                                Fecha
                            </label>
                            <div className="dates-scroll">
                                {availableDates.map((dateObj) => (
                                    <button
                                        key={dateObj.dateString}
                                        className={`date-chip ${selectedDate === dateObj.dateString ? 'selected' : ''}`}
                                        onClick={() => setSelectedDate(dateObj.dateString)}
                                    >
                                        <span className="date-day">{dateObj.dayName}</span>
                                        <span className="date-number">{dateObj.dayNumber}</span>
                                        <span className="date-month">{dateObj.monthName}</span>
                                        {dateObj.isToday && <span className="today-badge">Hoy</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Duration Selector */}
                        <div className="filter-section">
                            <label className="filter-label">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
                                    <path d="M8 3.5a.5.5 0 01.5.5v4l3 1.5a.5.5 0 01-.5.866l-3.5-1.75A.5.5 0 017 8V4a.5.5 0 01.5-.5z" />
                                </svg>
                                Duración
                            </label>
                            <div className="duration-chips">
                                {durations.map((duration) => (
                                    <button
                                        key={duration.id}
                                        className={`duration-chip ${selectedDuration === duration.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedDuration(duration.id)}
                                    >
                                        {duration.label}
                                        {duration.id === '1.5h' && (
                                            <span className="popular-star">★</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Slots */}
            <div className="container">
                <div className="slots-container">
                    <div className="slots-header">
                        <h2>Horarios Disponibles</h2>
                        {loading && (
                            <div className="loading-indicator">
                                <div className="spinner-small"></div>
                                <span>Buscando disponibilidad...</span>
                            </div>
                        )}
                        {!loading && availableSlots.length > 0 && (
                            <span className="slots-count">
                                {availableSlots.filter(s => s.available).length} horarios disponibles
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="loading-skeleton">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="skeleton-slot"></div>
                            ))}
                        </div>
                    ) : availableSlots.length === 0 ? (
                        <div className="empty-state">
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor" opacity="0.3">
                                <path d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4zm0 52c-13.234 0-24-10.766-24-24S18.766 8 32 8s24 10.766 24 24-10.766 24-24 24z" />
                                <path d="M42 28H22v4h20v-4zm0 8H22v4h20v-4z" />
                            </svg>
                            <h3>No hay horarios disponibles</h3>
                            <p>Probá con otra fecha o duración</p>
                        </div>
                    ) : (
                        <div className="slots-grid">
                            {availableSlots.map((slot) => (
                                <button
                                    key={slot.id}
                                    className={`slot-card ${!slot.available ? 'unavailable' : ''} ${slot.isNight ? 'night' : ''} ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                                    onClick={() => handleSlotSelect(slot)}
                                    disabled={!slot.available}
                                >
                                    <div className="slot-time">
                                        {slot.startTime}
                                        {slot.isNight && (
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="light-icon">
                                                <path d="M7 3a4 4 0 100 8 4 4 0 000-8z" />
                                            </svg>
                                        )}
                                    </div>

                                    {slot.available ? (
                                        <>
                                            <div className="slot-price">{formatPrice(slot.price)}</div>
                                            {slot.isNight && (
                                                <div className="slot-badge night-badge">Con luz</div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="slot-unavailable">
                                            {getReasonLabel(slot.reason)}
                                        </div>
                                    )}

                                    {selectedSlot?.id === slot.id && (
                                        <div className="slot-check">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Summary (cuando hay selección) */}
            {selectedSlot && (
                <div className="floating-summary">
                    <div className="container">
                        <div className="summary-content">
                            <div className="summary-info">
                                <div className="summary-main">
                                    <strong>
                                        {availableDates.find(d => d.dateString === selectedDate)?.date.toLocaleDateString('es-AR', {
                                            day: 'numeric',
                                            month: 'short'
                                        })}
                                    </strong>
                                    <span className="separator">•</span>
                                    <strong>{selectedSlot.startTime} - {selectedSlot.endTime}</strong>
                                    <span className="separator">•</span>
                                    <span>{selectedSlot.courtName}</span>
                                </div>
                                <div className="summary-price">
                                    <span className="price-label">Total:</span>
                                    <span className="price-value">{formatPrice(selectedSlot.price)}</span>
                                </div>
                            </div>
                            <button className="btn-continue" onClick={handleContinueToPayment}>
                                Continuar al pago
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClubBookingScreen;