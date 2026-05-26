import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, radii } from '../../theme';
import { ROUTES, IMG } from '../../utils';

type Props = {
  navigation: { navigate: (route: string) => void };
};

export default function CustomerFooter({ navigation }: Props) {
  const navigateTo = (route: string) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {/* Brand Section */}
      <View style={styles.brandRow}>
        <View style={styles.logoWrap}>
          <Image source={IMG.LOGO} style={styles.logoImg} />
        </View>
        <Text style={styles.brandText}>GearGrid</Text>
      </View>
      <Text style={styles.description}>
        Your one-stop platform for premium PC hardware. Built by enthusiasts, for builders.
      </Text>

      {/* Navigation Links Grid */}
      <View style={styles.linksGrid}>
        <View style={styles.col}>
          <Text style={styles.colTitle}>NAVIGATE</Text>
          <TouchableOpacity onPress={() => navigateTo(ROUTES.CUSTOMER_LANDING)} style={styles.linkBtn}>
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo(ROUTES.CUSTOMER_PRODUCTS)} style={styles.linkBtn}>
            <Text style={styles.linkText}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo(ROUTES.CUSTOMER_PC_BUILDER)} style={styles.linkBtn}>
            <Text style={styles.linkText}>PC Builder</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo(ROUTES.CUSTOMER_SERVICES)} style={styles.linkBtn}>
            <Text style={styles.linkText}>Services</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.col}>
          <Text style={styles.colTitle}>SUPPORT</Text>
          <TouchableOpacity style={styles.linkBtn}>
            <Text style={styles.linkText}>Track Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkBtn}>
            <Text style={styles.linkText}>Returns</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkBtn}>
            <Text style={styles.linkText}>Warranty</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkBtn}>
            <Text style={styles.linkText}>FAQs</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.colTitle}>CONTACT</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactIcon}>📍</Text>
          <Text style={styles.contactText}>San Miguel Bacong Neg. Or</Text>
        </View>
        <View style={styles.contactRow}>
          <Text style={styles.contactIcon}>📞</Text>
          <Text style={styles.contactText}>+1 (555) 123-4567</Text>
        </View>
        <View style={styles.contactRow}>
          <Text style={styles.contactIcon}>✉️</Text>
          <Text style={styles.contactText}>support@geargrid.com</Text>
        </View>
        <View style={styles.contactRow}>
          <Text style={styles.statusDot}>●</Text>
          <Text style={styles.statusText}>Open Mon–Sat, 9am–6pm</Text>
        </View>
      </View>

      {/* Social Media Row */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialIconBtn}><Text style={styles.socialIcon}>📘</Text></TouchableOpacity>
        <TouchableOpacity style={styles.socialIconBtn}><Text style={styles.socialIcon}>🐦</Text></TouchableOpacity>
        <TouchableOpacity style={styles.socialIconBtn}><Text style={styles.socialIcon}>📷</Text></TouchableOpacity>
        <TouchableOpacity style={styles.socialIconBtn}><Text style={styles.socialIcon}>🎥</Text></TouchableOpacity>
      </View>

      {/* Copyright Bottom */}
      <View style={styles.bottomBar}>
        <Text style={styles.copyText}>© 2026 GearGrid. All rights reserved.</Text>
        <View style={styles.legalLinks}>
          <Text style={styles.legalLink}>Privacy</Text>
          <Text style={styles.legalDot}>·</Text>
          <Text style={styles.legalLink}>Terms</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(15, 22, 38, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.09)',
    borderRadius: radii.lg,
    padding: 24,
    marginTop: 40,
    marginBottom: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoWrap: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    marginRight: 10,
  },
  logoImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  brandText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  description: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 24,
  },
  linksGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  col: {
    width: '46%',
  },
  colTitle: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  linkBtn: {
    paddingVertical: 6,
  },
  linkText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  contactSection: {
    marginBottom: 24,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIcon: {
    fontSize: 14,
    width: 24,
    color: colors.primary,
  },
  contactText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  statusDot: {
    color: '#4ade80',
    fontSize: 10,
    width: 24,
    textAlign: 'center',
    marginLeft: -2,
  },
  statusText: {
    color: '#4ade80',
    fontSize: 13,
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  socialIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  copyText: {
    color: '#64748b',
    fontSize: 12,
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legalLink: {
    color: '#64748b',
    fontSize: 12,
  },
  legalDot: {
    color: '#64748b',
    marginHorizontal: 6,
  },
});
