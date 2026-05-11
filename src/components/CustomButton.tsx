import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, radii } from '../theme';

interface CustomButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'danger';
  style?: ViewStyle;
  textStyle?: TextStyle;
  [key: string]: any;
}

export default function CustomButton({
  children,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
  textStyle,
  ...rest
}: CustomButtonProps) {
  const variantStyles =
    variant === 'primary'
      ? { btn: styles.primary, text: styles.textPrimary, spinner: '#FFFFFF' }
      : variant === 'danger'
        ? { btn: styles.danger, text: styles.textDanger, spinner: colors.danger }
        : { btn: styles.outline, text: styles.textOutline, spinner: colors.primary };

  return (
    <TouchableOpacity
      style={[styles.base, variantStyles.btn, (disabled || loading) && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.9}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.spinner} />
      ) : (
        <Text style={[styles.text, variantStyles.text, textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primary: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 5,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  danger: {
    backgroundColor: colors.dangerMutedBg,
    borderWidth: 1,
    borderColor: colors.dangerMutedBorder,
  },
  disabled: {
    opacity: 0.55,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: colors.textMain,
  },
  textDanger: {
    color: colors.danger,
  },
});
