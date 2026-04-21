import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../app/action';

// Import the two Navigators
import AuthNav from './auth';
import MainNav from './MainNav';

export default function AppNav() {
  const [isHydrating, setIsHydrating] = useState(true);
  const dispatch = useDispatch();

  // Live Redux auth state
  const user = useSelector((state: any) => state.auth.user);

  // This checks the phone's storage as soon as the app opens
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const raw = await AsyncStorage.getItem('userToken');
        if (raw) {
          try {
            dispatch(loginSuccess(JSON.parse(raw)));
          } catch {
            // If storage is corrupted, clear it so we don't get stuck authenticated
            await AsyncStorage.removeItem('userToken');
          }
        }
      } catch (error) {
        console.log('Error checking for token:', error);
      } finally {
        setIsHydrating(false);
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  const isAuthenticated = !!user;

  // Show a loading spinner for a split second while checking storage
  if (isHydrating) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <ActivityIndicator size="large" color="#c27100" />
      </View>
    );
  }

  // Gatekeeper
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
}
