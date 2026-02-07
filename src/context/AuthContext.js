import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Credenciales CEO hardcodeadas
const CEO_CREDENTIALS = {
    email: 'ceo@tennisbooking.com',
    password: 'ceo2025',
    user: {
        id: 'ceo_001',
        email: 'ceo@tennisbooking.com',
        name: 'CEO Tennis Booking',
        provider: 'email',
        role: 'ceo',
        emailVerified: true,
        createdAt: '2024-01-01T00:00:00',
        profile: { isProfileComplete: true }
    }
};

// Mock de usuarios registrados (simula la base de datos)
const MOCK_USERS_DB = [
    {
        id: 'player_001',
        email: 'jugador@test.com',
        password: '123456',
        name: 'Juan Pérez',
        provider: 'email',
        role: 'player',
        emailVerified: true,
        createdAt: '2024-06-01T00:00:00',
        profile: {
            gender: 'male',
            age: 28,
            dominantHand: 'right',
            playStyle: 'singles',
            courtPreference: 'clay',
            skillLevel: 'intermediate',
            isProfileComplete: true
        }
    },
    {
        id: 'club_001',
        email: 'club@test.com',
        password: '123456',
        name: 'Club River Plate',
        provider: 'email',
        role: 'club_admin',
        emailVerified: true,
        createdAt: '2024-06-01T00:00:00',
        profile: { isProfileComplete: true }
    }
];

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mockUsersDB, setMockUsersDB] = useState(MOCK_USERS_DB);

    useEffect(() => {
        checkAuthState();
    }, []);

    const checkAuthState = () => {
        try {
            const savedUser = localStorage.getItem('tennis_user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error('Error al verificar autenticación:', error);
        } finally {
            setLoading(false);
        }
    };

    // ==================== REGISTRO CON EMAIL ====================
    const registerWithEmail = async (name, email, password, role = 'player') => {
        try {
            // TODO: Llamada real a API Java POST /api/auth/register
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Verificar si el email ya existe
            const existingUser = mockUsersDB.find(u => u.email === email);
            if (existingUser) {
                return { success: false, error: 'Este email ya está registrado' };
            }

            const newUser = {
                id: role + '_' + Date.now(),
                email: email,
                name: name,
                password: password, // En producción esto se hashea en el backend
                provider: 'email',
                role: role,
                emailVerified: true, // Auto-verificar en desarrollo
                createdAt: new Date().toISOString(),
                profile: null // Pendiente de completar
            };

            // Agregar a la "base de datos" mock
            setMockUsersDB(prev => [...prev, newUser]);

            // Auto-login después de registrarse
            const userForState = { ...newUser };
            delete userForState.password;
            localStorage.setItem('tennis_user', JSON.stringify(userForState));
            setUser(userForState);

            console.log('✅ Registro exitoso como:', role);
            console.log('📧 Email:', email);

            return { success: true, user: userForState };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ==================== LOGIN CON EMAIL ====================
    // El rol NO se elige acá, viene de la DB según el email
    const loginWithEmail = async (email, password) => {
        try {
            // TODO: Llamada real a API Java POST /api/auth/login
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Verificar si es CEO
            if (email === CEO_CREDENTIALS.email && password === CEO_CREDENTIALS.password) {
                const ceoUser = { ...CEO_CREDENTIALS.user };
                localStorage.setItem('tennis_user', JSON.stringify(ceoUser));
                setUser(ceoUser);
                console.log('✅ Login CEO exitoso');
                return { success: true, user: ceoUser };
            }

            // Buscar en la "base de datos" mock
            const foundUser = mockUsersDB.find(u => u.email === email);

            if (!foundUser) {
                return { success: false, error: 'Email no registrado. ¿Querés crear una cuenta?' };
            }

            if (foundUser.password !== password) {
                return { success: false, error: 'Contraseña incorrecta' };
            }

            if (!foundUser.emailVerified) {
                return {
                    success: false,
                    error: 'Email no verificado',
                    needsVerification: true,
                    email: email
                };
            }

            // Login exitoso - el ROL viene de la DB, no del login
            const loggedUser = { ...foundUser };
            delete loggedUser.password;
            localStorage.setItem('tennis_user', JSON.stringify(loggedUser));
            setUser(loggedUser);

            console.log('✅ Login exitoso como:', loggedUser.role);
            return { success: true, user: loggedUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ==================== LOGIN CON GOOGLE ====================
    // En un login real, Google devuelve el email y buscamos en la DB
    const loginWithGoogle = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simular: el usuario Google ya está registrado como player
            const mockUser = {
                id: 'google_' + Date.now(),
                email: 'usuario@gmail.com',
                name: 'Usuario Google',
                avatar: 'https://i.pravatar.cc/150?img=12',
                provider: 'google',
                role: 'player', // En producción se busca en la DB
                emailVerified: true,
                createdAt: new Date().toISOString(),
                profile: null
            };

            localStorage.setItem('tennis_user', JSON.stringify(mockUser));
            setUser(mockUser);

            return { success: true, user: mockUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ==================== LOGIN CON FACEBOOK ====================
    const loginWithFacebook = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const mockUser = {
                id: 'fb_' + Date.now(),
                email: 'usuario@facebook.com',
                name: 'Usuario Facebook',
                avatar: 'https://i.pravatar.cc/150?img=8',
                provider: 'facebook',
                role: 'player',
                emailVerified: true,
                createdAt: new Date().toISOString(),
                profile: null
            };

            localStorage.setItem('tennis_user', JSON.stringify(mockUser));
            setUser(mockUser);

            return { success: true, user: mockUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ==================== VERIFICAR EMAIL ====================
    const verifyEmail = async (token) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            // TODO: Implementar verificación real
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ==================== REENVIAR EMAIL DE VERIFICACIÓN ====================
    const resendVerificationEmail = async (email) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('📧 Email de verificación reenviado a:', email);
            return { success: true, message: 'Email reenviado exitosamente' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ==================== COMPLETAR PERFIL ====================
    const completeProfile = async (profileData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedUser = {
                ...user,
                profile: {
                    gender: profileData.gender,
                    age: profileData.age,
                    dominantHand: profileData.dominantHand,
                    playStyle: profileData.playStyle,
                    courtPreference: profileData.courtPreference,
                    skillLevel: profileData.skillLevel,
                    bio: profileData.bio || '',
                    location: profileData.location || '',
                    stats: {
                        matchesPlayed: 0,
                        matchesWon: 0,
                        winRate: 0,
                        currentStreak: 0,
                        longestStreak: 0,
                        ranking: 1000,
                        points: 0
                    },
                    profileCompletedAt: new Date().toISOString(),
                    isProfileComplete: true
                }
            };

            localStorage.setItem('tennis_user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            return { success: true, user: updatedUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ==================== COMPLETAR PERFIL CLUB ====================
    const completeClubProfile = async (clubData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedUser = {
                ...user,
                name: clubData.clubName || user.name,
                profile: {
                    clubName: clubData.clubName,
                    address: clubData.address,
                    phone: clubData.phone,
                    courts: clubData.courts || [],
                    profileCompletedAt: new Date().toISOString(),
                    isProfileComplete: true
                }
            };

            localStorage.setItem('tennis_user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            return { success: true, user: updatedUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ==================== ACTUALIZAR PERFIL ====================
    const updateProfile = async (updates) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const updatedUser = {
                ...user,
                profile: { ...user.profile, ...updates }
            };

            localStorage.setItem('tennis_user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            return { success: true, user: updatedUser };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ==================== ACTUALIZAR AVATAR ====================
    const updateAvatar = async (avatarUrl) => {
        try {
            const updatedUser = { ...user, avatar: avatarUrl };
            localStorage.setItem('tennis_user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // ==================== LOGOUT ====================
    const logout = () => {
        localStorage.removeItem('tennis_user');
        sessionStorage.removeItem('pending_verification_user');
        setUser(null);
    };

    const value = {
        user,
        loading,
        // Auth
        registerWithEmail,
        loginWithEmail,
        verifyEmail,
        resendVerificationEmail,
        // OAuth
        loginWithGoogle,
        loginWithFacebook,
        // Profile
        completeProfile,
        completeClubProfile,
        updateProfile,
        updateAvatar,
        // Logout
        logout,
        // States
        isAuthenticated: !!user,
        userRole: user?.role || null,
        needsProfileSetup: user ? !user.profile?.isProfileComplete : false,
        hasCompletedProfile: user?.profile?.isProfileComplete || false,
        isEmailVerified: user?.emailVerified || false
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};