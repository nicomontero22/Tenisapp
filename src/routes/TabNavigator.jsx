import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; // Importamos íconos

// Importamos el stack que creamos y las otras pantallas directas
import HomeStack from './HomeStack';
import SearchScreen from '../pages/player/SearchScreen'; // Crea estos archivos básicos
import ReservationsScreen from '../pages/player/ReservationsScreen';
import WalletScreen from '../pages/player/WalletScreen';
import ProfileScreen from '../pages/player/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // Ocultamos el header del tab navigator
                tabBarActiveTintColor: '#00A650', // Color verde de tu diseño para el ícono activo
                tabBarInactiveTintColor: 'gray', // Color para el ícono inactivo
                tabBarStyle: {
                    paddingBottom: 5,
                    height: 60, // Un poco más alto para que se vea bien
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'InicioTab') {
                        iconName = focused ? 'home' : 'home-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Buscar') {
                        iconName = focused ? 'search' : 'search-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Reservas') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Billetera') {
                        iconName = focused ? 'wallet' : 'wallet-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'person' : 'person-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                },
            })}
        >
            {/* Pestaña Inicio: Usamos el Stack que creamos antes */}
            <Tab.Screen
                name="InicioTab"
                component={HomeStack}
                options={{ tabBarLabel: 'Inicio' }}
            />
            <Tab.Screen name="Buscar" component={SearchScreen} />
            <Tab.Screen name="Reservas" component={ReservationsScreen} />
            <Tab.Screen name="Billetera" component={WalletScreen} />
            <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;