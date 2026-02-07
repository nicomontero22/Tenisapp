import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthPages.css';

const RegisterPage = ({ onSwitchToLogin, onRegistrationSuccess }) => {
    const [step, setStep] = useState(1); // 1: Datos básicos, 2: Selección de rol
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        role: 'player' // 'player', 'club_admin'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [registered, setRegistered] = useState(false);
    const { registerWithEmail } = useAuth();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        // Limpiar error del campo
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'El nombre debe tener al menos 3 caracteres';
        }

        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Pasar al paso 2: Selección de rol
        setStep(2);
    };

    const handleRoleSubmit = async (selectedRole) => {
        setLoading(true);
        const result = await registerWithEmail(
            formData.name,
            formData.email,
            formData.password,
            selectedRole
        );
        setLoading(false);

        if (result.success) {
            setRegistered(true);
            if (onRegistrationSuccess) {
                onRegistrationSuccess(result.email);
            }
        } else {
            setErrors({ general: result.error });
            setStep(1); // Volver al paso 1 si hay error
        }
    };

    // Pantalla de confirmación después del registro
    if (registered) {
        return (
            <div className="auth-page">
                <div className="auth-container-center">
                    <div className="auth-card verification-sent">
                        <div className="success-icon">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <circle cx="40" cy="40" r="38" fill="#00A86B" fillOpacity="0.1" />
                                <circle cx="40" cy="40" r="30" fill="#00A86B" fillOpacity="0.2" />
                                <path d="M25 40L35 50L55 30" stroke="#00A86B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <h2>¡Cuenta Creada!</h2>
                        <p className="verification-message">
                            Te enviamos un email de verificación a:<br />
                            <strong>{formData.email}</strong>
                        </p>

                        <div className="verification-steps">
                            <div className="step">
                                <div className="step-number">1</div>
                                <div className="step-content">
                                    <h4>Revisa tu email</h4>
                                    <p>Busca nuestro email en tu bandeja de entrada</p>
                                </div>
                            </div>

                            <div className="step">
                                <div className="step-number">2</div>
                                <div className="step-content">
                                    <h4>Haz click en el link</h4>
                                    <p>Presiona el botón de verificación en el email</p>
                                </div>
                            </div>

                            <div className="step">
                                <div className="step-number">3</div>
                                <div className="step-content">
                                    <h4>¡Listo para jugar!</h4>
                                    <p>Completa tu perfil y empieza a reservar</p>
                                </div>
                            </div>
                        </div>

                        <div className="help-text">
                            <p>¿No recibiste el email?</p>
                            <ul>
                                <li>Revisa tu carpeta de spam o correo no deseado</li>
                                <li>Asegúrate de haber escrito bien tu email</li>
                                <li>El email puede tardar unos minutos en llegar</li>
                            </ul>
                        </div>

                        <button onClick={onSwitchToLogin} className="btn-primary btn-block">
                            Volver al inicio de sesión
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Paso 2: Selección de rol
    if (step === 2 && !registered) {
        const roles = [
            {
                id: 'player',
                name: 'Jugador',
                description: 'Quiero reservar canchas y jugar partidos',
                icon: '🎾',
                color: '#00A86B'
            },
            {
                id: 'club_admin',
                name: 'Administrador de Club',
                description: 'Quiero gestionar mi club y canchas',
                icon: '🏢',
                color: '#4ECDC4'
            }
        ];

        return (
            <div className="auth-page">
                <div className="auth-container-center">
                    <div className="auth-logo-section">
                        <div className="logo-container-large">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <circle cx="40" cy="40" r="35" fill="#FFD700" stroke="#00A86B" strokeWidth="4" />
                                <path d="M20 40 Q40 20 60 40 Q40 60 20 40" stroke="#00A86B" strokeWidth="4" fill="none" />
                            </svg>
                        </div>
                        <h1 className="brand-title">Tennis Booking</h1>
                        <p className="brand-subtitle">Elegí tu tipo de cuenta</p>
                    </div>

                    <div className="auth-card">
                        <div className="auth-card-header">
                            <h2>¿Cómo vas a usar Tennis Booking?</h2>
                            <p>Seleccioná la opción que mejor se adapte a vos</p>
                        </div>

                        {errors.general && (
                            <div className="alert alert-error">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.general}
                            </div>
                        )}

                        <div className="role-selection-grid">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    className={`role-selection-card ${formData.role === role.id ? 'selected' : ''}`}
                                    onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                                    disabled={loading}
                                >
                                    <div className="role-icon" style={{ background: role.color }}>
                                        <span style={{ fontSize: '48px' }}>{role.icon}</span>
                                    </div>
                                    <h3>{role.name}</h3>
                                    <p>{role.description}</p>
                                    {formData.role === role.id && (
                                        <div className="role-check">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="auth-footer" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                            <button
                                onClick={() => setStep(1)}
                                className="btn-secondary"
                                style={{ marginRight: '12px' }}
                            >
                                Volver
                            </button>
                            <button
                                onClick={() => handleRoleSubmit(formData.role)}
                                className="btn-primary"
                                disabled={loading || !formData.role}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Creando cuenta...
                                    </>
                                ) : (
                                    'Crear Cuenta'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-container-center">
                {/* Logo */}
                <div className="auth-logo-section">
                    <div className="logo-container-large">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <circle cx="40" cy="40" r="35" fill="#FFD700" stroke="#00A86B" strokeWidth="4" />
                            <path d="M20 40 Q40 20 60 40 Q40 60 20 40" stroke="#00A86B" strokeWidth="4" fill="none" />
                        </svg>
                    </div>
                    <h1 className="brand-title">Tennis Booking</h1>
                    <p className="brand-subtitle">Únete a la comunidad de tenis más grande</p>
                </div>

                {/* Formulario */}
                <div className="auth-card">
                    <div className="auth-card-header">
                        <h2>Crear Cuenta</h2>
                        <p>Completa el formulario para registrarte</p>
                    </div>

                    {errors.general && (
                        <div className="alert alert-error">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="email-login-form">
                        <div className="form-group">
                            <label htmlFor="name">Nombre completo *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Juan Pérez"
                                className={`form-input ${errors.name ? 'error' : ''}`}
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                className={`form-input ${errors.email ? 'error' : ''}`}
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña *</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Mínimo 6 caracteres"
                                className={`form-input ${errors.password ? 'error' : ''}`}
                            />
                            {errors.password && <span className="error-text">{errors.password}</span>}
                            <small className="help-text">Usa al menos 6 caracteres</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar contraseña *</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Repite tu contraseña"
                                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                            />
                            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                        </div>

                        <div className="form-group checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                />
                                <span>
                                    Acepto los{' '}
                                    <a href="/terms" className="link-primary" target="_blank" rel="noopener noreferrer">
                                        Términos y Condiciones
                                    </a>
                                    {' '}y la{' '}
                                    <a href="/privacy" className="link-primary" target="_blank" rel="noopener noreferrer">
                                        Política de Privacidad
                                    </a>
                                </span>
                            </label>
                            {errors.acceptTerms && <span className="error-text">{errors.acceptTerms}</span>}
                        </div>

                        <button type="submit" className="btn-primary btn-block" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Creando cuenta...
                                </>
                            ) : (
                                'Crear Cuenta'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            ¿Ya tienes cuenta?{' '}
                            <button onClick={onSwitchToLogin} className="link-primary">
                                Inicia sesión
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;