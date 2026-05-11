import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function ScreenBackground({ children, style }: Props) {
  return (
    <View style={[styles.root, style]}>
      <View style={styles.glowPurple} pointerEvents="none" />
      <View style={styles.glowPink} pointerEvents="none" />
      <View style={styles.inner}>{children}</View>
    </View>
  );
}

const GLOW_SIZE = 340;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bgBase,
    overflow: 'hidden',
  },
  glowPurple: {
    position: 'absolute',
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    borderRadius: GLOW_SIZE / 2,
    backgroundColor: colors.primary,
    opacity: 0.14,
    top: -80,
    left: -100,
  },
  glowPink: {
    position: 'absolute',
    width: GLOW_SIZE * 0.85,
    height: GLOW_SIZE * 0.85,
    borderRadius: (GLOW_SIZE * 0.85) / 2,
    backgroundColor: colors.secondary,
    opacity: 0.1,
    bottom: -40,
    right: -90,
  },
  inner: {
    flex: 1,
  },
});
