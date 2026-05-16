import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomerPageLayout from '../../components/customer/CustomerPageLayout';
import CustomerPageHero from '../../components/customer/CustomerPageHero';
import { customerStyles } from '../../components/customer/customerStyles';
import { NavigationProps } from '../../types/screen.auth.types';
import { ROUTES } from '../../utils';
import { loadCart, saveCart } from '../../utils/cart';
import { CartLine } from '../../types/product.types';
import { colors, radii } from '../../theme';

export default function CustomerCartScreen({ navigation }: NavigationProps) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadCart().then(setLines);
    }, []),
  );

  const total = lines.reduce((s, l) => s + l.priceNum * l.qty, 0);

  const changeQty = async (id: number, delta: number) => {
    const next = lines
      .map((l) => (l.productId === id ? { ...l, qty: l.qty + delta } : l))
      .filter((l) => l.qty > 0);
    await saveCart(next);
    setLines(next);
  };

  return (
    <CustomerPageLayout navigation={navigation} activeRoute={ROUTES.CUSTOMER_CART}>
      <View style={customerStyles.scrollPad}>
        <CustomerPageHero kicker="Your cart" title="Shopping cart" lead="Items from the catalog." />
        {lines.length === 0 ? (
          <Text style={styles.empty}>Your cart is empty.</Text>
        ) : (
          lines.map((line) => (
            <View key={line.productId} style={customerStyles.glassCard}>
              <Text style={styles.name}>{line.name}</Text>
              <Text style={styles.price}>{line.price}</Text>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => changeQty(line.productId, -1)}>
                  <Text style={styles.qtyBtn}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qty}>{line.qty}</Text>
                <TouchableOpacity onPress={() => changeQty(line.productId, 1)}>
                  <Text style={styles.qtyBtn}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        {lines.length > 0 && (
          <>
            <Text style={styles.total}>Total: ₱{total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.shop}
              onPress={() => navigation.navigate(ROUTES.CUSTOMER_PRODUCTS)}
            >
              <Text style={styles.shopText}>Continue shopping</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </CustomerPageLayout>
  );
}

const styles = StyleSheet.create({
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: 20 },
  name: { fontSize: 16, fontWeight: '700', color: colors.textMain },
  price: { color: colors.textMuted, marginVertical: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 8 },
  qtyBtn: { fontSize: 22, color: colors.primary, fontWeight: '700', paddingHorizontal: 12 },
  qty: { color: colors.textMain, fontWeight: '700' },
  total: { fontSize: 20, fontWeight: '800', color: colors.textMain, marginTop: 12 },
  shop: {
    marginTop: 12,
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  shopText: { color: '#fff', fontWeight: '700' },
});
