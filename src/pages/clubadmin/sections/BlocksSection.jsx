import React, { useState } from 'react';

const BlocksSection = ({ courts, blocks, setBlocks }) => {
    const [showForm, setShowForm] = useState(false);
    const [rainMode, setRainMode] = useState(false);
    const [formData, setFormData] = useState({
        courtId: 'all',
        type: 'maintenance', // 'maintenance', 'class', 'event', 'weather', 'other'
        title: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '08:00',
        endTime: '10:00',
        recurring: false,
        recurringDays: [],
        notes: '',
    });

    const blockTypes = [
        { value: 'maintenance', label: 'Mantenimiento', icon: '🔧', color: '#F59E0B', bg: '#FEF3C7' },
        { value: 'class', label: 'Clase Fija', icon: '👨‍🏫', color: '#3B82F6', bg: '#DBEAFE' },
        { value: 'event', label: 'Evento/Torneo', icon: '🏆', color: '#8B5CF6', bg: '#EDE9FE' },
        { value: 'weather', label: 'Clima', icon: '🌧️', color: '#6B7280', bg: '#F3F4F6' },
        { value: 'other', label: 'Otro', icon: '📌', color: '#EF4444', bg: '#FEE2E2' },
    ];

    const dayOptions = [
        { key: 'monday', label: 'Lun' },
        { key: 'tuesday', label: 'Mar' },
        { key: 'wednesday', label: 'Mié' },
        { key: 'thursday', label: 'Jue' },
        { key: 'friday', label: 'Vie' },
        { key: 'saturday', label: 'Sáb' },
        { key: 'sunday', label: 'Dom' },
    ];

    const handleRainToggle = () => {
        const newRainMode = !rainMode;
        setRainMode(newRainMode);

        if (newRainMode) {
            // Crear bloqueo de lluvia para todas las canchas no techadas
            const uncoveredCourts = courts.filter(c => !c.covered);
            const today = new Date().toISOString().split('T')[0];

            if (uncoveredCourts.length === 0) {
                alert('Todas tus canchas son techadas. No se necesita bloqueo por lluvia.');
                setRainMode(false);
                return;
            }

            const rainBlocks = uncoveredCourts.map(court => ({
                id: Date.now() + court.id,
                courtId: court.id,
                courtName: court.name,
                type: 'weather',
                title: '🌧️ Lluvia - Cancha suspendida',
                date: today,
                startTime: '00:00',
                endTime: '23:59',
                recurring: false,
                recurringDays: [],
                notes: 'Bloqueo automático por lluvia',
                isRainBlock: true,
                createdAt: new Date().toISOString(),
            }));

            setBlocks(prev => [...prev, ...rainBlocks]);

            alert(`Se bloquearon ${uncoveredCourts.length} canchas descubiertas por lluvia. Las canchas techadas siguen disponibles.`);
        } else {
            // Remover bloqueos de lluvia
            setBlocks(prev => prev.filter(b => !b.isRainBlock));
        }
    };

    const handleSave = () => {
        if (!formData.title.trim()) {
            alert('Ingresá un título para el bloqueo');
            return;
        }

        const targetCourts = formData.courtId === 'all'
            ? courts
            : courts.filter(c => c.id === parseInt(formData.courtId));

        const newBlocks = targetCourts.map(court => ({
            id: Date.now() + court.id,
            courtId: court.id,
            courtName: court.name,
            type: formData.type,
            title: formData.title,
            date: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
            recurring: formData.recurring,
            recurringDays: formData.recurringDays,
            notes: formData.notes,
            isRainBlock: false,
            createdAt: new Date().toISOString(),
        }));

        setBlocks(prev => [...prev, ...newBlocks]);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            courtId: 'all', type: 'maintenance', title: '',
            date: new Date().toISOString().split('T')[0],
            startTime: '08:00', endTime: '10:00',
            recurring: false, recurringDays: [], notes: '',
        });
        setShowForm(false);
    };

    const removeBlock = (blockId) => {
        setBlocks(prev => prev.filter(b => b.id !== blockId));
    };

    const getBlockTypeInfo = (type) => blockTypes.find(bt => bt.value === type) || blockTypes[4];

    return (
        <div style={{ padding: '0' }}>
            {/* Header */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '24px', flexWrap: 'wrap', gap: '12px',
            }}>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 4px' }}>
                        Bloqueos
                    </h2>
                    <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                        Bloqueos, clases fijas, mantenimiento y clima
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    style={{
                        padding: '10px 20px', background: '#00A86B', color: 'white',
                        border: 'none', borderRadius: '10px', fontSize: '14px',
                        fontWeight: '600', cursor: 'pointer',
                    }}
                >
                    ➕ Nuevo Bloqueo
                </button>
            </div>

            {/* Rain Button - PROMINENT */}
            <div style={{
                background: rainMode
                    ? 'linear-gradient(135deg, #4B5563, #374151)'
                    : 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                borderRadius: '16px', padding: '24px', marginBottom: '20px',
                color: 'white', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.3s',
            }}>
                <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 4px' }}>
                        {rainMode ? '🌧️ Modo Lluvia ACTIVADO' : '☀️ Botón de Lluvia'}
                    </h3>
                    <p style={{ fontSize: '13px', opacity: 0.9, margin: 0 }}>
                        {rainMode
                            ? 'Las canchas descubiertas están bloqueadas. Tocá para reactivar.'
                            : 'Bloquea automáticamente todas las canchas descubiertas'
                        }
                    </p>
                </div>
                <button
                    onClick={handleRainToggle}
                    style={{
                        padding: '14px 28px',
                        background: rainMode ? '#EF4444' : 'rgba(255,255,255,0.2)',
                        color: 'white', border: '2px solid rgba(255,255,255,0.3)',
                        borderRadius: '12px', fontSize: '16px', fontWeight: '700',
                        cursor: 'pointer', transition: 'all 0.2s',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    {rainMode ? '☀️ Desactivar Lluvia' : '🌧️ Activar Modo Lluvia'}
                </button>
            </div>

            {/* Active Blocks */}
            <div style={{
                background: 'white', borderRadius: '16px', padding: '20px',
                border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: '#333' }}>
                    📋 Bloqueos Activos ({blocks.length})
                </h3>

                {blocks.length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '40px 20px', background: '#f9f9f9',
                        borderRadius: '12px', border: '1px dashed #ddd',
                    }}>
                        <div style={{ fontSize: '36px', marginBottom: '12px' }}>✅</div>
                        <p style={{ color: '#888', fontSize: '14px' }}>
                            No hay bloqueos activos. Todas las canchas están disponibles.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {blocks.map(block => {
                            const typeInfo = getBlockTypeInfo(block.type);
                            return (
                                <div key={block.id} style={{
                                    display: 'flex', alignItems: 'center', padding: '12px 16px',
                                    background: '#fafafa', borderRadius: '10px', gap: '12px',
                                    border: `1px solid ${typeInfo.bg}`,
                                }}>
                                    <span style={{
                                        fontSize: '24px', width: '40px', height: '40px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: typeInfo.bg, borderRadius: '10px', flexShrink: 0,
                                    }}>
                                        {typeInfo.icon}
                                    </span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <strong style={{ fontSize: '14px', display: 'block' }}>
                                            {block.title}
                                        </strong>
                                        <p style={{ fontSize: '12px', color: '#888', margin: '2px 0 0' }}>
                                            {block.courtName} · {block.date} · {block.startTime}-{block.endTime}
                                            {block.recurring && ' · 🔄 Recurrente'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeBlock(block.id)}
                                        style={{
                                            padding: '6px 10px', background: '#FEE2E2', border: 'none',
                                            borderRadius: '6px', cursor: 'pointer', color: '#EF4444',
                                            fontSize: '12px', fontWeight: '700', flexShrink: 0,
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Block Form Modal */}
            {showForm && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                    padding: '20px',
                }}>
                    <div style={{
                        background: 'white', borderRadius: '16px', padding: '32px',
                        width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto',
                    }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
                            Nuevo Bloqueo
                        </h3>

                        {/* Block Type */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                Tipo de bloqueo
                            </label>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {blockTypes.map(bt => (
                                    <button key={bt.value}
                                        onClick={() => setFormData({ ...formData, type: bt.value })}
                                        style={{
                                            padding: '8px 12px', border: '2px solid',
                                            borderColor: formData.type === bt.value ? bt.color : '#e0e0e0',
                                            background: formData.type === bt.value ? bt.bg : 'white',
                                            borderRadius: '8px', cursor: 'pointer', fontSize: '12px',
                                            fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px',
                                        }}
                                    >
                                        {bt.icon} {bt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Court Selection */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                Cancha
                            </label>
                            <select
                                value={formData.courtId}
                                onChange={e => setFormData({ ...formData, courtId: e.target.value })}
                                style={{
                                    width: '100%', padding: '10px', border: '2px solid #e0e0e0',
                                    borderRadius: '10px', fontSize: '14px', background: 'white', cursor: 'pointer',
                                }}
                            >
                                <option value="all">🎾 Todas las canchas</option>
                                {courts.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Title */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                Título
                            </label>
                            <input type="text" value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ej: Clase de Juan Martín"
                                style={{
                                    width: '100%', padding: '10px 14px', border: '2px solid #e0e0e0',
                                    borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                                }}
                            />
                        </div>

                        {/* Date & Time */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#888', marginBottom: '4px' }}>Fecha</label>
                                <input type="date" value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    style={{
                                        width: '100%', padding: '8px', border: '2px solid #e0e0e0',
                                        borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box',
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#888', marginBottom: '4px' }}>Desde</label>
                                <input type="time" value={formData.startTime}
                                    onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                                    style={{
                                        width: '100%', padding: '8px', border: '2px solid #e0e0e0',
                                        borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box',
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#888', marginBottom: '4px' }}>Hasta</label>
                                <input type="time" value={formData.endTime}
                                    onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                                    style={{
                                        width: '100%', padding: '8px', border: '2px solid #e0e0e0',
                                        borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Recurring */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                cursor: 'pointer', fontSize: '14px', fontWeight: '600',
                            }}>
                                <input type="checkbox" checked={formData.recurring}
                                    onChange={e => setFormData({ ...formData, recurring: e.target.checked })}
                                    style={{ width: '18px', height: '18px', accentColor: '#00A86B' }}
                                />
                                🔄 Bloqueo recurrente (semanal)
                            </label>

                            {formData.recurring && (
                                <div style={{ display: 'flex', gap: '4px', marginTop: '10px', flexWrap: 'wrap' }}>
                                    {dayOptions.map(d => (
                                        <button key={d.key}
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    recurringDays: prev.recurringDays.includes(d.key)
                                                        ? prev.recurringDays.filter(x => x !== d.key)
                                                        : [...prev.recurringDays, d.key]
                                                }));
                                            }}
                                            style={{
                                                padding: '6px 10px', border: '2px solid',
                                                borderColor: formData.recurringDays.includes(d.key) ? '#00A86B' : '#e0e0e0',
                                                background: formData.recurringDays.includes(d.key) ? '#E6F9F1' : 'white',
                                                borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600',
                                            }}
                                        >
                                            {d.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Notes */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                Notas (opcional)
                            </label>
                            <textarea value={formData.notes}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Detalles adicionales..."
                                rows={2}
                                style={{
                                    width: '100%', padding: '10px 14px', border: '2px solid #e0e0e0',
                                    borderRadius: '10px', fontSize: '14px', outline: 'none', resize: 'vertical',
                                    boxSizing: 'border-box', fontFamily: 'inherit',
                                }}
                            />
                        </div>

                        {/* Buttons */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={resetForm}
                                style={{
                                    flex: 1, padding: '12px', background: '#f5f5f5', color: '#666',
                                    border: 'none', borderRadius: '10px', fontSize: '14px',
                                    fontWeight: '600', cursor: 'pointer',
                                }}>Cancelar</button>
                            <button onClick={handleSave}
                                style={{
                                    flex: 1, padding: '12px', background: '#00A86B', color: 'white',
                                    border: 'none', borderRadius: '10px', fontSize: '14px',
                                    fontWeight: '600', cursor: 'pointer',
                                }}>Crear Bloqueo</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlocksSection;
