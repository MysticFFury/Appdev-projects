import React, { useCallback, useState, useEffect } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, Alert, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { appEvents } from '../../utils/eventEmitter';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import {
  deleteAdminOrder,
  fetchAdminOrder,
  formatPeso,
  updateAdminOrderStatus,
} from '../../app/api/admin';
import { AdminOrder } from '../../types/admin.types';
import { colors } from '../../theme';
import { NavigationProps } from '../../types/screen.auth.types';

type Params = { orderId: number };

export default function AdminOrderDetailScreen({
  navigation,
  route,
}: NavigationProps) {
  const { orderId } = route.params as Params;
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminOrder(orderId);
      setOrder(data.order);
      setStatuses(data.statuses);
    } catch (e: unknown) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Load failed');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  useEffect(() => {
    const unsubscribe = appEvents.on('order-status-updated', (data) => {
      if (Number(data.orderId) === Number(orderId)) {
        load();
      }
    });
    return () => unsubscribe();
  }, [load, orderId]);

  const setStatus = async (status: string) => {
    try {
      await updateAdminOrderStatus(orderId, status);
      await load();
      Alert.alert('Updated', `Status set to ${status}`);
    } catch (e: unknown) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Update failed');
    }
  };

  const remove = () => {
    Alert.alert('Delete order', `Delete order #${orderId}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteAdminOrder(orderId);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <AdminShell navigation={navigation} title={`Order #${orderId}`} showBack>
      {loading && <ActivityIndicator color={colors.primary} />}
      {order && (
        <>
          <View style={adminStyles.panel}>
            <Text style={adminStyles.rowTitle}>{order.customerName}</Text>
            <Text style={adminStyles.rowSub}>Status: {order.status}</Text>
            <Text style={[adminStyles.metricValue, { marginTop: 8 }]}>{formatPeso(order.totalPrice)}</Text>
          </View>
          {order.items && order.items.length > 0 && (
            <View style={adminStyles.panel}>
              <Text style={adminStyles.panelTitle}>Line items</Text>
              {order.items.map((item) => (
                <View key={item.id} style={adminStyles.row}>
                  <Text style={adminStyles.rowTitle}>{item.productName}</Text>
                  <Text style={adminStyles.rowMeta}>
                    {item.quantity} × {formatPeso(item.unitPrice)}
                  </Text>
                </View>
              ))}
            </View>
          )}
          <View style={adminStyles.panel}>
            <Text style={adminStyles.panelTitle}>Update status</Text>
            {statuses.map((s) => (
              <TouchableOpacity
                key={s}
                style={[adminStyles.row, order.status === s && { backgroundColor: 'rgba(108,99,255,0.12)' }]}
                onPress={() => setStatus(s)}
              >
                <Text style={adminStyles.rowTitle}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={adminStyles.dangerBtn} onPress={remove}>
            <Text style={adminStyles.dangerBtnText}>Delete order</Text>
          </TouchableOpacity>
        </>
      )}
    </AdminShell>
  );
}
