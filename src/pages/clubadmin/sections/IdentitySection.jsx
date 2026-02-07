import React, { useState } from 'react';

const IdentitySection = ({ identity, setIdentity }) => {
    const [activeTab, setActiveTab] = useState('info'); // 'info', 'images', 'social'

    const updateField = (field, value) => {
        setIdentity(prev => ({ ...prev, [field]: value }));
    };

    const amenitiesOptions = [
        { key: 'vestuarios', label: 'Vestuarios', icon: '🚿' },
        { key: 'estacionamiento', label: 'Estacionamiento', icon: '🅿️' },
        { key: 'bar', label: 'Bar/Cantina', icon: '🍺' },
        { key: 'restaurant', label: 'Restaurant', icon: '🍽️' },
        { key: 'gimnasio', label: 'Gimnasio', icon: '💪' },
        { key: 'piscina', label: 'Piscina', icon: '🏊' },
        { key: 'wifi', label: 'WiFi', icon: '📶' },
        { key: 'iluminacion', label: 'Iluminación', icon: '💡' },
        { key: 'proshop', label: 'Pro Shop', icon: '🛒' },
        { key: 'sauna', label: 'Sauna/Spa', icon: '🧖' },
        { key: 'kids', label: 'Zona Niños', icon: '👶' },
        { key: 'seguridad', label: 'Seguridad', icon: '🔒' },
    ];

    const toggleAmenity = (key) => {
        setIdentity(prev => {
            const current = prev.amenities || [];
            return {
                ...prev,
                amenities: current.includes(key)
                    ? current.filter(a => a !== key)
                    : [...current, key]
            };
        });
    };

    return (
        <div style={{ padding: '0' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 4px' }}>
                    Mi Club
                </h2>
                <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                    Información pública de tu club que verán los jugadores
                </p>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex', gap: '4px', marginBottom: '20px',
                background: '#f5f5f5', borderRadius: '12px', padding: '4px',
            }}>
                {[
                    { key: 'info', label: '📋 Información' },
                    { key: 'images', label: '📷 Imágenes' },
                    { key: 'social', label: '🌐 Redes y Contacto' },
                ].map(tab => (
                    <button key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            flex: 1, padding: '10px', border: 'none',
                            borderRadius: '8px', cursor: 'pointer', fontSize: '13px',
                            fontWeight: '600', transition: 'all 0.2s',
                            background: activeTab === tab.key ? 'white' : 'transparent',
                            color: activeTab === tab.key ? '#1a1a1a' : '#888',
                            boxShadow: activeTab === tab.key ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Info Tab */}
            {activeTab === 'info' && (
                <div style={{
                    background: 'white', borderRadius: '16px', padding: '24px',
                    border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Club Name */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                Nombre del Club
                            </label>
                            <input type="text" value={identity.name || ''}
                                onChange={e => updateField('name', e.target.value)}
                                placeholder="Nombre de tu club"
                                style={{
                                    width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0',
                                    borderRadius: '10px', fontSize: '15px', fontWeight: '600',
                                    outline: 'none', boxSizing: 'border-box',
                                }}
                                onFocus={e => e.target.style.borderColor = '#00A86B'}
                                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                Descripción
                            </label>
                            <textarea value={identity.description || ''}
                                onChange={e => updateField('description', e.target.value)}
                                placeholder="Contá sobre tu club, historia, instalaciones..."
                                rows={4}
                                style={{
                                    width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0',
                                    borderRadius: '10px', fontSize: '14px', outline: 'none',
                                    resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
                                }}
                                onFocus={e => e.target.style.borderColor = '#00A86B'}
                                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                            />
                            <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                                {(identity.description || '').length}/500 caracteres
                            </p>
                        </div>

                        {/* Address */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                📍 Dirección
                            </label>
                            <input type="text" value={identity.address || ''}
                                onChange={e => updateField('address', e.target.value)}
                                placeholder="Av. Libertador 1234, CABA"
                                style={{
                                    width: '100%', padding: '12px 14px', border: '2px solid #e0e0e0',
                                    borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                                }}
                                onFocus={e => e.target.style.borderColor = '#00A86B'}
                                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                            />
                        </div>

                        {/* Phone & Email */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                    📞 Teléfono
                                </label>
                                <input type="tel" value={identity.phone || ''}
                                    onChange={e => updateField('phone', e.target.value)}
                                    placeholder="+54 11 5555-0000"
                                    style={{
                                        width: '100%', padding: '10px 14px', border: '2px solid #e0e0e0',
                                        borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#00A86B'}
                                    onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                    📧 Email
                                </label>
                                <input type="email" value={identity.email || ''}
                                    onChange={e => updateField('email', e.target.value)}
                                    placeholder="info@miclub.com"
                                    style={{
                                        width: '100%', padding: '10px 14px', border: '2px solid #e0e0e0',
                                        borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#00A86B'}
                                    onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '10px' }}>
                                🏟️ Servicios e Instalaciones
                            </label>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {amenitiesOptions.map(a => {
                                    const isSelected = (identity.amenities || []).includes(a.key);
                                    return (
                                        <button key={a.key}
                                            onClick={() => toggleAmenity(a.key)}
                                            style={{
                                                padding: '8px 14px', border: '2px solid',
                                                borderColor: isSelected ? '#00A86B' : '#e0e0e0',
                                                background: isSelected ? '#E6F9F1' : 'white',
                                                borderRadius: '20px', cursor: 'pointer', fontSize: '12px',
                                                fontWeight: '600', display: 'flex', alignItems: 'center',
                                                gap: '4px', transition: 'all 0.15s',
                                                color: isSelected ? '#00A86B' : '#666',
                                            }}
                                        >
                                            {a.icon} {a.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
                <div style={{
                    background: 'white', borderRadius: '16px', padding: '24px',
                    border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                    {/* Cover Image */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '10px' }}>
                            🖼️ Imagen de Portada
                        </label>
                        <div style={{
                            width: '100%', height: '200px', borderRadius: '12px',
                            border: '2px dashed #ddd', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer', background: '#fafafa',
                            transition: 'border-color 0.2s',
                            backgroundImage: identity.coverImage ? `url(${identity.coverImage})` : 'none',
                            backgroundSize: 'cover', backgroundPosition: 'center',
                        }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = '#00A86B'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = '#ddd'}
                            onClick={() => {
                                const url = prompt('Ingresá URL de la imagen de portada:');
                                if (url) updateField('coverImage', url);
                            }}
                        >
                            {!identity.coverImage && (
                                <div style={{ textAlign: 'center', color: '#999' }}>
                                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>📷</div>
                                    <p style={{ fontSize: '14px', fontWeight: '600' }}>Click para agregar portada</p>
                                    <p style={{ fontSize: '12px' }}>Recomendado: 1200 x 400 px</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Logo */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '10px' }}>
                            🏢 Logo del Club
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '16px',
                                border: '2px dashed #ddd', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', cursor: 'pointer', background: '#fafafa',
                                overflow: 'hidden', flexShrink: 0,
                            }}
                                onClick={() => {
                                    const url = prompt('Ingresá URL del logo:');
                                    if (url) updateField('logo', url);
                                }}
                            >
                                {identity.logo ? (
                                    <img src={identity.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '24px' }}>🏢</span>
                                )}
                            </div>
                            <div>
                                <p style={{ fontSize: '14px', fontWeight: '600', color: '#333', margin: '0 0 4px' }}>
                                    Logo del club
                                </p>
                                <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
                                    Recomendado: 200 x 200 px, formato cuadrado
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '10px' }}>
                            📸 Galería de Fotos
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
                            {(identity.gallery || []).map((img, idx) => (
                                <div key={idx} style={{
                                    position: 'relative', paddingTop: '100%', borderRadius: '10px',
                                    overflow: 'hidden', background: '#f0f0f0',
                                }}>
                                    <img src={img} alt={`Foto ${idx + 1}`} style={{
                                        position: 'absolute', top: 0, left: 0, width: '100%',
                                        height: '100%', objectFit: 'cover',
                                    }} />
                                    <button
                                        onClick={() => {
                                            setIdentity(prev => ({
                                                ...prev,
                                                gallery: prev.gallery.filter((_, i) => i !== idx)
                                            }));
                                        }}
                                        style={{
                                            position: 'absolute', top: '4px', right: '4px',
                                            width: '24px', height: '24px', borderRadius: '50%',
                                            background: 'rgba(239,68,68,0.9)', border: 'none',
                                            color: 'white', cursor: 'pointer', fontSize: '12px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            {/* Add Photo */}
                            <div style={{
                                paddingTop: '100%', position: 'relative', borderRadius: '10px',
                                border: '2px dashed #ddd', cursor: 'pointer', background: '#fafafa',
                            }}
                                onClick={() => {
                                    const url = prompt('Ingresá URL de la foto:');
                                    if (url) {
                                        setIdentity(prev => ({
                                            ...prev,
                                            gallery: [...(prev.gallery || []), url]
                                        }));
                                    }
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%',
                                    transform: 'translate(-50%, -50%)', textAlign: 'center',
                                }}>
                                    <div style={{ fontSize: '24px' }}>➕</div>
                                    <span style={{ fontSize: '10px', color: '#999' }}>Agregar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Social Tab */}
            {activeTab === 'social' && (
                <div style={{
                    background: 'white', borderRadius: '16px', padding: '24px',
                    border: '1px solid #eee', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {[
                            { key: 'website', label: 'Sitio Web', icon: '🌐', placeholder: 'https://www.miclub.com' },
                            { key: 'instagram', label: 'Instagram', icon: '📸', placeholder: '@miclub' },
                            { key: 'facebook', label: 'Facebook', icon: '👤', placeholder: 'facebook.com/miclub' },
                            { key: 'whatsapp', label: 'WhatsApp', icon: '💬', placeholder: '+54 11 5555-0000' },
                        ].map(field => (
                            <div key={field.key}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
                                    {field.icon} {field.label}
                                </label>
                                <input type="text"
                                    value={identity[field.key] || ''}
                                    onChange={e => updateField(field.key, e.target.value)}
                                    placeholder={field.placeholder}
                                    style={{
                                        width: '100%', padding: '10px 14px', border: '2px solid #e0e0e0',
                                        borderRadius: '10px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#00A86B'}
                                    onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={() => alert('Datos guardados correctamente! (TODO: conectar con API)')}
                        style={{
                            width: '100%', padding: '14px', background: '#00A86B', color: 'white',
                            border: 'none', borderRadius: '10px', fontSize: '15px',
                            fontWeight: '700', cursor: 'pointer', marginTop: '24px',
                        }}
                    >
                        💾 Guardar Cambios
                    </button>
                </div>
            )}
        </div>
    );
};

export default IdentitySection;
