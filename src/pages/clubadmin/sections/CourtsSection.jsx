import React, { useState } from 'react';

const CourtsSection = ({ courts, setCourts }) => {
    const [showForm, setShowForm] = useState(false);
    const [editingCourt, setEditingCourt] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        sport: 'tennis',
        surface: 'clay',
        covered: false,
        hasLights: true,
        status: 'active',
    });

    const surfaces = [
        { value: 'clay', label: 'Polvo de ladrillo', color: '#D2691E' },
        { value: 'hard', label: 'Cemento', color: '#808080' },
        { value: 'grass', label: 'Césped', color: '#228B22' },
        { value: 'synthetic', label: 'Sintético', color: '#4169E1' },
    ];

    const sports = [
        { value: 'tennis', label: 'Tenis', icon: '🎾' },
        { value: 'padel', label: 'Pádel', icon: '🏓' },
        { value: 'futbol', label: 'Fútbol', icon: '⚽' },
    ];

    const resetForm = () => {
        setFormData({
            name: '',
            sport: 'tennis',
            surface: 'clay',
            covered: false,
            hasLights: true,
            status: 'active',
        });
        setEditingCourt(null);
        setShowForm(false);
    };

    const handleEdit = (court) => {
        setFormData({
            name: court.name,
            sport: court.sport,
            surface: court.surface,
            covered: court.covered,
            hasLights: court.hasLights,
            status: court.status,
        });
        setEditingCourt(court.id);
        setShowForm(true);
    };

    const handleSave = () => {
        if (!formData.name.trim()) {
            alert('Ingresá un nombre para la cancha');
            return;
        }

        const surfaceInfo = surfaces.find(s => s.value === formData.surface);

        if (editingCourt) {
            setCourts(prev => prev.map(c =>
                c.id === editingCourt
                    ? { ...c, ...formData, surfaceName: surfaceInfo.label }
                    : c
            ));
        } else {
            const newCourt = {
                id: Date.now(),
                ...formData,
                surfaceName: surfaceInfo.label,
                image: null,
            };
            setCourts(prev => [...prev, newCourt]);
        }
        resetForm();
    };

    const handleDelete = (courtId) => {
        if (window.confirm('¿Seguro que querés eliminar esta cancha?')) {
            setCourts(prev => prev.filter(c => c.id !== courtId));
        }
    };

    const toggleStatus = (courtId) => {
        setCourts(prev => prev.map(c => {
            if (c.id !== courtId) return c;
            const nextStatus = c.status === 'active' ? 'maintenance' : c.status === 'maintenance' ? 'inactive' : 'active';
            return { ...c, status: nextStatus };
        }));
    };

    const getStatusBadge = (status) => {
        const map = {
            active: { label: 'Activa', color: '#00A86B', bg: '#E6F9F1' },
            maintenance: { label: 'Mantenimiento', color: '#F59E0B', bg: '#FEF3C7' },
            inactive: { label: 'Inactiva', color: '#EF4444', bg: '#FEE2E2' },
        };
        return map[status] || map.active;
    };

    return (
        <div style={{ padding: '0' }}>
            {/* Header */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '24px', flexWrap: 'wrap', gap: '12px'
            }}>
                <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
                        Mis Canchas
                    </h2>
                    <p style={{ color: '#666', margin: '4px 0 0', fontSize: '14px' }}>
                        {courts.length} cancha{courts.length !== 1 ? 's' : ''} registrada{courts.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 20px', background: '#00A86B', color: 'white',
                        border: 'none', borderRadius: '10px', fontSize: '14px',
                        fontWeight: '600', cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    ➕ Agregar Cancha
                </button>
            </div>

            {/* Form Modal */}
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
                        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>
                            {editingCourt ? 'Editar Cancha' : 'Nueva Cancha'}
                        </h3>

                        {/* Nombre */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                Nombre de la cancha
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ej: Cancha 1"
                                style={{
                                    width: '100%', padding: '10px 14px', border: '2px solid #e0e0e0',
                                    borderRadius: '10px', fontSize: '14px', outline: 'none',
                                    transition: 'border-color 0.2s', boxSizing: 'border-box',
                                }}
                                onFocus={e => e.target.style.borderColor = '#00A86B'}
                                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                            />
                        </div>

                        {/* Deporte */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                Deporte
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {sports.map(s => (
                                    <button
                                        key={s.value}
                                        onClick={() => setFormData({ ...formData, sport: s.value })}
                                        style={{
                                            flex: 1, padding: '10px', border: '2px solid',
                                            borderColor: formData.sport === s.value ? '#00A86B' : '#e0e0e0',
                                            background: formData.sport === s.value ? '#E6F9F1' : 'white',
                                            borderRadius: '10px', cursor: 'pointer', textAlign: 'center',
                                            fontSize: '13px', fontWeight: '600', transition: 'all 0.2s',
                                        }}
                                    >
                                        <div style={{ fontSize: '24px', marginBottom: '4px' }}>{s.icon}</div>
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Superficie */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                Superficie
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                {surfaces.map(s => (
                                    <button
                                        key={s.value}
                                        onClick={() => setFormData({ ...formData, surface: s.value })}
                                        style={{
                                            padding: '10px', border: '2px solid',
                                            borderColor: formData.surface === s.value ? '#00A86B' : '#e0e0e0',
                                            background: formData.surface === s.value ? '#E6F9F1' : 'white',
                                            borderRadius: '10px', cursor: 'pointer', textAlign: 'left',
                                            display: 'flex', alignItems: 'center', gap: '8px',
                                            fontSize: '13px', fontWeight: '600', transition: 'all 0.2s',
                                        }}
                                    >
                                        <div style={{
                                            width: '16px', height: '16px', borderRadius: '50%',
                                            background: s.color, flexShrink: 0
                                        }} />
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Toggles */}
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                            <label style={{
                                flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '12px', border: '2px solid #e0e0e0', borderRadius: '10px',
                                cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                            }}>
                                <input
                                    type="checkbox"
                                    checked={formData.covered}
                                    onChange={e => setFormData({ ...formData, covered: e.target.checked })}
                                    style={{ width: '18px', height: '18px', accentColor: '#00A86B' }}
                                />
                                🏠 Techada
                            </label>
                            <label style={{
                                flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '12px', border: '2px solid #e0e0e0', borderRadius: '10px',
                                cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                            }}>
                                <input
                                    type="checkbox"
                                    checked={formData.hasLights}
                                    onChange={e => setFormData({ ...formData, hasLights: e.target.checked })}
                                    style={{ width: '18px', height: '18px', accentColor: '#00A86B' }}
                                />
                                💡 Iluminación
                            </label>
                        </div>

                        {/* Buttons */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={resetForm}
                                style={{
                                    flex: 1, padding: '12px', background: '#f5f5f5', color: '#666',
                                    border: 'none', borderRadius: '10px', fontSize: '14px',
                                    fontWeight: '600', cursor: 'pointer',
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                style={{
                                    flex: 1, padding: '12px', background: '#00A86B', color: 'white',
                                    border: 'none', borderRadius: '10px', fontSize: '14px',
                                    fontWeight: '600', cursor: 'pointer',
                                }}
                            >
                                {editingCourt ? 'Guardar Cambios' : 'Agregar Cancha'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Courts Grid */}
            {courts.length === 0 ? (
                <div style={{
                    textAlign: 'center', padding: '60px 20px', background: '#f9f9f9',
                    borderRadius: '16px', border: '2px dashed #ddd',
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎾</div>
                    <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '8px' }}>
                        No tenés canchas registradas
                    </h3>
                    <p style={{ color: '#888', marginBottom: '20px' }}>
                        Agregá tu primera cancha para empezar a recibir reservas
                    </p>
                    <button
                        onClick={() => setShowForm(true)}
                        style={{
                            padding: '10px 24px', background: '#00A86B', color: 'white',
                            border: 'none', borderRadius: '10px', fontSize: '14px',
                            fontWeight: '600', cursor: 'pointer',
                        }}
                    >
                        ➕ Agregar Primera Cancha
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {courts.map(court => {
                        const status = getStatusBadge(court.status);
                        const surfaceInfo = surfaces.find(s => s.value === court.surface);
                        const sportInfo = sports.find(s => s.value === court.sport);

                        return (
                            <div key={court.id} style={{
                                background: 'white', borderRadius: '16px', padding: '20px',
                                border: '1px solid #eee', transition: 'all 0.2s',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            }}>
                                {/* Court Header */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 4px' }}>
                                            {sportInfo?.icon} {court.name}
                                        </h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <div style={{
                                                width: '10px', height: '10px', borderRadius: '50%',
                                                background: surfaceInfo?.color || '#999'
                                            }} />
                                            <span style={{ fontSize: '13px', color: '#666' }}>
                                                {court.surfaceName || surfaceInfo?.label}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleStatus(court.id)}
                                        style={{
                                            padding: '4px 10px', borderRadius: '20px', border: 'none',
                                            fontSize: '11px', fontWeight: '700', cursor: 'pointer',
                                            background: status.bg, color: status.color,
                                        }}
                                    >
                                        {status.label}
                                    </button>
                                </div>

                                {/* Features */}
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                                    {court.covered && (
                                        <span style={{
                                            padding: '4px 8px', background: '#f0f0f0', borderRadius: '6px',
                                            fontSize: '12px', color: '#555',
                                        }}>
                                            🏠 Techada
                                        </span>
                                    )}
                                    {court.hasLights && (
                                        <span style={{
                                            padding: '4px 8px', background: '#f0f0f0', borderRadius: '6px',
                                            fontSize: '12px', color: '#555',
                                        }}>
                                            💡 Iluminación
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => handleEdit(court)}
                                        style={{
                                            flex: 1, padding: '8px', background: '#f5f5f5',
                                            border: 'none', borderRadius: '8px', fontSize: '13px',
                                            fontWeight: '600', cursor: 'pointer', color: '#333',
                                        }}
                                    >
                                        ✏️ Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(court.id)}
                                        style={{
                                            padding: '8px 12px', background: '#FEE2E2',
                                            border: 'none', borderRadius: '8px', fontSize: '13px',
                                            fontWeight: '600', cursor: 'pointer', color: '#EF4444',
                                        }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CourtsSection;
