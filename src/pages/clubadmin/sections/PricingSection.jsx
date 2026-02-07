import React, { useState } from 'react';

const PricingSection = ({ courts, pricing, setPricing }) => {
    const [showRuleForm, setShowRuleForm] = useState(false);
    const [ruleForm, setRuleForm] = useState({
        name: '',
        type: 'time', // 'time' or 'day'
        startTime: '18:00',
        endTime: '23:00',
        days: [],
        adjustment: 20, // porcentaje
        adjustmentType: 'increase', // 'increase' or 'decrease'
    });

    const durations = [
        { key: '1h', label: '1 hora' },
        { key: '1.5h', label: '1:30 hs' },
        { key: '2h', label: '2 horas' },
        { key: '2.5h', label: '2:30 hs' },
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

    const formatCurrency = (amount) => {
        if (!amount) return '';
        return new Intl.NumberFormat('es-AR', {
            style: 'currency', currency: 'ARS', minimumFractionDigits: 0
        }).format(amount);
    };

    const updateBasePrice = (courtId, durationKey, value) => {
        const numValue = parseInt(value.replace(/\D/g, '')) || 0;
        setPricing(prev => ({
            ...prev,
            basePrices: {
                ...prev.basePrices,
                [courtId]: {
                    ...(prev.basePrices[courtId] || {}),
                    [durationKey]: numValue
                }
            }
        }));
    };

    const updateDeposit = (value) => {
        setPricing(prev => ({ ...prev, depositPercentage: parseInt(value) || 0 }));
    };

    const updateCashDiscount = (value) => {
        setPricing(prev => ({ ...prev, cashDiscountPercentage: parseInt(value) || 0 }));
    };

    const addTimeRule = () => {
        if (!ruleForm.name.trim()) {
            alert('Ingresá un nombre para la regla');
            return;
        }
        setPricing(prev => ({
            ...prev,
            timeRules: [...(prev.timeRules || []), { id: Date.now(), ...ruleForm }]
        }));
        setRuleForm({
            name: '', type: 'time', startTime: '18:00', endTime: '23:00',
            days: [], adjustment: 20, adjustmentType: 'increase',
        });
        setShowRuleForm(false);
    };

    const removeTimeRule = (ruleId) => {
        setPricing(prev => ({
            ...prev,
            timeRules: prev.timeRules.filter(r => r.id !== ruleId)
        }));
    };

    const autoFillPrices = (courtId) => {
        const basePrice = pricing.basePrices?.[courtId]?.['1h'];
        if (!basePrice) {
            alert('Primero ingresá el precio de 1 hora');
            return;
        }
        setPricing(prev => ({
            ...prev,
            basePrices: {
                ...prev.basePrices,
                [courtId]: {
                    '1h': basePrice,
                    '1.5h': Math.round(basePrice * 1.4),
                    '2h': Math.round(basePrice * 1.8),
                    '2.5h': Math.round(basePrice * 2.2),
                }
            }
        }));
    };

    return (
        <div style={{ padding: '0' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 4px' }}>
                    Precios
                </h2>
                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                    Configurá precios base, señas y reglas de precios dinámicos
                </p>
            </div>

            {/* General Settings */}
            <div style={{
                background: 'white', borderRadius: '16px', padding: '20px',
                border: '1px solid #eee', marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: '#333' }}>
                    ⚙️ Configuración General
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {/* Deposit */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                            💳 Seña para reservar (%)
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="range"
                                min="10" max="100" step="5"
                                value={pricing.depositPercentage || 30}
                                onChange={e => updateDeposit(e.target.value)}
                                style={{ flex: 1, accentColor: '#00A86B' }}
                            />
                            <span style={{
                                background: '#E6F9F1', color: '#00A86B', padding: '4px 10px',
                                borderRadius: '8px', fontSize: '14px', fontWeight: '700',
                                minWidth: '50px', textAlign: 'center',
                            }}>
                                {pricing.depositPercentage || 30}%
                            </span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                            Monto mínimo que el jugador paga al reservar
                        </p>
                    </div>

                    {/* Cash Discount */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                            🏷️ Descuento pago efectivo (%)
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                                type="range"
                                min="0" max="30" step="1"
                                value={pricing.cashDiscountPercentage || 0}
                                onChange={e => updateCashDiscount(e.target.value)}
                                style={{ flex: 1, accentColor: '#F59E0B' }}
                            />
                            <span style={{
                                background: '#FEF3C7', color: '#D97706', padding: '4px 10px',
                                borderRadius: '8px', fontSize: '14px', fontWeight: '700',
                                minWidth: '50px', textAlign: 'center',
                            }}>
                                {pricing.cashDiscountPercentage || 0}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prices per Court */}
            <div style={{
                background: 'white', borderRadius: '16px', padding: '20px',
                border: '1px solid #eee', marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', color: '#333' }}>
                    🎾 Precios por Cancha
                </h3>

                {courts.length === 0 ? (
                    <p style={{ color: '#999', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
                        Primero agregá canchas en la sección "Mis Canchas"
                    </p>
                ) : (
                    courts.map(court => (
                        <div key={court.id} style={{
                            border: '1px solid #eee', borderRadius: '12px',
                            padding: '16px', marginBottom: '12px',
                        }}>
                            <div style={{
                                display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', marginBottom: '12px',
                            }}>
                                <h4 style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>
                                    {court.name} — {court.surfaceName}
                                </h4>
                                <button
                                    onClick={() => autoFillPrices(court.id)}
                                    style={{
                                        padding: '4px 12px', background: '#E6F9F1',
                                        border: 'none', borderRadius: '6px', fontSize: '11px',
                                        fontWeight: '600', cursor: 'pointer', color: '#00A86B',
                                    }}
                                >
                                    ✨ Auto-calcular
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                                {durations.map(dur => (
                                    <div key={dur.key}>
                                        <label style={{
                                            display: 'block', fontSize: '11px', fontWeight: '600',
                                            color: '#888', marginBottom: '4px', textAlign: 'center',
                                        }}>
                                            {dur.label}
                                        </label>
                                        <input
                                            type="text"
                                            value={pricing.basePrices?.[court.id]?.[dur.key] ? formatCurrency(pricing.basePrices[court.id][dur.key]) : ''}
                                            onChange={e => updateBasePrice(court.id, dur.key, e.target.value)}
                                            placeholder="$0"
                                            style={{
                                                width: '100%', padding: '8px', border: '2px solid #e0e0e0',
                                                borderRadius: '8px', fontSize: '14px', textAlign: 'center',
                                                outline: 'none', fontWeight: '600', boxSizing: 'border-box',
                                            }}
                                            onFocus={e => e.target.style.borderColor = '#00A86B'}
                                            onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Dynamic Pricing Rules */}
            <div style={{
                background: 'white', borderRadius: '16px', padding: '20px',
                border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '16px',
                }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#333', margin: 0 }}>
                        📈 Reglas de Precio Dinámico
                    </h3>
                    <button
                        onClick={() => setShowRuleForm(true)}
                        style={{
                            padding: '6px 14px', background: '#00A86B', color: 'white',
                            border: 'none', borderRadius: '8px', fontSize: '12px',
                            fontWeight: '600', cursor: 'pointer',
                        }}
                    >
                        + Nueva Regla
                    </button>
                </div>

                <p style={{ fontSize: '12px', color: '#999', marginBottom: '16px' }}>
                    Ejemplo: "Horario nocturno +20%" o "Fin de semana +30%"
                </p>

                {/* Existing Rules */}
                {(pricing.timeRules || []).length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '30px', background: '#f9f9f9',
                        borderRadius: '12px', border: '1px dashed #ddd',
                    }}>
                        <p style={{ color: '#999', fontSize: '13px' }}>
                            No hay reglas configuradas. Los precios base se aplican siempre.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {pricing.timeRules.map(rule => (
                            <div key={rule.id} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '12px 16px', background: '#f9f9f9', borderRadius: '10px',
                            }}>
                                <div>
                                    <strong style={{ fontSize: '14px' }}>{rule.name}</strong>
                                    <p style={{ fontSize: '12px', color: '#888', margin: '2px 0 0' }}>
                                        {rule.type === 'time'
                                            ? `${rule.startTime} - ${rule.endTime}`
                                            : rule.days.join(', ')
                                        }
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: '6px', fontSize: '13px', fontWeight: '700',
                                        background: rule.adjustmentType === 'increase' ? '#FEE2E2' : '#E6F9F1',
                                        color: rule.adjustmentType === 'increase' ? '#EF4444' : '#00A86B',
                                    }}>
                                        {rule.adjustmentType === 'increase' ? '+' : '-'}{rule.adjustment}%
                                    </span>
                                    <button
                                        onClick={() => removeTimeRule(rule.id)}
                                        style={{
                                            padding: '4px 8px', background: '#FEE2E2', border: 'none',
                                            borderRadius: '6px', cursor: 'pointer', color: '#EF4444',
                                            fontSize: '12px',
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Rule Form Modal */}
                {showRuleForm && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.5)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                        padding: '20px',
                    }}>
                        <div style={{
                            background: 'white', borderRadius: '16px', padding: '32px',
                            width: '100%', maxWidth: '450px',
                        }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>
                                Nueva Regla de Precio
                            </h3>

                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={ruleForm.name}
                                    onChange={e => setRuleForm({ ...ruleForm, name: e.target.value })}
                                    placeholder="Ej: Horario nocturno"
                                    style={{
                                        width: '100%', padding: '10px 14px', border: '2px solid #e0e0e0',
                                        borderRadius: '10px', fontSize: '14px', outline: 'none',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '14px' }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                    Tipo
                                </label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {['time', 'day'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setRuleForm({ ...ruleForm, type: t })}
                                            style={{
                                                flex: 1, padding: '8px', border: '2px solid',
                                                borderColor: ruleForm.type === t ? '#00A86B' : '#e0e0e0',
                                                background: ruleForm.type === t ? '#E6F9F1' : 'white',
                                                borderRadius: '8px', cursor: 'pointer', fontSize: '13px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            {t === 'time' ? '🕐 Por horario' : '📅 Por día'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {ruleForm.type === 'time' ? (
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#888', marginBottom: '4px' }}>
                                            Desde
                                        </label>
                                        <input type="time" value={ruleForm.startTime}
                                            onChange={e => setRuleForm({ ...ruleForm, startTime: e.target.value })}
                                            style={{
                                                width: '100%', padding: '8px', border: '2px solid #e0e0e0',
                                                borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#888', marginBottom: '4px' }}>
                                            Hasta
                                        </label>
                                        <input type="time" value={ruleForm.endTime}
                                            onChange={e => setRuleForm({ ...ruleForm, endTime: e.target.value })}
                                            style={{
                                                width: '100%', padding: '8px', border: '2px solid #e0e0e0',
                                                borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div style={{ marginBottom: '14px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#888', marginBottom: '6px' }}>
                                        Días
                                    </label>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        {dayOptions.map(d => (
                                            <button
                                                key={d.key}
                                                onClick={() => {
                                                    setRuleForm(prev => ({
                                                        ...prev,
                                                        days: prev.days.includes(d.key)
                                                            ? prev.days.filter(x => x !== d.key)
                                                            : [...prev.days, d.key]
                                                    }));
                                                }}
                                                style={{
                                                    padding: '6px 10px', border: '2px solid',
                                                    borderColor: ruleForm.days.includes(d.key) ? '#00A86B' : '#e0e0e0',
                                                    background: ruleForm.days.includes(d.key) ? '#E6F9F1' : 'white',
                                                    borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                {d.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#888', marginBottom: '4px' }}>
                                        Ajuste
                                    </label>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {['increase', 'decrease'].map(t => (
                                            <button key={t}
                                                onClick={() => setRuleForm({ ...ruleForm, adjustmentType: t })}
                                                style={{
                                                    flex: 1, padding: '8px', border: '2px solid',
                                                    borderColor: ruleForm.adjustmentType === t ? (t === 'increase' ? '#EF4444' : '#00A86B') : '#e0e0e0',
                                                    background: ruleForm.adjustmentType === t ? (t === 'increase' ? '#FEE2E2' : '#E6F9F1') : 'white',
                                                    borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600',
                                                }}
                                            >
                                                {t === 'increase' ? '📈 Aumento' : '📉 Descuento'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ width: '80px' }}>
                                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#888', marginBottom: '4px' }}>
                                        %
                                    </label>
                                    <input type="number" value={ruleForm.adjustment}
                                        onChange={e => setRuleForm({ ...ruleForm, adjustment: parseInt(e.target.value) || 0 })}
                                        style={{
                                            width: '100%', padding: '8px', border: '2px solid #e0e0e0',
                                            borderRadius: '8px', fontSize: '14px', textAlign: 'center',
                                            fontWeight: '700', boxSizing: 'border-box',
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button onClick={() => setShowRuleForm(false)}
                                    style={{
                                        flex: 1, padding: '12px', background: '#f5f5f5', color: '#666',
                                        border: 'none', borderRadius: '10px', fontSize: '14px',
                                        fontWeight: '600', cursor: 'pointer',
                                    }}>Cancelar</button>
                                <button onClick={addTimeRule}
                                    style={{
                                        flex: 1, padding: '12px', background: '#00A86B', color: 'white',
                                        border: 'none', borderRadius: '10px', fontSize: '14px',
                                        fontWeight: '600', cursor: 'pointer',
                                    }}>Guardar Regla</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PricingSection;
