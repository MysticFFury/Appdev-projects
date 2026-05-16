import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../app/action';
import { NavigationProps } from '../../types/screen.auth.types';
import ScreenBackground from '../../components/ScreenBackground';
import { colors, radii, typography } from '../../theme';
import { ROUTES } from '../../utils';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { signInWithGoogle } from '../../utils/firebase';

export default function Login({ navigation }: NavigationProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: any) => state.auth);

  const handleLogin = () => {
    if (email && password) {
      console.log('email', email);
      console.log('password', password);
      dispatch(userLogin({ username: email, password }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScreenBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.headerContainer}>
            <View style={styles.accentBar} />
            <Text style={styles.brandMark}>GearGrid</Text>
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.subHeader}>Sign in to continue</Text>
          </View>

          <View style={styles.card}>
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.field}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <TextInput
                style={styles.input}
                placeholder="user@geargrid.com"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                editable={!isLoading}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.9}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>Sign in</Text>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <Text style={styles.dividerText}>or</Text>
            </View>

            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={async () => {
                const result = await signInWithGoogle();
                if (result?.userInfo) {
                  console.log(result);
                  Alert.alert('Success', 'Google sign in successful');
                } else if (result?.message) {
                  Alert.alert('Error', result.message);
                }
              }}
              disabled={isLoading}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>New to GearGrid? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.REGISTER)}
                disabled={isLoading}
              >
                <Text style={styles.linkText}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScreenBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgBase,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 28,
  },
  accentBar: {
    width: 48,
    height: 4,
    backgroundColor: colors.primary,
    marginBottom: 14,
    borderRadius: 2,
  },
  brandMark: {
    ...typography.brandTitle,
    marginBottom: 8,
  },
  headerTitle: {
    ...typography.screenTitle,
    marginBottom: 6,
  },
  subHeader: {
    fontSize: 14,
    color: colors.textMuted,
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: colors.bgCard,
    padding: 24,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 12,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    ...typography.label,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.bgInput,
    color: colors.textMain,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: radii.sm,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  divider: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerText: {
    color: colors.textMuted,
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
    flexWrap: 'wrap',
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 15,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },
  errorBox: {
    backgroundColor: colors.dangerMutedBg,
    padding: 12,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.dangerMutedBorder,
    marginBottom: 18,
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
  },
});
