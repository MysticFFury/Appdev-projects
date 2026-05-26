import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import { fetchAdminOrders, formatPeso } from '../../app/api/admin';
import { AdminOrder } from '../../types/admin.types';
import { colors } from '../../theme';
import { ROUTES } from '../../utils';
import { NavigationProps } from '../../types/screen.auth.types';

export default function AdminOrdersScreen({ navigation }: NavigationProps) {
  const [items, setItems] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminOrders();
      setItems(data.items);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  return (
    <AdminShell navigation={navigation} title="Orders" subtitle="Tap to update status">
      {loading && <ActivityIndicator color={colors.primary} />}
      {error && <Text style={adminStyles.error}>{error}</Text>}
      {items.map((o) => (
        <TouchableOpacity
          key={o.id}
          style={adminStyles.panel}
          onPress={() => navigation.navigate(ROUTES.ADMIN_ORDER_DETAIL, { orderId: o.id })}
        >
          <View style={adminStyles.row}>
            <View style={{ flex: 1 }}>
              <Text style={adminStyles.rowTitle}>#{o.id} · {o.customerName}</Text>
              <Text style={adminStyles.rowSub}>{o.status}</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <Text style={{ color: '#34d399', fontWeight: 'bold', fontSize: 16 }}>{formatPeso(o.totalPrice)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </AdminShell>
  );
}
