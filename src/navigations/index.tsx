import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '../utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../app/action';
import AuthNav from './auth';
import MainNav from './MainNav';
import CustomerNav from './CustomerNav';
import { isCustomerUser } from '../utils/authRoles';
import { colors } from '../theme';

export default function AppNav() {
  const [isHydrating, setIsHydrating] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const raw = await AsyncStorage.getItem('userToken');
        if (raw) {
          try {
            dispatch(loginSuccess(JSON.parse(raw)));
          } catch {
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

  if (isHydrating) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.bgBase,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const renderMain = () => {
    if (!user) return <AuthNav />;
    if (isCustomerUser(user)) return <CustomerNav />;
    return <MainNav />;
  };

  return <NavigationContainer>{renderMain()}</NavigationContainer>;
}
