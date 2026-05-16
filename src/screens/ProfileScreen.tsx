import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '../app/action';
import { IMG } from '../utils';
import ScreenBackground from '../components/ScreenBackground';
import { colors, radii, typography } from '../theme';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch(logout());
      Alert.alert('Signed out', 'You have been securely signed out.');
    } catch (error) {
      console.log('Error clearing token:', error);
      Alert.alert('Error', 'There was a problem signing out.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScreenBackground>
        <View style={styles.content}>
          <Text style={styles.brand}>GearGrid</Text>
          <Text style={styles.screenTitle}>Profile</Text>

          <View style={styles.card}>
            <View style={styles.avatarWrap}>
              <Image source={IMG.LOGO} style={styles.avatar} />
            </View>
            <Text style={styles.cardCaption}>Account</Text>
            <Text style={styles.muted}>Manage your profile on the web admin for full details.</Text>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.9}>
              <Text style={styles.logoutText}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgBase,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  brand: {
    ...typography.brandTitle,
    marginBottom: 4,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textMain,
    marginBottom: 22,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 32,
    elevation: 10,
  },
  avatarWrap: {
    padding: 4,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 14,
    backgroundColor: colors.bgInput,
  },
  cardCaption: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textMain,
    marginBottom: 8,
  },
  muted: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  logoutBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.dangerMutedBorder,
    backgroundColor: colors.dangerMutedBg,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.danger,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ProfileScreen;
