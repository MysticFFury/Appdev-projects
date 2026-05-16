import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
} from 'react-native';
import CustomerPageLayout from '../../components/customer/CustomerPageLayout';
import { customerStyles } from '../../components/customer/customerStyles';
import { NavigationProps } from '../../types/screen.auth.types';
import { ROUTES, IMG } from '../../utils';
import { colors, radii } from '../../theme';

const STATS = [
  { value: '12K+', label: 'Products Sold' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '4.9★', label: 'Avg Rating' },
  { value: '24/7', label: 'Expert Support' },
];

const FEATURES = [
  { title: 'Smart Catalog', body: 'Find the exact components you need for your next build.' },
  { title: 'Quick Orders', body: 'Streamlined checkout gets your gear secured in seconds.' },
  { title: 'Activity Dashboard', body: 'Monitor your order history from one panel.' },
];

export default function CustomerLandingScreen({ navigation }: NavigationProps) {
  const [splashVisible, setSplashVisible] = useState(true);
  const splashOpacity = useState(() => new Animated.Value(1))[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(splashOpacity, { toValue: 0, duration: 600, useNativeDriver: true }).start(
        () => setSplashVisible(false),
      );
    }, 1200);
    return () => clearTimeout(timer);
  }, [splashOpacity]);

  return (
    <>
      {splashVisible && (
        <Animated.View style={[styles.splash, { opacity: splashOpacity }]} pointerEvents="none">
          <ActivityIndicator size="large" color={colors.primary} />
          <Image source={IMG.LOGO} style={styles.splashLogo} resizeMode="contain" />
          <Text style={styles.splashBrand}>GEARGRID</Text>
        </Animated.View>
      )}
      <CustomerPageLayout navigation={navigation} activeRoute={ROUTES.CUSTOMER_LANDING}>
        <View style={customerStyles.scrollPad}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Next-Gen Hardware Platform</Text>
          </View>
          <Text style={styles.heroTitle}>Equip Your Setup.{'\n'}Manage Your Gear.</Text>
          <Text style={styles.heroSubtitle}>
            Browse top-tier components, track orders, and keep your workflow organized.
          </Text>
          <TouchableOpacity
            style={styles.cta}
            onPress={() => navigation.navigate(ROUTES.CUSTOMER_PRODUCTS)}
            activeOpacity={0.9}
          >
            <Text style={styles.ctaText}>Shop products</Text>
          </TouchableOpacity>
          <View style={styles.statsStrip}>
            {STATS.map((s) => (
              <View key={s.label} style={styles.stat}>
                <Text style={styles.statNum}>{s.value}</Text>
                <Text style={styles.statLbl}>{s.label}</Text>
              </View>
            ))}
          </View>
          <Text style={customerStyles.sectionTitle}>Core Features</Text>
          {FEATURES.map((f) => (
            <View key={f.title} style={customerStyles.glassCard}>
              <Text style={styles.cardTitle}>{f.title}</Text>
              <Text style={styles.cardBody}>{f.body}</Text>
            </View>
          ))}
          <View style={styles.quickLinks}>
            {[
              { label: 'Products', route: ROUTES.CUSTOMER_PRODUCTS },
              { label: 'PC Builder', route: ROUTES.CUSTOMER_PC_BUILDER },
              { label: 'Services', route: ROUTES.CUSTOMER_SERVICES },
              { label: 'Contact', route: ROUTES.CUSTOMER_CONTACT },
            ].map((link) => (
              <TouchableOpacity
                key={link.route}
                style={styles.quickLink}
                onPress={() => navigation.navigate(link.route)}
              >
                <Text style={styles.quickLinkText}>{link.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </CustomerPageLayout>
    </>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 30,
    backgroundColor: colors.bgBase,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  splashLogo: { width: 56, height: 56, borderRadius: 12 },
  splashBrand: { fontSize: 22, fontWeight: '700', letterSpacing: 2, color: colors.textMain },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.35)',
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 14,
  },
  heroBadgeText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  heroTitle: { fontSize: 32, fontWeight: '800', color: colors.textMain, lineHeight: 38, marginBottom: 12 },
  heroSubtitle: { fontSize: 16, lineHeight: 24, color: colors.textMuted, marginBottom: 20 },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  statsStrip: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  stat: {
    width: '47%',
    backgroundColor: colors.bgCard,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: 14,
  },
  statNum: { color: colors.textMain, fontSize: 20, fontWeight: '800' },
  statLbl: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: colors.textMain, marginBottom: 6 },
  cardBody: { fontSize: 14, lineHeight: 20, color: colors.textMuted },
  quickLinks: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  quickLink: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: colors.bgCard,
  },
  quickLinkText: { color: colors.primary, fontWeight: '700' },
});
