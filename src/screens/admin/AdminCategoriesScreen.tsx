import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, ActivityIndicator, Alert, View, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import { deleteAdminCategory, fetchAdminCategories } from '../../app/api/admin';
import { AdminCategory } from '../../types/admin.types';
import { colors } from '../../theme';
import { ROUTES } from '../../utils';
import { NavigationProps } from '../../types/screen.auth.types';

export default function AdminCategoriesScreen({ navigation }: NavigationProps) {
  const [items, setItems] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await fetchAdminCategories());
    } catch (e: unknown) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminShell navigation={navigation} title="Categories">
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, height: 52 }}>
          <Text style={{ fontSize: 16, marginRight: 10, opacity: 0.6 }}>🔍</Text>
          <TextInput
            style={{ flex: 1, color: '#f8fafc', fontSize: 15, height: '100%' }}
            placeholder="Search categories..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <TouchableOpacity 
          style={{ width: 52, height: 52, backgroundColor: '#8b5cf6', borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#8b5cf6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 }} 
          onPress={() => navigation.navigate(ROUTES.ADMIN_CATEGORY_FORM, {})}
        >
          <Text style={{ color: '#fff', fontSize: 28, fontWeight: '300', marginTop: -2 }}>+</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator color={colors.primary} />}
      {filteredItems.map((c) => (
        <TouchableOpacity
          key={c.id}
          style={adminStyles.panel}
          onPress={() => navigation.navigate(ROUTES.ADMIN_CATEGORY_FORM, { categoryId: c.id, name: c.name, description: c.description })}
          onLongPress={() =>
            Alert.alert('Delete', `Delete "${c.name}"?`, [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                  await deleteAdminCategory(c.id);
                  load();
                },
              },
            ])
          }
        >
          <Text style={adminStyles.rowTitle}>{c.name}</Text>
          {c.description ? <Text style={adminStyles.rowSub}>{c.description}</Text> : null}
        </TouchableOpacity>
      ))}
      {filteredItems.length === 0 && !loading && (
        <View style={adminStyles.empty}>
          <Text style={{ color: '#94a3b8', fontSize: 16 }}>No categories found.</Text>
        </View>
      )}
    </AdminShell>
  );
}
