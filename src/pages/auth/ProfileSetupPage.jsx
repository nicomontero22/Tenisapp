import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './ProfileSetup.css';

const ProfileSetupPage = () => {
    const { user, completeProfile } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        dominantHand: '',
        playStyle: '',
        courtPreference: '',
        skillLevel: '',
        bio: '',
        location: ''
    });
    const [loading, setLoading] = useState(false);

    const totalSteps = 4;

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const result = await completeProfile(formData);
        setLoading(false);

        if (!result.success) {
            alert('Error al guardar perfil: ' + result.error);
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.gender && formData.age;
            case 2:
                return formData.dominantHand && formData.playStyle;
            case 3:
                return formData.courtPreference && formData.skillLevel;
            case 4:
                return true; // Opcional
            default:
                return false;
        }
    };

    return (
        <div className="profile-setup-page">
            <div className="setup-container">
                {/* Header */}
                <div className="setup-header">
                    <div className="user-welcome">
                        <img src={user?.avatar} alt={user?.name} className="user-avatar-large" />
                        <div>
                            <h2>¡Bienvenido, {user?.name?.split(' ')[0]}!</h2>
                            <p>Completá tu perfil para comenzar a jugar</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-bar">
                        <div className="progress-steps">
                            {[1, 2, 3, 4].map((step) => (
                                <div
                                    key={step}
                                    className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                                >
                                    <div className="step-number">
                                        {currentStep > step ? (
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                            </svg>
                                        ) : (
                                            step
                                        )}
                                    </div>
                                    <span className="step-label">
                                        {step === 1 && 'Info Personal'}
                                        {step === 2 && 'Estilo de Juego'}
                                        {step === 3 && 'Preferencias'}
                                        {step === 4 && 'Sobre Ti'}
                                    </span>
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
                </div>

                {/* Form Steps */}
                <div className="setup-content">
                    {/* Paso 1: Info Personal */}
                    {currentStep === 1 && (
                        <div className="setup-step fade-in">
                            <h3>Información Personal</h3>
                            <p className="step-description">Contanos un poco sobre vos</p>

                            <div className="form-section">
                                <label className="form-label">¿Cuál es tu género?</label>
                                <div className="options-grid">
                                    {[
                                        { value: 'male', label: 'Masculino', icon: '👨' },
                                        { value: 'female', label: 'Femenino', icon: '👩' },
                                        { value: 'other', label: 'Otro', icon: '🧑' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            className={`option-card ${formData.gender === option.value ? 'selected' : ''}`}
                                            onClick={() => handleChange('gender', option.value)}
                                        >
                                            <span className="option-icon">{option.icon}</span>
                                            <span className="option-label">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-section">
                                <label className="form-label" htmlFor="age">¿Cuántos años tenés?</label>
                                <input
                                    type="number"
                                    id="age"
                                    className="form-input"
                                    placeholder="Ej: 28"
                                    min="13"
                                    max="100"
                                    value={formData.age}
                                    onChange={(e) => handleChange('age', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Paso 2: Estilo de Juego */}
                    {currentStep === 2 && (
                        <div className="setup-step fade-in">
                            <h3>Estilo de Juego</h3>
                            <p className="step-description">Ayudanos a conocer cómo jugás</p>

                            <div className="form-section">
                                <label className="form-label">¿Con qué mano jugás?</label>
                                <div className="options-grid two-columns">
                                    {[
                                        { value: 'right', label: 'Diestro', icon: '🤚' },
                                        { value: 'left', label: 'Zurdo', icon: '🖐️' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            className={`option-card ${formData.dominantHand === option.value ? 'selected' : ''}`}
                                            onClick={() => handleChange('dominantHand', option.value)}
                                        >
                                            <span className="option-icon">{option.icon}</span>
                                            <span className="option-label">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-section">
                                <label className="form-label">¿Cómo preferís jugar?</label>
                                <div className="options-grid">
                                    {[
                                        { value: 'singles', label: 'Singles', icon: '🎾', desc: 'Juego individual' },
                                        { value: 'doubles', label: 'Dobles', icon: '👥', desc: 'Juego en pareja' },
                                        { value: 'both', label: 'Ambos', icon: '⚡', desc: 'Me gusta todo' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            className={`option-card ${formData.playStyle === option.value ? 'selected' : ''}`}
                                            onClick={() => handleChange('playStyle', option.value)}
                                        >
                                            <span className="option-icon">{option.icon}</span>
                                            <div className="option-text">
                                                <span className="option-label">{option.label}</span>
                                                <span className="option-desc">{option.desc}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Paso 3: Preferencias */}
                    {currentStep === 3 && (
                        <div className="setup-step fade-in">
                            <h3>Preferencias de Juego</h3>
                            <p className="step-description">Configurá tus preferencias</p>

                            <div className="form-section">
                                <label className="form-label">¿Qué tipo de cancha preferís?</label>
                                <div className="options-list">
                                    {[
                                        { value: 'clay', label: 'Polvo de ladrillo', icon: '🟤', desc: 'Superficie lenta, ideal para jugadores de fondo' },
                                        { value: 'hard', label: 'Cemento/Hard Court', icon: '🔵', desc: 'Superficie rápida y uniforme' },
                                        { value: 'grass', label: 'Césped', icon: '🟢', desc: 'Superficie muy rápida, como Wimbledon' },
                                        { value: 'carpet', label: 'Sintética', icon: '🟡', desc: 'Superficie indoor, rápida' },
                                        { value: 'any', label: 'Me da igual', icon: '⚪', desc: 'Juego en cualquier superficie' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            className={`option-list-card ${formData.courtPreference === option.value ? 'selected' : ''}`}
                                            onClick={() => handleChange('courtPreference', option.value)}
                                        >
                                            <span className="option-icon">{option.icon}</span>
                                            <div className="option-text">
                                                <span className="option-label">{option.label}</span>
                                                <span className="option-desc">{option.desc}</span>
                                            </div>
                                            {formData.courtPreference === option.value && (
                                                <svg className="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-section">
                                <label className="form-label">¿Cuál es tu nivel de juego?</label>
                                <div className="options-grid two-columns">
                                    {[
                                        { value: 'beginner', label: 'Principiante', icon: '🌱', desc: 'Recién empiezo' },
                                        { value: 'intermediate', label: 'Intermedio', icon: '📈', desc: 'Juego regularmente' },
                                        { value: 'advanced', label: 'Avanzado', icon: '⭐', desc: 'Nivel competitivo' },
                                        { value: 'professional', label: 'Profesional', icon: '🏆', desc: 'Nivel profesional' }
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            className={`option-card ${formData.skillLevel === option.value ? 'selected' : ''}`}
                                            onClick={() => handleChange('skillLevel', option.value)}
                                        >
                                            <span className="option-icon">{option.icon}</span>
                                            <div className="option-text">
                                                <span className="option-label">{option.label}</span>
                                                <span className="option-desc">{option.desc}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Paso 4: Sobre Ti (Opcional) */}
                    {currentStep === 4 && (
                        <div className="setup-step fade-in">
                            <h3>Sobre Ti</h3>
                            <p className="step-description">Opcional: Contale a otros jugadores sobre vos</p>

                            <div className="form-section">
                                <label className="form-label" htmlFor="location">Ubicación</label>
                                <input
                                    type="text"
                                    id="location"
                                    className="form-input"
                                    placeholder="Ej: Rosario, Santa Fe"
                                    value={formData.location}
                                    onChange={(e) => handleChange('location', e.target.value)}
                                />
                            </div>

                            <div className="form-section">
                                <label className="form-label" htmlFor="bio">
                                    Biografía
                                    <span className="optional-label">Opcional</span>
                                </label>
                                <textarea
                                    id="bio"
                                    className="form-textarea"
                                    placeholder="Contá un poco sobre vos, tu experiencia en tenis, objetivos, etc."
                                    rows="4"
                                    maxLength="500"
                                    value={formData.bio}
                                    onChange={(e) => handleChange('bio', e.target.value)}
                                />
                                <span className="char-count">{formData.bio.length}/500</span>
                            </div>

                            <div className="completion-message">
                                <div className="completion-icon">🎉</div>
                                <h4>¡Ya casi terminamos!</h4>
                                <p>Presioná "Finalizar" para empezar a reservar canchas y desafiar jugadores</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="setup-footer">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="btn-secondary"
                        disabled={currentStep === 1}
                    >
                        Atrás
                    </button>

                    {currentStep < totalSteps ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="btn-primary"
                            disabled={!isStepValid()}
                        >
                            Siguiente
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn-primary"
                            disabled={loading || !isStepValid()}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Guardando...
                                </>
                            ) : (
                                '✓ Finalizar'
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSetupPage;