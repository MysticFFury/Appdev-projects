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
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../app/action';
import { NavigationProps } from '../../types/screen.auth.types';

export default function Login({ navigation }: NavigationProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: any) => state.auth);

  const handleLogin = () => {
    if (email && password) {
      console.log('email', email);
      console.log('password', password);
      // We pass the email string into the 'username' key because
      // Symfony's json_login expects the identifier to be named 'username' by default.
      dispatch(userLogin({ username: email, password }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.headerContainer}>
          <View style={styles.accentLine} />
          <Text style={styles.headerTitle}>Welcome Back</Text>
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
              placeholderTextColor="#555C6A"
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
              placeholderTextColor="#555C6A"
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
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.primaryButtonText}>AUTHENTICATE</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New to the grid? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={isLoading}>
              <Text style={styles.linkText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0A0C10' },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  headerContainer: { marginBottom: 32 },
  accentLine: { width: 40, height: 4, backgroundColor: '#FF6B00', marginBottom: 16, borderRadius: 2 },
  headerTitle: { fontSize: 36, fontWeight: '900', color: '#FFFFFF', letterSpacing: 1, marginBottom: 8 },
  subHeader: { fontSize: 14, color: '#8F95A0', letterSpacing: 2, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  card: { backgroundColor: '#161922', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#232836', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 8 },
  field: { marginBottom: 20 },
  label: { fontSize: 11, color: '#8F95A0', marginBottom: 8, fontWeight: '700', letterSpacing: 1 },
  input: { backgroundColor: '#0A0C10', color: '#FFFFFF', padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#232836', fontSize: 16 },
  primaryButton: { backgroundColor: '#FF6B00', padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10, shadowColor: '#FF6B00', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  footerText: { color: '#8F95A0' },
  linkText: { color: '#FF6B00', fontWeight: 'bold' },
  errorBox: { backgroundColor: 'rgba(255, 0, 0, 0.1)', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: 'red', marginBottom: 20 },
  errorText: { color: '#FF6B00', fontSize: 13, textAlign: 'center', fontWeight: 'bold' }
});
