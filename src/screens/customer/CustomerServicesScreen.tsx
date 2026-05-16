import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomerPageLayout from '../../components/customer/CustomerPageLayout';
import CustomerPageHero from '../../components/customer/CustomerPageHero';
import { customerStyles } from '../../components/customer/customerStyles';
import { NavigationProps } from '../../types/screen.auth.types';
import { ROUTES } from '../../utils';
import { colors } from '../../theme';

const SERVICES = [
  { title: 'Custom PC Assembly', desc: 'Professional assembly, cable management, and stress testing.' },
  { title: 'Compatibility Checks', desc: 'Expert review before shipping for 100% compatibility.' },
  { title: 'Diagnostics & Repair', desc: 'Deep diagnostics, repair, and thermal repasting.' },
  { title: 'Enterprise Solutions', desc: 'Bulk pricing and dedicated account management.' },
];

export default function CustomerServicesScreen({ navigation }: NavigationProps) {
  return (
    <CustomerPageLayout navigation={navigation} activeRoute={ROUTES.CUSTOMER_SERVICES}>
      <View style={customerStyles.scrollPad}>
        <CustomerPageHero
          kicker="Premium support"
          title="More than hardware"
          lead="From pro assembly to enterprise rollouts — same services as the website."
        />
        {SERVICES.map((s) => (
          <View key={s.title} style={customerStyles.glassCard}>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.desc}>{s.desc}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={customerStyles.primaryCta}
          onPress={() => navigation.navigate(ROUTES.CUSTOMER_CONTACT)}
        >
          <Text style={customerStyles.primaryCtaText}>Contact our experts</Text>
        </TouchableOpacity>
      </View>
    </CustomerPageLayout>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: '700', color: colors.textMain, marginBottom: 8 },
  desc: { fontSize: 15, lineHeight: 22, color: colors.textMuted },
});
