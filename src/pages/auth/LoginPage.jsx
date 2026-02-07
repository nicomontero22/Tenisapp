import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthPages.css';

const LoginPage = ({ onSwitchToRegister }) => {
    const [loginMethod, setLoginMethod] = useState('social');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState({ google: false, facebook: false, email: false });
    const [error, setError] = useState('');
    const [needsVerification, setNeedsVerification] = useState(false);
    const { loginWithGoogle, loginWithFacebook, loginWithEmail, resendVerificationEmail } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleGoogleLogin = async () => {
        setError('');
        setLoading({ ...loading, google: true });
        const result = await loginWithGoogle();
        setLoading({ ...loading, google: false });
        if (!result.success) {
            setError(result.error || 'Error al iniciar sesión con Google');
        }
    };

    const handleFacebookLogin = async () => {
        setError('');
        setLoading({ ...loading, facebook: true });
        const result = await loginWithFacebook();
        setLoading({ ...loading, facebook: false });
        if (!result.success) {
            setError(result.error || 'Error al iniciar sesión con Facebook');
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setNeedsVerification(false);

        if (!formData.email || !formData.password) {
            setError('Por favor completa todos los campos');
            return;
        }

        setLoading({ ...loading, email: true });
        const result = await loginWithEmail(formData.email, formData.password);
        setLoading({ ...loading, email: false });

        if (!result.success) {
            if (result.needsVerification) {
                setNeedsVerification(true);
                setError('Tu email aún no está verificado. Revisa tu bandeja de entrada.');
            } else {
                setError(result.error || 'Credenciales inválidas');
            }
        }
    };

    const handleResendVerification = async () => {
        setLoading({ ...loading, email: true });
        const result = await resendVerificationEmail(formData.email);
        setLoading({ ...loading, email: false });

        if (result.success) {
            setError('✓ Email de verificación reenviado. Revisa tu bandeja de entrada.');
        } else {
            setError(result.error);
        }
    };

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
                    <p className="brand-subtitle">Reservá canchas, desafiá jugadores y mejorá tu ranking</p>
                </div>

                {/* Tarjeta de Login */}
                <div className="auth-card">
                    <div className="auth-card-header">
                        <h2>Iniciar Sesión</h2>
                        <p>Ingresá con tu cuenta existente</p>
                    </div>

                    {/* Toggle método de login */}
                    <div className="login-method-toggle">
                        <button
                            className={`method-btn ${loginMethod === 'social' ? 'active' : ''}`}
                            onClick={() => setLoginMethod('social')}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                            </svg>
                            Google / Facebook
                        </button>
                        <button
                            className={`method-btn ${loginMethod === 'email' ? 'active' : ''}`}
                            onClick={() => setLoginMethod('email')}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            Email / Contraseña
                        </button>
                    </div>

                    {error && (
                        <div className={`alert ${needsVerification ? 'alert-warning' : 'alert-error'}`}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {needsVerification && (
                        <button onClick={handleResendVerification} className="btn-link" disabled={loading.email}>
                            Reenviar email de verificación
                        </button>
                    )}

                    {/* Login Social */}
                    {loginMethod === 'social' && (
                        <div className="social-login-buttons">
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading.google || loading.facebook}
                                className="btn-social-large google"
                            >
                                {loading.google ? (
                                    <>
                                        <span className="spinner"></span>
                                        <span>Conectando...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span>Continuar con Google</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={handleFacebookLogin}
                                disabled={loading.google || loading.facebook}
                                className="btn-social-large facebook"
                            >
                                {loading.facebook ? (
                                    <>
                                        <span className="spinner"></span>
                                        <span>Conectando...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        <span>Continuar con Facebook</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Login Email */}
                    {loginMethod === 'email' && (
                        <form onSubmit={handleEmailLogin} className="email-login-form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="tu@email.com"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" />
                                    <span>Recordarme</span>
                                </label>
                                <a href="/forgot-password" className="link-primary">¿Olvidaste tu contraseña?</a>
                            </div>

                            <button type="submit" className="btn-primary btn-block" disabled={loading.email}>
                                {loading.email ? (
                                    <>
                                        <span className="spinner"></span>
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </button>
                        </form>
                    )}

                    {/* Cuentas de prueba */}
                    <div style={{
                        background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px',
                        padding: '14px', marginTop: '16px', fontSize: '12px', color: '#166534'
                    }}>
                        <strong style={{ display: 'block', marginBottom: '6px' }}>🧪 Cuentas de prueba:</strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span>🎾 Jugador: <strong>jugador@test.com</strong> / 123456</span>
                            <span>🏢 Club: <strong>club@test.com</strong> / 123456</span>
                            <span>👑 CEO: <strong>ceo@tennisbooking.com</strong> / ceo2025</span>
                        </div>
                    </div>

                    <div className="auth-divider">
                        <span>Inicio de sesión seguro</span>
                    </div>

                    <div className="auth-footer">
                        <p>
                            ¿No tienes cuenta?{' '}
                            <button onClick={onSwitchToRegister} className="link-primary">
                                Regístrate gratis
                            </button>
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                                <path d="M16 3l3 6h6l-4.5 4.5 1.5 6-6-3-6 3 1.5-6L7 9h6l3-6z" />
                            </svg>
                        </div>
                        <h3>Reservas al instante</h3>
                        <p>Encontrá y reservá canchas disponibles en tiempo real</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                                <path d="M16 7a3 3 0 100-6 3 3 0 000 6zM16 28a3 3 0 100-6 3 3 0 000 6zM7 16a3 3 0 100-6 3 3 0 000 6zM25 16a3 3 0 100-6 3 3 0 000 6z" />
                            </svg>
                        </div>
                        <h3>Comunidad activa</h3>
                        <p>Conectá con jugadores de tu nivel</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                                <path d="M28 8H4a2 2 0 00-2 2v12a2 2 0 002 2h24a2 2 0 002-2V10a2 2 0 00-2-2z" />
                            </svg>
                        </div>
                        <h3>Estadísticas detalladas</h3>
                        <p>Seguí tu progreso y escalá en el ranking</p>
                    </div>
                </div>

                <div className="auth-footer-text">
                    <p>
                        Al continuar, aceptás nuestros{' '}
                        <a href="/terms" className="link-primary">Términos de Servicio</a>
                        {' '}y{' '}
                        <a href="/privacy" className="link-primary">Política de Privacidad</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;