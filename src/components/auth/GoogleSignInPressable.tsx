import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';
import { signInWithGoogle } from '../../utils/firebase';
import { colors, radii } from '../../theme';

type Props = {
  disabled?: boolean;
  onSuccess?: (result: { email: string; idToken: string }) => void;
};

export default function GoogleSignInPressable({ disabled, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (loading || disabled) return;
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.ok) {
        onSuccess?.({ email: result.email, idToken: result.idToken });
        Alert.alert('Success', `Signed in with Google as ${result.email}`);
        return;
      }
      if (result.cancelled) {
        return;
      }
      Alert.alert('Google sign in', result.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, (disabled || loading) && styles.buttonDisabled]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={colors.textMain} />
      ) : (
        <View style={styles.row}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconG}>G</Text>
          </View>
          <Text style={styles.label}>Continue with Google</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 48,
    borderRadius: radii.sm,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dadce0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconG: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4285F4',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f1f1f',
  },
});
