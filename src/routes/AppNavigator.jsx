import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';

const AppNavigator = () => {
    // Aquí más adelante podrías tener una lógica para mostrar un 
    // AuthNavigator (Login/Registro) si el usuario no está autenticado.
    // Por ahora, mostramos directamente la app principal.
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
};

export default AppNavigator;