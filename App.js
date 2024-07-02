import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Navigation } from './src/infrastructure/navigation/index';
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import { theme } from './src/infrastructure/theme';
import { RestaurantsContextProvider } from './src/services/restaurants/restaurants.context';
import { LocationContextProvider } from './src/services/location/location.context';
import { FavoritesContextProvider } from './src/services/favorites/favorites.context';
import { initializeApp } from 'firebase/app';
// import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDDbZaLUx0oLZTJoSzHg71C9zWXNVZFEL8',
  authDomain: 'mealstogo-40434.firebaseapp.com',
  projectId: 'mealstogo-40434',
  storageBucket: 'mealstogo-40434.appspot.com',
  messagingSenderId: '122276154260',
  appId: '1:122276154260:web:d906b71796cd8e5b801d81',
};

initializeApp(firebaseConfig);

export default function App() {
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      signInWithEmailAndPassword(auth, 'a@a.com', 'test123')
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setIsAuthenticated(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log('error code', errorCode);
          const errorMessage = error.message;
          console.log('error message', errorMessage);
        });
    }, 2000);
  }, []);

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <AuthenticationContextProvider> */}
        <FavoritesContextProvider>
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <Navigation />
            </RestaurantsContextProvider>
          </LocationContextProvider>
        </FavoritesContextProvider>
        {/* </AuthenticationContextProvider> */}
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
