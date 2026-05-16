import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ROUTES, IMG } from '../../utils';
import { colors, radii } from '../../theme';

const NAV_ITEMS = [
  { route: ROUTES.CUSTOMER_LANDING, label: 'Home' },
  { route: ROUTES.CUSTOMER_PRODUCTS, label: 'Products' },
  { route: ROUTES.CUSTOMER_PC_BUILDER, label: 'PC Builder' },
  { route: ROUTES.CUSTOMER_SERVICES, label: 'Services' },
  { route: ROUTES.CUSTOMER_ABOUT, label: 'About' },
  { route: ROUTES.CUSTOMER_CONTACT, label: 'Contact' },
];

type Props = {
  navigation: NavigationProp<ParamListBase>;
  activeRoute: string;
};

export default function CustomerTopNav({ navigation, activeRoute }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.brand}
          onPress={() => navigation.navigate(ROUTES.CUSTOMER_LANDING)}
          activeOpacity={0.85}
        >
          <Image source={IMG.LOGO} style={styles.logo} resizeMode="contain" />
          <Text style={styles.brandText}>
            <Text style={styles.brandLight}>Gear</Text>
            <Text style={styles.brandAccent}>Grid</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cta}
          onPress={() => navigation.navigate(ROUTES.CUSTOMER_PRODUCTS)}
          activeOpacity={0.9}
        >
          <Text style={styles.ctaText}>Shop</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navScroll}>
        {NAV_ITEMS.map((item) => {
          const active = activeRoute === item.route;
          return (
            <TouchableOpacity
              key={item.route}
              style={[styles.navLink, active && styles.navLinkActive]}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.85}
            >
              <Text style={[styles.navLinkText, active && styles.navLinkTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={[styles.navLink, activeRoute === ROUTES.CUSTOMER_CART && styles.navLinkActive]}
          onPress={() => navigation.navigate(ROUTES.CUSTOMER_CART)}
        >
          <Text style={[styles.navLinkText, activeRoute === ROUTES.CUSTOMER_CART && styles.navLinkTextActive]}>
            Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navLink, activeRoute === ROUTES.PROFILE && styles.navLinkActive]}
          onPress={() => navigation.navigate(ROUTES.PROFILE)}
        >
          <Text style={[styles.navLinkText, activeRoute === ROUTES.PROFILE && styles.navLinkTextActive]}>
            Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(108, 99, 255, 0.14)',
    backgroundColor: 'rgba(11, 17, 32, 0.95)',
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  logo: { width: 34, height: 34, borderRadius: 10 },
  brandText: { fontSize: 20, fontWeight: '700' },
  brandLight: { color: colors.textMain },
  brandAccent: { color: colors.primary },
  cta: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.sm,
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  navScroll: { paddingHorizontal: 12, gap: 6, flexDirection: 'row' },
  navLink: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  navLinkActive: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    borderColor: 'rgba(108, 99, 255, 0.32)',
  },
  navLinkText: { color: colors.textMuted, fontWeight: '500', fontSize: 13 },
  navLinkTextActive: { color: '#e0e7ff', fontWeight: '600' },
});
