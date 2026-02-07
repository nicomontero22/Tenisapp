import React, { useState } from 'react';

const ScheduleSection = ({ schedule, setSchedule }) => {
    const [editingDay, setEditingDay] = useState(null);

    const days = [
        { key: 'monday', label: 'Lunes', short: 'LUN' },
        { key: 'tuesday', label: 'Martes', short: 'MAR' },
        { key: 'wednesday', label: 'Miércoles', short: 'MIÉ' },
        { key: 'thursday', label: 'Jueves', short: 'JUE' },
        { key: 'friday', label: 'Viernes', short: 'VIE' },
        { key: 'saturday', label: 'Sábado', short: 'SÁB' },
        { key: 'sunday', label: 'Domingo', short: 'DOM' },
    ];

    const timeSlots = [];
    for (let h = 6; h <= 23; h++) {
        timeSlots.push(`${h.toString().padStart(2, '0')}:00`);
        timeSlots.push(`${h.toString().padStart(2, '0')}:30`);
    }

    const toggleDay = (dayKey) => {
        setSchedule(prev => ({
            ...prev,
            [dayKey]: {
                ...prev[dayKey],
                active: !prev[dayKey].active
            }
        }));
    };

    const updateShift = (dayKey, shiftIndex, field, value) => {
        setSchedule(prev => ({
            ...prev,
            [dayKey]: {
                ...prev[dayKey],
                shifts: prev[dayKey].shifts.map((shift, idx) =>
                    idx === shiftIndex ? { ...shift, [field]: value } : shift
                )
            }
        }));
    };

    const addShift = (dayKey) => {
        setSchedule(prev => ({
            ...prev,
            [dayKey]: {
                ...prev[dayKey],
                shifts: [...prev[dayKey].shifts, { start: '14:00', end: '23:00' }]
            }
        }));
    };

    const removeShift = (dayKey, shiftIndex) => {
        setSchedule(prev => ({
            ...prev,
            [dayKey]: {
                ...prev[dayKey],
                shifts: prev[dayKey].shifts.filter((_, idx) => idx !== shiftIndex)
            }
        }));
    };

    const updateSlotInterval = (interval) => {
        setSchedule(prev => ({ ...prev, slotInterval: interval }));
    };

    const copyToAll = (sourceDayKey) => {
        const sourceDay = schedule[sourceDayKey];
        if (window.confirm('¿Copiar este horario a todos los días activos?')) {
            setSchedule(prev => {
                const updated = { ...prev };
                days.forEach(d => {
                    if (d.key !== sourceDayKey) {
                        updated[d.key] = {
                            ...updated[d.key],
                            shifts: [...sourceDay.shifts.map(s => ({ ...s }))]
                        };
                    }
                });
                return updated;
            });
        }
    };

    const getHoursForDay = (dayKey) => {
        const dayData = schedule[dayKey];
        if (!dayData?.active || !dayData?.shifts?.length) return '—';
        return dayData.shifts.map(s => `${s.start} - ${s.end}`).join(' / ');
    };

    return (
        <div style={{ padding: '0' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 4px' }}>
                    Horarios de Apertura
                </h2>
                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                    Configurá los días y horarios en que tu club está disponible
                </p>
            </div>

            {/* Slot Interval */}
            <div style={{
                background: 'white', borderRadius: '16px', padding: '20px',
                border: '1px solid #eee', marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', color: '#333' }}>
                    ⏱️ Intervalo de turnos
                </h3>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>
                    Define cada cuánto se genera un turno disponible
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {[30, 60].map(interval => (
                        <button
                            key={interval}
                            onClick={() => updateSlotInterval(interval)}
                            style={{
                                padding: '10px 20px', border: '2px solid',
                                borderColor: schedule.slotInterval === interval ? '#00A86B' : '#e0e0e0',
                                background: schedule.slotInterval === interval ? '#E6F9F1' : 'white',
                                borderRadius: '10px', cursor: 'pointer', fontSize: '14px',
                                fontWeight: '600', transition: 'all 0.2s',
                                color: schedule.slotInterval === interval ? '#00A86B' : '#666',
                            }}
                        >
                            {interval} minutos
                        </button>
                    ))}
                </div>
            </div>

            {/* Weekly Schedule */}
            <div style={{
                background: 'white', borderRadius: '16px', padding: '20px',
                border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: '#333' }}>
                    📅 Horarios semanales
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {days.map(day => {
                        const dayData = schedule[day.key];
                        const isEditing = editingDay === day.key;

                        return (
                            <div key={day.key} style={{
                                border: '1px solid #eee', borderRadius: '12px',
                                overflow: 'hidden', transition: 'all 0.2s',
                                background: dayData?.active ? 'white' : '#fafafa',
                            }}>
                                {/* Day Row */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', padding: '14px 16px',
                                    gap: '12px', cursor: 'pointer',
                                }}
                                    onClick={() => setEditingDay(isEditing ? null : day.key)}
                                >
                                    {/* Toggle */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleDay(day.key); }}
                                        style={{
                                            width: '44px', height: '24px', borderRadius: '12px',
                                            border: 'none', cursor: 'pointer', position: 'relative',
                                            background: dayData?.active ? '#00A86B' : '#ddd',
                                            transition: 'background 0.2s', flexShrink: 0,
                                        }}
                                    >
                                        <div style={{
                                            width: '20px', height: '20px', borderRadius: '50%',
                                            background: 'white', position: 'absolute', top: '2px',
                                            left: dayData?.active ? '22px' : '2px',
                                            transition: 'left 0.2s',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                        }} />
                                    </button>

                                    {/* Day Name */}
                                    <span style={{
                                        fontSize: '14px', fontWeight: '700', width: '90px',
                                        color: dayData?.active ? '#1a1a1a' : '#aaa',
                                    }}>
                                        {day.label}
                                    </span>

                                    {/* Hours Summary */}
                                    <span style={{
                                        fontSize: '13px', color: dayData?.active ? '#00A86B' : '#ccc',
                                        fontWeight: '500', flex: 1,
                                    }}>
                                        {dayData?.active ? getHoursForDay(day.key) : 'Cerrado'}
                                    </span>

                                    {/* Expand Arrow */}
                                    {dayData?.active && (
                                        <span style={{
                                            fontSize: '12px', color: '#999',
                                            transform: isEditing ? 'rotate(180deg)' : 'rotate(0)',
                                            transition: 'transform 0.2s',
                                        }}>
                                            ▼
                                        </span>
                                    )}
                                </div>

                                {/* Expanded Edit */}
                                {isEditing && dayData?.active && (
                                    <div style={{
                                        padding: '0 16px 16px', borderTop: '1px solid #f0f0f0',
                                        paddingTop: '16px',
                                    }}>
                                        {dayData.shifts.map((shift, idx) => (
                                            <div key={idx} style={{
                                                display: 'flex', alignItems: 'center', gap: '8px',
                                                marginBottom: '8px',
                                            }}>
                                                <span style={{ fontSize: '12px', color: '#888', width: '50px' }}>
                                                    Turno {idx + 1}
                                                </span>
                                                <select
                                                    value={shift.start}
                                                    onChange={e => updateShift(day.key, idx, 'start', e.target.value)}
                                                    style={{
                                                        padding: '8px 10px', border: '2px solid #e0e0e0',
                                                        borderRadius: '8px', fontSize: '13px', outline: 'none',
                                                        cursor: 'pointer', background: 'white',
                                                    }}
                                                >
                                                    {timeSlots.map(t => (
                                                        <option key={t} value={t}>{t}</option>
                                                    ))}
                                                </select>

                                                <span style={{ color: '#ccc' }}>—</span>

                                                <select
                                                    value={shift.end}
                                                    onChange={e => updateShift(day.key, idx, 'end', e.target.value)}
                                                    style={{
                                                        padding: '8px 10px', border: '2px solid #e0e0e0',
                                                        borderRadius: '8px', fontSize: '13px', outline: 'none',
                                                        cursor: 'pointer', background: 'white',
                                                    }}
                                                >
                                                    {timeSlots.map(t => (
                                                        <option key={t} value={t}>{t}</option>
                                                    ))}
                                                </select>

                                                {dayData.shifts.length > 1 && (
                                                    <button
                                                        onClick={() => removeShift(day.key, idx)}
                                                        style={{
                                                            padding: '6px 10px', background: '#FEE2E2',
                                                            border: 'none', borderRadius: '6px',
                                                            cursor: 'pointer', color: '#EF4444',
                                                            fontSize: '12px', fontWeight: '700',
                                                        }}
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                            <button
                                                onClick={() => addShift(day.key)}
                                                style={{
                                                    padding: '6px 14px', background: '#f0f0f0',
                                                    border: 'none', borderRadius: '8px', fontSize: '12px',
                                                    fontWeight: '600', cursor: 'pointer', color: '#555',
                                                }}
                                            >
                                                + Agregar turno
                                            </button>
                                            <button
                                                onClick={() => copyToAll(day.key)}
                                                style={{
                                                    padding: '6px 14px', background: '#E6F9F1',
                                                    border: 'none', borderRadius: '8px', fontSize: '12px',
                                                    fontWeight: '600', cursor: 'pointer', color: '#00A86B',
                                                }}
                                            >
                                                📋 Copiar a todos los días
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ScheduleSection;
