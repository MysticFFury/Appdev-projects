import React, { useCallback, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Image, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import { deleteAdminProduct, fetchAdminProducts, formatPeso, getProductImageUrl } from '../../app/api/admin';
import { AdminProduct } from '../../types/admin.types';
import { colors } from '../../theme';
import { ROUTES } from '../../utils';
import { NavigationProps } from '../../types/screen.auth.types';

export default function AdminProductsScreen({ navigation }: NavigationProps) {
  const [items, setItems] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await fetchAdminProducts());
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const onDelete = (p: AdminProduct) => {
    Alert.alert('Delete product', `Remove "${p.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteAdminProduct(p.id);
            load();
          } catch (e: unknown) {
            Alert.alert('Error', e instanceof Error ? e.message : 'Delete failed');
          }
        },
      },
    ]);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toString() === searchQuery
  );

  const totalProducts = filteredItems.length;
  const lowStock = filteredItems.filter((p) => p.quantity <= 5).length;
  const healthyStock = filteredItems.filter((p) => p.quantity > 5).length;

  return (
    <AdminShell navigation={navigation} title="Products" subtitle="Same catalog as web admin">
      {loading && <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />}
      {error && <Text style={adminStyles.error}>{error}</Text>}
      
      {!loading && (
        <>
          <View style={adminStyles.metricGrid}>
            <View style={[adminStyles.metricCard, { minWidth: '30%' }]}>
              <Text style={adminStyles.metricLabel}>Total</Text>
              <Text style={adminStyles.metricValue}>{totalProducts}</Text>
            </View>
            <View style={[adminStyles.metricCard, { minWidth: '30%' }]}>
              <Text style={adminStyles.metricLabel}>Low Stock (≤5)</Text>
              <Text style={[adminStyles.metricValue, { color: '#f472b6' }]}>{lowStock}</Text>
            </View>
            <View style={[adminStyles.metricCard, { minWidth: '30%' }]}>
              <Text style={adminStyles.metricLabel}>Healthy (&gt;5)</Text>
              <Text style={[adminStyles.metricValue, { color: '#34d399' }]}>{healthyStock}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, height: 52 }}>
              <Text style={{ fontSize: 16, marginRight: 10, opacity: 0.6 }}>🔍</Text>
              <TextInput
                style={{ flex: 1, color: '#f8fafc', fontSize: 15, height: '100%' }}
                placeholder="Search catalog..."
                placeholderTextColor="#64748b"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            
            <TouchableOpacity 
              style={{ width: 52, height: 52, backgroundColor: '#8b5cf6', borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#8b5cf6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 }} 
              onPress={() => navigation.navigate(ROUTES.ADMIN_PRODUCT_FORM, {})}
            >
              <Text style={{ color: '#fff', fontSize: 28, fontWeight: '300', marginTop: -2 }}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={adminStyles.panel}>
            <View style={adminStyles.tableHeader}>
              <Text style={[adminStyles.tableHeaderText, { width: 50 }]}>ID</Text>
              <Text style={[adminStyles.tableHeaderText, { flex: 2 }]}>Product</Text>
              <Text style={[adminStyles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Price</Text>
            </View>
            
            {filteredItems.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={[adminStyles.row, { paddingVertical: 16 }]}
                onPress={() => navigation.navigate(ROUTES.ADMIN_PRODUCT_FORM, { productId: p.id })}
                onLongPress={() => onDelete(p)}
              >
                <View style={{ width: 50 }}>
                  <View style={[adminStyles.chip, adminStyles.chipPink, { alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2 }]}>
                    <Text style={adminStyles.chipPinkText}>#{p.id}</Text>
                  </View>
                </View>

                <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  {p.image ? (
                    <Image source={{ uri: getProductImageUrl(p.image) }} style={adminStyles.productImage} />
                  ) : (
                    <View style={adminStyles.productImagePlaceholder}>
                      <Text style={{ fontSize: 16 }}>📦</Text>
                    </View>
                  )}
                  <View>
                    <Text style={[adminStyles.rowTitle, { fontSize: 14, marginBottom: 4 }]}>{p.name}</Text>
                    <View style={{ flexDirection: 'row', gap: 6 }}>
                      {p.category && (
                        <View style={[adminStyles.chip, adminStyles.chipPurple, { paddingHorizontal: 6, paddingVertical: 2 }]}>
                          <Text style={adminStyles.chipPurpleText}>{p.category.name}</Text>
                        </View>
                      )}
                      <View style={[adminStyles.chip, adminStyles.chipGreen, { paddingHorizontal: 6, paddingVertical: 2 }]}>
                        <Text style={adminStyles.chipGreenText}>Qty {p.quantity}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text style={[adminStyles.rowMeta, { color: '#34d399' }]}>{formatPeso(p.price)}</Text>
                </View>
              </TouchableOpacity>
            ))}
            
            {filteredItems.length === 0 && (
              <View style={adminStyles.empty}>
                <Text style={{ fontSize: 32, marginBottom: 8 }}>📦</Text>
                <Text style={{ color: '#94a3b8' }}>No products found.</Text>
              </View>
            )}
          </View>
        </>
      )}
    </AdminShell>
  );
}
