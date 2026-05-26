import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, Alert, View, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import { fetchAdminUsers, toggleAdminUser } from '../../app/api/admin';
import { AdminUser } from '../../types/admin.types';
import { colors } from '../../theme';
import { ROUTES } from '../../utils';
import { NavigationProps } from '../../types/screen.auth.types';

export default function AdminUsersScreen({ navigation }: NavigationProps) {
  const [items, setItems] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await fetchAdminUsers());
    } catch (e: unknown) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Admin only');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminShell navigation={navigation} title="Users" subtitle="Admin only">
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, height: 52 }}>
          <Text style={{ fontSize: 16, marginRight: 10, opacity: 0.6 }}>🔍</Text>
          <TextInput
            style={{ flex: 1, color: '#f8fafc', fontSize: 15, height: '100%' }}
            placeholder="Search users..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <TouchableOpacity 
          style={{ width: 52, height: 52, backgroundColor: '#8b5cf6', borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#8b5cf6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 }} 
          onPress={() => navigation.navigate(ROUTES.ADMIN_USER_FORM, {})}
        >
          <Text style={{ color: '#fff', fontSize: 28, fontWeight: '300', marginTop: -2 }}>+</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator color={colors.primary} />}
      {filteredItems.map((u) => (
        <TouchableOpacity
          key={u.id}
          style={adminStyles.panel}
          onPress={() => navigation.navigate(ROUTES.ADMIN_USER_FORM, { userId: u.id, user: u })}
          onLongPress={() =>
            toggleAdminUser(u.id).then(load).catch((e: Error) => Alert.alert('Error', e.message))
          }
        >
          <Text style={adminStyles.rowTitle}>{u.name}</Text>
          <Text style={adminStyles.rowSub}>{u.email}</Text>
          <Text style={adminStyles.rowMeta}>
            {u.roles.join(', ')} · {u.isActive ? 'Active' : 'Inactive'}
          </Text>
        </TouchableOpacity>
      ))}
      {filteredItems.length === 0 && !loading && (
        <View style={adminStyles.empty}>
          <Text style={{ color: '#94a3b8', fontSize: 16 }}>No users found.</Text>
        </View>
      )}
    </AdminShell>
  );
}
