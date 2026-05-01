import React from 'react';
import { Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  label: {
    fontSize: 11,
    color: '#8F95A0', 
    fontWeight: '700',
    letterSpacing: 1,
  },
  body: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  error: {
    fontSize: 13,
    color: '#FF6B00',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: '#FF6B00',
    fontWeight: 'bold',
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
