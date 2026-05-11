import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors } from '../theme';

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textMain,
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '700',
    letterSpacing: 1,
  },
  body: {
    fontSize: 16,
    color: colors.textMain,
  },
  error: {
    fontSize: 13,
    color: colors.danger,
    textAlign: 'center',
    fontWeight: '600',
  },
  link: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
  },
});

const VARIANTS: { [key: string]: TextStyle } = {
  title: styles.title,
  label: styles.label,
  body: styles.body,
  error: styles.error,
  link: styles.link,
};

interface CustomTextProps {
  children: React.ReactNode;
  variant?: 'title' | 'label' | 'body' | 'error' | 'link';
  style?: TextStyle;
  [key: string]: any;
}

export default function CustomText({
  children,
  variant = 'body',
  style,
  ...rest
}: CustomTextProps) {
  return (
    <Text style={[VARIANTS[variant] || styles.body, style]} {...rest}>
      {children}
    </Text>
  );
}
