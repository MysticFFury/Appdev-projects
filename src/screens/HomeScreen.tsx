import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import AsyncStorage from '../utils/storage';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '../app/action';
import ScreenBackground from '../components/ScreenBackground';
import { ROUTES } from '../utils';
import { NavigationProps } from '../types/screen.auth.types';
import { colors, radii, typography } from '../theme';

const HomeScreen = ({ navigation }: NavigationProps) => {
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScreenBackground>
        <View style={styles.content}>
          <Text style={styles.brand}>GearGrid</Text>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.subtitle}>You’re signed in. More screens can mirror your web dashboard here.</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Quick actions</Text>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => navigation.navigate(ROUTES.PROFILE)}
              activeOpacity={0.9}
            >
              <Text style={styles.secondaryBtnText}>My profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn} onPress={handleLogout} activeOpacity={0.9}>
              <Text style={styles.primaryBtnText}>Sign out</Text>
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
    paddingBottom: 24,
  },
  brand: {
    ...typography.brandTitle,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textMain,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 22,
    marginBottom: 28,
  },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 32,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textMain,
    letterSpacing: 0.3,
    marginBottom: 16,
  },
  secondaryBtn: {
    paddingVertical: 14,
    borderRadius: radii.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    marginBottom: 12,
  },
  secondaryBtnText: {
    color: colors.textMain,
    fontSize: 16,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radii.sm,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 5,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default HomeScreen;
