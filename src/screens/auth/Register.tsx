import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationProps } from '../../types/screen.auth.types';
import ScreenBackground from '../../components/ScreenBackground';
import { colors, radii, typography } from '../../theme';

export default function Register({ navigation }: NavigationProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('Registering:', name);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScreenBackground>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
              <View style={styles.accentBar} />
              <Text style={styles.brandMark}>GearGrid</Text>
              <Text style={styles.headerTitle}>Create account</Text>
              <Text style={styles.subHeader}>Join the grid in a few steps</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.field}>
                <Text style={styles.label}>FULL NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor={colors.placeholder}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>EMAIL ADDRESS</Text>
                <TextInput
                  style={styles.input}
                  placeholder="user@geargrid.com"
                  placeholderTextColor={colors.placeholder}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
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
                />
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={handleRegister} activeOpacity={0.9}>
                <Text style={styles.primaryButtonText}>Create account</Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.linkText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    paddingVertical: 32,
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
});
