import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomerPageLayout from '../../components/customer/CustomerPageLayout';
import CustomerPageHero from '../../components/customer/CustomerPageHero';
import { customerStyles } from '../../components/customer/customerStyles';
import { NavigationProps } from '../../types/screen.auth.types';
import { ROUTES } from '../../utils';
import { colors, radii } from '../../theme';

export default function CustomerAboutScreen({ navigation }: NavigationProps) {
  return (
    <CustomerPageLayout navigation={navigation} activeRoute={ROUTES.CUSTOMER_ABOUT}>
      <View style={customerStyles.scrollPad}>
        <CustomerPageHero
          kicker="About GearGrid"
          title="Driven by performance"
          lead="A passionate team of hardware enthusiasts powering your next build."
        />
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
          }}
          style={styles.banner}
        />
        <View style={customerStyles.glassCard}>
          <Text style={styles.body}>
            Founded to make premium computer hardware accessible and easy to manage. Whether your first
            gaming PC or an enterprise rollout, we provide the gear and support you need.
          </Text>
        </View>
      </View>
    </CustomerPageLayout>
  );
}

const styles = StyleSheet.create({
  banner: { width: '100%', height: 180, borderRadius: radii.lg, marginBottom: 16 },
  body: { fontSize: 15, lineHeight: 24, color: colors.textMuted },
});
