import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import { fetchAdminStock } from '../../app/api/admin';
import { AdminStockMovement } from '../../types/admin.types';
import { colors } from '../../theme';
import { ROUTES } from '../../utils';
import { NavigationProps } from '../../types/screen.auth.types';

export default function AdminStockScreen({ navigation }: NavigationProps) {
  const [items, setItems] = useState<AdminStockMovement[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await fetchAdminStock());
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  return (
    <AdminShell navigation={navigation} title="Stock" subtitle="Inventory adjustments (read-only history)">
      {loading && <ActivityIndicator color={colors.primary} />}
      {items.map((m) => (
        <View key={m.id} style={adminStyles.panel}>
          <Text style={adminStyles.rowTitle}>{m.product?.name ?? 'Product'}</Text>
          <Text style={adminStyles.rowSub}>
            +{m.amount} · by {m.createdBy?.name ?? '—'}
          </Text>
          <Text style={adminStyles.rowMeta}>New qty: {m.product?.quantity ?? '—'}</Text>
        </View>
      ))}
      <TouchableOpacity style={adminStyles.fab} onPress={() => navigation.navigate(ROUTES.ADMIN_STOCK_NEW)}>
        <Text style={adminStyles.fabText}>+</Text>
      </TouchableOpacity>
    </AdminShell>
  );
}
