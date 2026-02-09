import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfileSetupPage from './pages/auth/ProfileSetupPage';
import HomePage from './pages/player/HomePage';
import ClubAdminDashboard from './pages/clubadmin/ClubAdminDashboard';
import CEODashboard from './pages/ceo/CEODashboard';

const AppRouter = () => {
    const { user, loading, needsProfileSetup } = useAuth();
    const [authView, setAuthView] = useState('login');

    // Loading state
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #00A86B 0%, #006b47 100%)'
            }}>
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(255,255,255,0.3)',
                        borderTop: '4px solid #FFD700',
                        borderRadius: '50%',
                        margin: '0 auto 20px',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <h2 style={{ fontSize: '24px', fontWeight: '700' }}>Tennis Booking</h2>
                    <p style={{ fontSize: '14px', opacity: 0.9 }}>Cargando...</p>
                </div>
            </div>
        );
    }

    // Not authenticated
    if (!user) {
        if (authView === 'register') {
            return (
                <RegisterPage
                    onSwitchToLogin={() => setAuthView('login')}
                />
            );
        }
        return (
            <LoginPage
                onSwitchToRegister={() => setAuthView('register')}
            />
        );
    }

    // Needs profile setup
    if (needsProfileSetup) {
        return <ProfileSetupPage />;
    }

    // Authenticated - Route by role
    const role = user.role || 'usuario';

    if (role === 'ceo') {
        return <CEODashboard />;
    }

    if (role === 'club_admin') {
        return <ClubAdminDashboard />;
    }

    // Default: Player
    return <HomePage />;
};

export default AppRouter;