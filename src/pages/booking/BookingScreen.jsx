import React, { useState, useMemo } from 'react';
import './BookingScreen.css';

const BookingScreen = ({ club, court: initialCourt, onBack, onBookingComplete }) => {
    const [step, setStep] = useState(1); // 1: fecha+hora, 2: resumen, 3: pago, 4: confirmado
    const [selectedCourt, setSelectedCourt] = useState(initialCourt || null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState('1h');
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [weekOffset, setWeekOffset] = useState(0);

    // Mock club data si no viene por props
    const clubData = club || {
        id: 1,
        name: 'Club Atlético River Plate',
        courts: [
            { id: 1, name: 'Cancha 1', surface: 'Polvo de ladrillo', surfaceColor: '#D2691E', covered: false, hasLights: true, pricePerHour: 3500 },
            { id: 2, name: 'Cancha 2', surface: 'Cemento', surfaceColor: '#808080', covered: false, hasLights: true, pricePerHour: 4200 },
            { id: 3, name: 'Cancha 3', surface: 'Cemento', surfaceColor: '#808080', covered: true, hasLights: true, pricePerHour: 4800 },
        ],
        depositPercentage: 30,
    };

    const durations = [
        { key: '1h', label: '1 hora', minutes: 60, multiplier: 1 },
        { key: '1.5h', label: '1:30 hs', minutes: 90, multiplier: 1.4 },
        { key: '2h', label: '2 horas', minutes: 120, multiplier: 1.8 },
        { key: '2.5h', label: '2:30 hs', minutes: 150, multiplier: 2.2 },
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency', currency: 'ARS', minimumFractionDigits: 0
        }).format(amount);
    };

    // Generar días de la semana actual + offset
    const weekDays = useMemo(() => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() + (weekOffset * 7));

        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);

            const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

            days.push({
                date: date,
                dayName: date.toLocaleDateString('es-AR', { weekday: 'short' }).toUpperCase(),
                dayNumber: date.getDate(),
                monthName: date.toLocaleDateString('es-AR', { month: 'short' }),
                isToday: date.toDateString() === today.toDateString(),
                isPast: isPast,
                dateKey: date.toISOString().split('T')[0],
            });
        }
        return days;
    }, [weekOffset]);

    // Generar horarios disponibles (mock)
    const timeSlots = useMemo(() => {
        if (!selectedDate || !selectedCourt) return [];

        const slots = [];
        const startHour = 8;
        const endHour = 23;
        const now = new Date();

        for (let h = startHour; h < endHour; h++) {
            for (let m = 0; m < 60; m += 30) {
                const time = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

                // Si es hoy, no mostrar horas pasadas
                if (selectedDate.isToday) {
                    if (h < now.getHours() || (h === now.getHours() && m <= now.getMinutes())) {
                        continue;
                    }
                }

                // Mock: algunos horarios ocupados aleatoriamente
                const seed = (selectedDate.dayNumber * 100 + h * 10 + m + selectedCourt.id) % 7;
                const isOccupied = seed === 0 || seed === 3;
                const isBlocked = seed === 5 && h >= 14 && h <= 16;

                slots.push({
                    time: time,
                    label: time,
                    available: !isOccupied && !isBlocked,
                    isOccupied: isOccupied,
                    isBlocked: isBlocked,
                    blockReason: isBlocked ? 'Clase fija' : null,
                });
            }
        }
        return slots;
    }, [selectedDate, selectedCourt]);

    // Calcular precio
    const selectedDurationInfo = durations.find(d => d.key === selectedDuration);
    const basePrice = selectedCourt?.pricePerHour || 0;
    const totalPrice = Math.round(basePrice * (selectedDurationInfo?.multiplier || 1));
    const depositAmount = Math.round(totalPrice * ((clubData.depositPercentage || 30) / 100));

    // Verificar si el horario seleccionado tiene conflicto con duración
    const hasTimeConflict = useMemo(() => {
        if (!selectedTime || !selectedDurationInfo) return false;

        const [startH, startM] = selectedTime.split(':').map(Number);
        const startMinutes = startH * 60 + startM;
        const endMinutes = startMinutes + selectedDurationInfo.minutes;

        // Verificar que todos los slots necesarios estén disponibles
        for (let m = startMinutes + 30; m < endMinutes; m += 30) {
            const h = Math.floor(m / 60);
            const min = m % 60;
            const timeStr = `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
            const slot = timeSlots.find(s => s.time === timeStr);
            if (!slot || !slot.available) return true;
        }
        return false;
    }, [selectedTime, selectedDurationInfo, timeSlots]);

    const getEndTime = () => {
        if (!selectedTime || !selectedDurationInfo) return '';
        const [h, m] = selectedTime.split(':').map(Number);
        const totalMin = h * 60 + m + selectedDurationInfo.minutes;
        const endH = Math.floor(totalMin / 60);
        const endM = totalMin % 60;
        return `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
    };

    const handleConfirmBooking = async () => {
        if (!paymentMethod) return;
        setProcessing(true);

        // Simular procesamiento de pago
        await new Promise(resolve => setTimeout(resolve, 2500));

        setProcessing(false);
        setStep(4);

        if (onBookingComplete) {
            onBookingComplete({
                club: clubData.name,
                court: selectedCourt.name,
                date: selectedDate.dateKey,
                time: selectedTime,
                endTime: getEndTime(),
                duration: selectedDuration,
                totalPrice,
                depositPaid: depositAmount,
                paymentMethod,
            });
        }
    };

    const canProceedToSummary = selectedCourt && selectedDate && selectedTime && !hasTimeConflict;

    // ==================== STEP 1: Selección ====================
    const renderStep1 = () => (
        <div className="booking-step-content">
            {/* Court Selection */}
            <div className="booking-section">
                <h3 className="booking-section-title">🎾 Elegí la cancha</h3>
                <div className="court-selector-row">
                    {clubData.courts.map(court => (
                        <button
                            key={court.id}
                            className={`court-selector-btn ${selectedCourt?.id === court.id ? 'active' : ''}`}
                            onClick={() => { setSelectedCourt(court); setSelectedTime(null); }}
                        >
                            <div className="court-selector-dot" style={{ background: court.surfaceColor }} />
                            <div className="court-selector-info">
                                <strong>{court.name}</strong>
                                <span>{court.surface}</span>
                            </div>
                            <span className="court-selector-price">{formatCurrency(court.pricePerHour)}/h</span>
                            {court.covered && <span className="court-tag-mini">🏠</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Week Calendar */}
            <div className="booking-section">
                <div className="week-header">
                    <h3 className="booking-section-title">📅 Elegí el día</h3>
                    <div className="week-nav">
                        <button
                            className="week-nav-btn"
                            onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
                            disabled={weekOffset === 0}
                        >
                            ←
                        </button>
                        <span className="week-label">
                            {weekOffset === 0 ? 'Esta semana' : weekOffset === 1 ? 'Próxima semana' : `En ${weekOffset} semanas`}
                        </span>
                        <button
                            className="week-nav-btn"
                            onClick={() => setWeekOffset(Math.min(3, weekOffset + 1))}
                            disabled={weekOffset >= 3}
                        >
                            →
                        </button>
                    </div>
                </div>

                <div className="week-calendar">
                    {weekDays.map(day => (
                        <button
                            key={day.dateKey}
                            className={`week-day ${selectedDate?.dateKey === day.dateKey ? 'selected' : ''} ${day.isToday ? 'today' : ''} ${day.isPast ? 'past' : ''}`}
                            onClick={() => { if (!day.isPast) { setSelectedDate(day); setSelectedTime(null); } }}
                            disabled={day.isPast}
                        >
                            <span className="week-day-name">{day.dayName}</span>
                            <span className="week-day-number">{day.dayNumber}</span>
                            <span className="week-day-month">{day.monthName}</span>
                            {day.isToday && <span className="today-dot" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Duration */}
            {selectedCourt && (
                <div className="booking-section">
                    <h3 className="booking-section-title">⏱️ Duración</h3>
                    <div className="duration-selector">
                        {durations.map(dur => {
                            const price = Math.round(basePrice * dur.multiplier);
                            return (
                                <button
                                    key={dur.key}
                                    className={`duration-btn ${selectedDuration === dur.key ? 'active' : ''}`}
                                    onClick={() => { setSelectedDuration(dur.key); setSelectedTime(null); }}
                                >
                                    <span className="duration-label">{dur.label}</span>
                                    <span className="duration-price">{formatCurrency(price)}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Time Slots */}
            {selectedDate && selectedCourt && (
                <div className="booking-section">
                    <h3 className="booking-section-title">
                        🕐 Horarios disponibles
                        <span className="time-slots-date">
                            {selectedDate.dayName} {selectedDate.dayNumber} {selectedDate.monthName}
                        </span>
                    </h3>

                    {timeSlots.length === 0 ? (
                        <div className="no-slots-message">
                            <p>No hay horarios disponibles para este día</p>
                        </div>
                    ) : (
                        <div className="time-slots-grid">
                            {timeSlots.map(slot => (
                                <button
                                    key={slot.time}
                                    className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} ${!slot.available ? 'unavailable' : ''}`}
                                    onClick={() => { if (slot.available) setSelectedTime(slot.time); }}
                                    disabled={!slot.available}
                                    title={slot.blockReason || (slot.isOccupied ? 'Ocupado' : '')}
                                >
                                    {slot.label}
                                    {slot.isBlocked && <span className="slot-badge blocked">Clase</span>}
                                    {slot.isOccupied && <span className="slot-badge occupied">Ocupado</span>}
                                </button>
                            ))}
                        </div>
                    )}

                    {hasTimeConflict && selectedTime && (
                        <div className="time-conflict-warning">
                            ⚠️ La duración seleccionada se superpone con un horario ocupado. Elegí otro horario o reducí la duración.
                        </div>
                    )}
                </div>
            )}

            {/* Continue Button */}
            <div className="booking-bottom-bar">
                {selectedTime && selectedCourt && !hasTimeConflict ? (
                    <div className="booking-bottom-summary">
                        <div className="booking-bottom-info">
                            <span className="booking-bottom-court">{selectedCourt.name}</span>
                            <span className="booking-bottom-time">
                                {selectedDate?.dayName} {selectedDate?.dayNumber} · {selectedTime} - {getEndTime()} · {selectedDurationInfo?.label}
                            </span>
                        </div>
                        <div className="booking-bottom-price">
                            <span className="booking-total">{formatCurrency(totalPrice)}</span>
                            <span className="booking-deposit">Seña: {formatCurrency(depositAmount)}</span>
                        </div>
                    </div>
                ) : (
                    <div className="booking-bottom-hint">
                        {!selectedCourt ? 'Elegí una cancha' : !selectedDate ? 'Elegí un día' : !selectedTime ? 'Elegí un horario' : 'Resolvé el conflicto horario'}
                    </div>
                )}
                <button
                    className="btn-continue-booking"
                    disabled={!canProceedToSummary}
                    onClick={() => setStep(2)}
                >
                    Continuar
                </button>
            </div>
        </div>
    );

    // ==================== STEP 2: Resumen ====================
    const renderStep2 = () => (
        <div className="booking-step-content">
            <div className="summary-card">
                <h3>📋 Resumen de tu Reserva</h3>

                <div className="summary-rows">
                    <div className="summary-row">
                        <span className="summary-label">Club</span>
                        <span className="summary-value">{clubData.name}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Cancha</span>
                        <span className="summary-value">{selectedCourt?.name} · {selectedCourt?.surface}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Fecha</span>
                        <span className="summary-value">
                            {selectedDate?.date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Horario</span>
                        <span className="summary-value highlight">{selectedTime} - {getEndTime()}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Duración</span>
                        <span className="summary-value">{selectedDurationInfo?.label}</span>
                    </div>

                    <div className="summary-divider" />

                    <div className="summary-row">
                        <span className="summary-label">Precio total</span>
                        <span className="summary-value price">{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Seña a pagar ahora ({clubData.depositPercentage || 30}%)</span>
                        <span className="summary-value deposit">{formatCurrency(depositAmount)}</span>
                    </div>
                    <div className="summary-row">
                        <span className="summary-label">Resto a pagar en el club</span>
                        <span className="summary-value">{formatCurrency(totalPrice - depositAmount)}</span>
                    </div>
                </div>
            </div>

            <div className="summary-note">
                <span className="summary-note-icon">ℹ️</span>
                <p>La seña es obligatoria para confirmar la reserva. El resto se abona en el club el día de juego.</p>
            </div>

            <div className="summary-actions">
                <button className="btn-back-step" onClick={() => setStep(1)}>
                    ← Modificar
                </button>
                <button className="btn-continue-booking" onClick={() => setStep(3)}>
                    Pagar Seña {formatCurrency(depositAmount)}
                </button>
            </div>
        </div>
    );

    // ==================== STEP 3: Pago ====================
    const renderStep3 = () => (
        <div className="booking-step-content">
            <div className="payment-card">
                <h3>💳 Elegí cómo pagar la seña</h3>
                <p className="payment-amount">Monto a pagar: <strong>{formatCurrency(depositAmount)}</strong></p>

                <div className="payment-methods">
                    <button
                        className={`payment-method-btn ${paymentMethod === 'mercadopago' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('mercadopago')}
                    >
                        <div className="payment-method-logo mp">
                            <span style={{ fontSize: '28px' }}>💙</span>
                        </div>
                        <div className="payment-method-info">
                            <strong>MercadoPago</strong>
                            <span>Tarjeta, cuenta MP o efectivo</span>
                        </div>
                        {paymentMethod === 'mercadopago' && <span className="payment-check">✓</span>}
                    </button>

                    <button
                        className={`payment-method-btn ${paymentMethod === 'modo' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('modo')}
                    >
                        <div className="payment-method-logo modo">
                            <span style={{ fontSize: '28px' }}>💜</span>
                        </div>
                        <div className="payment-method-info">
                            <strong>MODO</strong>
                            <span>Pagá con tu banco desde la app</span>
                        </div>
                        {paymentMethod === 'modo' && <span className="payment-check">✓</span>}
                    </button>
                </div>
            </div>

            <div className="payment-security">
                <span>🔒</span>
                <p>Pago 100% seguro. Tu información está protegida.</p>
            </div>

            <div className="summary-actions">
                <button className="btn-back-step" onClick={() => setStep(2)}>
                    ← Volver
                </button>
                <button
                    className="btn-pay-booking"
                    disabled={!paymentMethod || processing}
                    onClick={handleConfirmBooking}
                >
                    {processing ? (
                        <>
                            <span className="booking-spinner" />
                            Procesando pago...
                        </>
                    ) : (
                        <>Confirmar y Pagar {formatCurrency(depositAmount)}</>
                    )}
                </button>
            </div>
        </div>
    );

    // ==================== STEP 4: Confirmado ====================
    const renderStep4 = () => (
        <div className="booking-step-content">
            <div className="confirmation-card">
                <div className="confirmation-icon">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="38" fill="#00A86B" fillOpacity="0.1" />
                        <circle cx="40" cy="40" r="28" fill="#00A86B" fillOpacity="0.2" />
                        <path d="M25 40L35 50L55 30" stroke="#00A86B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <h2>¡Reserva Confirmada!</h2>
                <p className="confirmation-subtitle">Tu cancha está reservada. ¡A jugar! 🎾</p>

                <div className="confirmation-details">
                    <div className="confirmation-row">
                        <span>📍</span>
                        <div>
                            <strong>{clubData.name}</strong>
                            <p>{selectedCourt?.name} · {selectedCourt?.surface}</p>
                        </div>
                    </div>
                    <div className="confirmation-row">
                        <span>📅</span>
                        <div>
                            <strong>{selectedDate?.date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</strong>
                            <p>{selectedTime} - {getEndTime()} ({selectedDurationInfo?.label})</p>
                        </div>
                    </div>
                    <div className="confirmation-row">
                        <span>💳</span>
                        <div>
                            <strong>Seña pagada: {formatCurrency(depositAmount)}</strong>
                            <p>Resta pagar en el club: {formatCurrency(totalPrice - depositAmount)}</p>
                        </div>
                    </div>
                </div>

                <div className="confirmation-code">
                    <span>Código de reserva</span>
                    <strong>TB-{Date.now().toString().slice(-6)}</strong>
                </div>

                <button className="btn-continue-booking" onClick={onBack} style={{ width: '100%' }}>
                    Volver al inicio
                </button>
            </div>
        </div>
    );

    // ==================== PROGRESS BAR ====================
    const steps = ['Selección', 'Resumen', 'Pago', 'Confirmado'];

    return (
        <div className="booking-screen">
            {/* Header */}
            <div className="booking-header">
                <button className="booking-back-btn" onClick={step === 1 ? onBack : () => setStep(Math.max(1, step - 1))}>
                    {step === 1 ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                        </svg>
                    ) : (
                        '←'
                    )}
                </button>
                <h2 className="booking-header-title">
                    {step === 4 ? '✅ Reserva Confirmada' : `Reservar en ${clubData.name}`}
                </h2>
                <div style={{ width: '44px' }} />
            </div>

            {/* Progress */}
            {step < 4 && (
                <div className="booking-progress">
                    {steps.slice(0, 3).map((s, idx) => (
                        <div key={idx} className={`progress-step-booking ${step > idx + 1 ? 'done' : step === idx + 1 ? 'active' : ''}`}>
                            <div className="progress-dot">
                                {step > idx + 1 ? '✓' : idx + 1}
                            </div>
                            <span>{s}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Content */}
            <div className="booking-content">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
            </div>
        </div>
    );
};

export default BookingScreen;