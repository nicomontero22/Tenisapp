import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importa tus pantallas. Por ahora usaremos "placeholders" si no las tienes creadas.
// Asegúrate de crear estos archivos en src/pages/player/
import HomeScreen from '../pages/player/HomeScreen';
import ClubDetailsScreen from '../pages/player/ClubDetailsScreen'; // Esta sería la pantalla de reservar cancha

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Ocultamos el header por defecto para usar el nuestro personalizado
            }}
        >
            {/* La primera pantalla que se muestra en este stack */}
            <Stack.Screen name="Home" component={HomeScreen} />

            {/* Pantalla de detalle a la que se navega (ej. al tocar un club) */}
            <Stack.Screen
                name="ClubDetails"
                component={ClubDetailsScreen}
                options={{
                    headerShown: true, // Mostramos header aquí para tener la flecha de volver atrás
                    title: 'Reservar cancha', // Título como en tu diseño
                    headerBackTitleVisible: false, // Oculta el texto "Atrás" en iOS
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;