import React, { useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import { addAdminStock, fetchAdminProducts } from '../../app/api/admin';
import { AdminProduct } from '../../types/admin.types';
import { colors } from '../../theme';
import { NavigationProps } from '../../types/screen.auth.types';

export default function AdminStockFormScreen({ navigation, route }: NavigationProps & { route?: { params?: { productId?: number } } }) {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [productId, setProductId] = useState<number | null>(route?.params?.productId ?? null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        try {
          setProducts(await fetchAdminProducts());
        } finally {
          setLoading(false);
        }
      })();
    }, []),
  );

  const save = async () => {
    const qty = parseInt(amount, 10);
    if (!productId || qty < 1) {
      Alert.alert('Validation', 'Select a product and enter quantity');
      return;
    }
    setSaving(true);
    try {
      await addAdminStock(productId, qty);
      Alert.alert('Success', 'Stock added');
      navigation.goBack();
    } catch (e: unknown) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell navigation={navigation} title="Add stock" showBack>
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <>
          <Text style={adminStyles.label}>PRODUCT</Text>
          {products.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[adminStyles.row, productId === p.id && { backgroundColor: 'rgba(108,99,255,0.15)' }]}
              onPress={() => setProductId(p.id)}
            >
              <Text style={adminStyles.rowTitle}>{p.name}</Text>
              <Text style={adminStyles.rowMeta}>Qty {p.quantity}</Text>
            </TouchableOpacity>
          ))}
          <Text style={adminStyles.label}>QUANTITY TO ADD</Text>
          <TextInput style={adminStyles.input} value={amount} onChangeText={setAmount} keyboardType="number-pad" placeholderTextColor={colors.placeholder} />
          <TouchableOpacity style={adminStyles.primaryBtn} onPress={save} disabled={saving}>
            <Text style={adminStyles.primaryBtnText}>{saving ? 'Saving…' : 'Add stock'}</Text>
          </TouchableOpacity>
        </>
      )}
    </AdminShell>
  );
}
