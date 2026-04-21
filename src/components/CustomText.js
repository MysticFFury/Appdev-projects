import React from 'react';
import { Text, StyleSheet } from 'react-native';

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

const VARIANTS = {
  title: styles.title,
  label: styles.label,
  body: styles.body,
  error: styles.error,
  link: styles.link,
};

export default function CustomText({
  children,
  variant = 'body',
  style,
  ...rest
}) {
  return (
    <Text style={[VARIANTS[variant] || styles.body, style]} {...rest}>
      {children}
    </Text>
  );
}
