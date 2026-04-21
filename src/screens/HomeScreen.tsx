import React from 'react';
import ListedCom from '../components/listedcom';
import { Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logout } from '../app/action';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (e) {
      console.log('Failed to remove token on logout:', e);
    }
    dispatch(logout());
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0A0C10',
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#FFFFFF',
          marginBottom: 24,
        }}
      >
        Home Page
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          paddingVertical: 14,
          paddingHorizontal: 32,
          backgroundColor: '#FF6B00',
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 16, color: 'white', fontWeight: '600' }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
