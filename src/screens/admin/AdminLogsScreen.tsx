import React, { useCallback, useState } from 'react';
import { Text, ActivityIndicator, Alert, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import { fetchAdminLogs } from '../../app/api/admin';
import { AdminLog } from '../../types/admin.types';
import { colors } from '../../theme';
import { NavigationProps } from '../../types/screen.auth.types';

export default function AdminLogsScreen({ navigation }: NavigationProps) {
  const [items, setItems] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await fetchAdminLogs());
    } catch (e: unknown) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Admin only');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  return (
    <AdminShell navigation={navigation} title="Activity logs" subtitle="Read-only audit trail">
      {loading && <ActivityIndicator color={colors.primary} />}
      {items.map((l) => (
        <View key={l.id} style={adminStyles.panel}>
          <Text style={adminStyles.badgeText}>{l.action}</Text>
          <Text style={[adminStyles.rowTitle, { marginTop: 8 }]}>{l.message}</Text>
          <Text style={adminStyles.rowSub}>
            {l.userName ?? '—'} · {l.entity ?? ''}
          </Text>
        </View>
      ))}
    </AdminShell>
  );
}
