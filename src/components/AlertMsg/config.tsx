import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';
import { colors } from '../../theme';

interface CustomToastProps {
  text1?: string;
  text2?: string;
  borderColor: string;
  glowColor: string;
  icon: string;
}

const CustomToast = ({ text1, text2, borderColor, glowColor, icon }: CustomToastProps) => {
  return (
    <View style={[styles.toastContainer, { borderColor, shadowColor: borderColor }]}>
      <View style={[styles.iconContainer, { backgroundColor: glowColor }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.textContainer}>
        {text1 ? <Text style={styles.title} numberOfLines={1}>{text1}</Text> : null}
        {text2 ? <Text style={styles.message} numberOfLines={2}>{text2}</Text> : null}
      </View>
    </View>
  );
};

const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => (
    <CustomToast
      text1={text1}
      text2={text2}
      borderColor="rgba(74, 222, 128, 0.4)"
      glowColor="rgba(74, 222, 128, 0.15)"
      icon="✅"
    />
  ),
  error: ({ text1, text2 }) => (
    <CustomToast
      text1={text1}
      text2={text2}
      borderColor="rgba(255, 77, 79, 0.4)"
      glowColor="rgba(255, 77, 79, 0.15)"
      icon="❌"
    />
  ),
  info: ({ text1, text2 }) => (
    <CustomToast
      text1={text1}
      text2={text2}
      borderColor="rgba(108, 99, 255, 0.4)"
      glowColor="rgba(108, 99, 255, 0.15)"
      icon="ℹ️"
    />
  ),
  warning: ({ text1, text2 }) => (
    <CustomToast
      text1={text1}
      text2={text2}
      borderColor="rgba(251, 191, 38, 0.4)"
      glowColor="rgba(251, 191, 38, 0.15)"
      icon="⚠️"
    />
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    backgroundColor: 'rgba(15, 22, 38, 0.95)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  message: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});

export default toastConfig;