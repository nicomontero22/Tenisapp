import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './ClubSetupWizard.css';

const ClubSetupWizard = () => {
    const { user, updateProfile } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [clubData, setClubData] = useState({
        // Paso 1: Identidad del Club
        name: '',
        description: '',
        phone: '',

        // Paso 2: Ubicación
        address: '',
        city: '',
        province: '',
        postalCode: '',
        googleMapsUrl: '',

        // Paso 3: Redes y Contacto
        website: '',
        instagram: '',
        facebook: '',
        email: user?.email || '',

        // Paso 4: Infraestructura
        totalCourts: 1,
        courtTypes: [], // ['clay', 'hard', 'grass', 'carpet']

        // Paso 5: Amenidades
        amenities: [], // Array de amenidades seleccionadas

        // Paso 6: Horarios
        openingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        openingTime: '08:00',
        closingTime: '23:00',
    });

    const totalSteps = 6;

    const amenitiesList = [
        { id: 'parking', label: 'Estacionamiento', icon: '🅿️' },
        { id: 'locker_room', label: 'Vestuarios', icon: '🚿' },
        { id: 'restaurant', label: 'Restaurant/Cafetería', icon: '☕' },
        { id: 'bar', label: 'Bar', icon: '🍺' },
        { id: 'pro_shop', label: 'Tienda (Pro Shop)', icon: '🏪' },
        { id: 'wifi', label: 'WiFi', icon: '📶' },
        { id: 'pool', label: 'Piscina', icon: '🏊' },
        { id: 'gym', label: 'Gimnasio', icon: '💪' },
        { id: 'spa', label: 'Spa/Sauna', icon: '🧖' },
        { id: 'lockers', label: 'Casilleros', icon: '🔐' },
        { id: 'lighting', label: 'Iluminación', icon: '💡' },
        { id: 'indoor', label: 'Canchas Cubiertas', icon: '🏠' },
    ];

    const handleChange = (field, value) => {
        setClubData(prev => ({ ...prev, [field]: value }));
    };

    const toggleArrayItem = (field, item) => {
        setClubData(prev => ({
            ...prev,
            [field]: prev[field].includes(item)
                ? prev[field].filter(i => i !== item)
                : [...prev[field], item]
        }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            handleComplete();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = async () => {
        setLoading(true);

        // TODO: Guardar en API Java
        const result = await updateProfile({
            clubData: clubData,
            setupComplete: true
        });

        setLoading(false);

        if (!result.success) {
            alert('Error al guardar: ' + result.error);
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return clubData.name && clubData.description && clubData.phone;
            case 2:
                return clubData.address && clubData.city && clubData.province;
            case 3:
                return true; // Redes sociales son opcionales
            case 4:
                return clubData.totalCourts > 0 && clubData.courtTypes.length > 0;
            case 5:
                return true; // Amenidades son opcionales
            case 6:
                return clubData.openingDays.length > 0 && clubData.openingTime && clubData.closingTime;
            default:
                return false;
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="wizard-step">
                        <div className="step-header">
                            <div className="step-icon">🏢</div>
                            <h2>Identidad del Club</h2>
                            <p>Contanos sobre tu club de tenis</p>
                        </div>

                        <div className="form-section">
                            <label className="form-label">Nombre del Club *</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Ej: Club Atlético River Plate"
                                value={clubData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>

                        <div className="form-section">
                            <label className="form-label">Descripción *</label>
                            <textarea
                                className="form-textarea"
                                rows="4"
                                placeholder="Describí tu club en pocas palabras..."
                                value={clubData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                            />
                            <span className="char-count">{clubData.description.length}/500</span>
                        </div>

                        <div className="form-section">
                            <label className="form-label">Teléfono de Contacto *</label>
                            <input
                                type="tel"
                                className="form-input"
                                placeholder="+54 11 1234-5678"
                                value={clubData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="wizard-step">
                        <div className="step-header">
                            <div className="step-icon">📍</div>
                            <h2>Ubicación</h2>
                            <p>¿Dónde está ubicado tu club?</p>
                        </div>

                        <div className="form-section">
                            <label className="form-label">Dirección Completa *</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Av. Figueroa Alcorta 7597"
                                value={clubData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-section">
                                <label className="form-label">Ciudad *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Buenos Aires"
                                    value={clubData.city}
                                    onChange={(e) => handleChange('city', e.target.value)}
                                />
                            </div>

                            <div className="form-section">
                                <label className="form-label">Provincia *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="CABA"
                                    value={clubData.province}
                                    onChange={(e) => handleChange('province', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <label className="form-label">Código Postal</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="C1428"
                                value={clubData.postalCode}
                                onChange={(e) => handleChange('postalCode', e.target.value)}
                            />
                        </div>

                        <div className="form-section">
                            <label className="form-label">Link de Google Maps (Opcional)</label>
                            <input
                                type="url"
                                className="form-input"
                                placeholder="https://maps.google.com/..."
                                value={clubData.googleMapsUrl}
                                onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                            />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="wizard-step">
                        <div className="step-header">
                            <div className="step-icon">🌐</div>
                            <h2>Redes y Contacto</h2>
                            <p>Ayuda a los jugadores a encontrarte</p>
                        </div>

                        <div className="form-section">
                            <label className="form-label">Sitio Web</label>
                            <input
                                type="url"
                                className="form-input"
                                placeholder="https://tuclub.com"
                                value={clubData.website}
                                onChange={(e) => handleChange('website', e.target.value)}
                            />
                        </div>

                        <div className="form-section">
                            <label className="form-label">Instagram</label>
                            <div className="input-with-prefix">
                                <span className="input-prefix">@</span>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="tuclub"
                                    value={clubData.instagram}
                                    onChange={(e) => handleChange('instagram', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <label className="form-label">Facebook</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="facebook.com/tuclub"
                                value={clubData.facebook}
                                onChange={(e) => handleChange('facebook', e.target.value)}
                            />
                        </div>

                        <div className="form-section">
                            <label className="form-label">Email de Contacto</label>
                            <input
                                type="email"
                                className="form-input"
                                placeholder="contacto@tuclub.com"
                                value={clubData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="wizard-step">
                        <div className="step-header">
                            <div className="step-icon">🎾</div>
                            <h2>Infraestructura</h2>
                            <p>Contanos sobre tus canchas</p>
                        </div>

                        <div className="form-section">
                            <label className="form-label">¿Cuántas canchas tenés? *</label>
                            <input
                                type="number"
                                className="form-input"
                                min="1"
                                max="50"
                                value={clubData.totalCourts}
                                onChange={(e) => handleChange('totalCourts', parseInt(e.target.value) || 1)}
                            />
                        </div>

                        <div className="form-section">
                            <label className="form-label">Tipos de Superficie * (Seleccioná todas las que tengas)</label>
                            <div className="checkbox-grid">
                                {[
                                    { id: 'clay', label: 'Polvo de Ladrillo', icon: '🟤', color: '#C2571A' },
                                    { id: 'hard', label: 'Cemento (Hard Court)', icon: '🔵', color: '#4169E1' },
                                    { id: 'grass', label: 'Césped', icon: '🟢', color: '#228B22' },
                                    { id: 'carpet', label: 'Sintética', icon: '🟡', color: '#FFD700' }
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        className={`checkbox-card ${clubData.courtTypes.includes(type.id) ? 'selected' : ''}`}
                                        onClick={() => toggleArrayItem('courtTypes', type.id)}
                                    >
                                        <span className="checkbox-icon" style={{ background: type.color }}>
                                            {type.icon}
                                        </span>
                                        <span className="checkbox-label">{type.label}</span>
                                        {clubData.courtTypes.includes(type.id) && (
                                            <div className="checkbox-check">✓</div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="wizard-step">
                        <div className="step-header">
                            <div className="step-icon">✨</div>
                            <h2>Amenidades</h2>
                            <p>¿Qué servicios ofrecés?</p>
                        </div>

                        <div className="amenities-grid">
                            {amenitiesList.map((amenity) => (
                                <button
                                    key={amenity.id}
                                    type="button"
                                    className={`amenity-card ${clubData.amenities.includes(amenity.id) ? 'selected' : ''}`}
                                    onClick={() => toggleArrayItem('amenities', amenity.id)}
                                >
                                    <span className="amenity-icon">{amenity.icon}</span>
                                    <span className="amenity-label">{amenity.label}</span>
                                    {clubData.amenities.includes(amenity.id) && (
                                        <div className="amenity-check">✓</div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="wizard-step">
                        <div className="step-header">
                            <div className="step-icon">⏰</div>
                            <h2>Horarios de Apertura</h2>
                            <p>¿Cuándo está abierto tu club?</p>
                        </div>

                        <div className="form-section">
                            <label className="form-label">Días de Apertura *</label>
                            <div className="days-grid">
                                {[
                                    { id: 'monday', label: 'Lun' },
                                    { id: 'tuesday', label: 'Mar' },
                                    { id: 'wednesday', label: 'Mié' },
                                    { id: 'thursday', label: 'Jue' },
                                    { id: 'friday', label: 'Vie' },
                                    { id: 'saturday', label: 'Sáb' },
                                    { id: 'sunday', label: 'Dom' }
                                ].map((day) => (
                                    <button
                                        key={day.id}
                                        type="button"
                                        className={`day-chip ${clubData.openingDays.includes(day.id) ? 'selected' : ''}`}
                                        onClick={() => toggleArrayItem('openingDays', day.id)}
                                    >
                                        {day.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-section">
                                <label className="form-label">Hora de Apertura *</label>
                                <input
                                    type="time"
                                    className="form-input"
                                    value={clubData.openingTime}
                                    onChange={(e) => handleChange('openingTime', e.target.value)}
                                />
                            </div>

                            <div className="form-section">
                                <label className="form-label">Hora de Cierre *</label>
                                <input
                                    type="time"
                                    className="form-input"
                                    value={clubData.closingTime}
                                    onChange={(e) => handleChange('closingTime', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="info-box success">
                            <div className="info-icon">✅</div>
                            <div className="info-content">
                                <h4>¡Ya casi terminamos!</h4>
                                <p>Después podrás configurar horarios específicos por día y definir precios para cada cancha.</p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="club-setup-wizard">
            {/* Progress Bar */}
            <div className="wizard-progress">
                <div className="progress-steps">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                        <div
                            key={step}
                            className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                        >
                            <div className="step-number">
                                {currentStep > step ? '✓' : step}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="progress-line">
                    <div
                        className="progress-fill"
                        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="wizard-content">
                {renderStep()}
            </div>

            {/* Navigation */}
            <div className="wizard-footer">
                <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary"
                    disabled={currentStep === 1}
                >
                    Atrás
                </button>

                <div className="step-indicator">
                    Paso {currentStep} de {totalSteps}
                </div>

                <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary"
                    disabled={!isStepValid() || loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Guardando...
                        </>
                    ) : currentStep === totalSteps ? (
                        '✓ Finalizar'
                    ) : (
                        'Siguiente'
                    )}
                </button>
            </div>
        </div>
    );
};

export default ClubSetupWizard;