import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import {
  fetchAdminCategories,
  fetchAdminProduct,
  saveAdminProduct,
} from '../../app/api/admin';
import { AdminCategory } from '../../types/admin.types';
import { colors } from '../../theme';
import { NavigationProps } from '../../types/screen.auth.types';
import { ROUTES } from '../../utils';
import { showSuccess, showError, showWarning } from '../../components/AlertMsg';

type Params = { productId?: number };

export default function AdminProductFormScreen({ navigation, route }: NavigationProps & { route: { params?: Params } }) {
  const productId = route.params?.productId;
  const isEdit = !!productId;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        try {
          const cats = await fetchAdminCategories();
          setCategories(cats);
          if (productId) {
            const p = await fetchAdminProduct(productId);
            setName(p.name);
            setPrice(String(p.price));
            setQuantity(String(p.quantity));
            setDescription(p.description ?? '');
            setCategoryId(p.category?.id ?? null);
          }
        } catch (e: unknown) {
          showError('Error', e instanceof Error ? e.message : 'Load failed');
        } finally {
          setLoading(false);
        }
      })();
    }, [productId]),
  );

  const save = async () => {
    if (!name.trim() || !categoryId) {
      showWarning('Validation', 'Name and category are required');
      return;
    }
    setSaving(true);
    try {
      await saveAdminProduct(
        {
          name: name.trim(),
          price: parseFloat(price) || 0,
          quantity: parseInt(quantity, 10) || 0,
          description: description.trim() || null,
          categoryId,
        },
        productId,
      );
      showSuccess('Success', isEdit ? 'Product updated successfully' : 'Product created successfully');
      navigation.goBack();
    } catch (e: unknown) {
      showError('Error', e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell navigation={navigation} title={isEdit ? 'Edit product' : 'New product'} showBack>
      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 24 }} />
      ) : (
        <View style={adminStyles.panel}>
          <Text style={adminStyles.label}>NAME</Text>
          <TextInput
            style={adminStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Nvidia RTX 4080 Super"
            placeholderTextColor={colors.placeholder}
          />

          <Text style={adminStyles.label}>CATEGORY</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
            {categories.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[
                  {
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: categoryId === c.id ? colors.primary : 'rgba(255,255,255,0.1)',
                    backgroundColor: categoryId === c.id ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                  },
                ]}
                onPress={() => setCategoryId(c.id)}
              >
                <Text
                  style={{
                    color: categoryId === c.id ? '#c084fc' : '#94a3b8',
                    fontSize: 13,
                    fontWeight: categoryId === c.id ? '700' : '400',
                  }}
                >
                  {c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={adminStyles.label}>PRICE (₱)</Text>
          <TextInput
            style={adminStyles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={colors.placeholder}
          />

          {isEdit ? (
            <View style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.05)',
              padding: 14,
              marginBottom: 16,
            }}>
              <Text style={[adminStyles.label, { fontSize: 11, marginBottom: 6 }]}>STOCK INVENTORY</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  {parseInt(quantity, 10) <= 0 ? (
                    <View style={[adminStyles.chip, adminStyles.chipPink]}>
                      <Text style={adminStyles.chipPinkText}>Out of Stock</Text>
                    </View>
                  ) : parseInt(quantity, 10) <= 5 ? (
                    <View style={[adminStyles.chip, adminStyles.chipPink, { backgroundColor: 'rgba(249, 115, 22, 0.1)' }]}>
                      <Text style={[adminStyles.chipPinkText, { color: '#fb923c' }]}>Low Stock</Text>
                    </View>
                  ) : (
                    <View style={[adminStyles.chip, adminStyles.chipGreen]}>
                      <Text style={adminStyles.chipGreenText}>Healthy</Text>
                    </View>
                  )}
                  <Text style={{ color: '#f8fafc', fontSize: 15, fontWeight: '700' }}>
                    {quantity} units
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(139, 92, 246, 0.15)',
                    borderWidth: 1,
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 8,
                  }}
                  onPress={() => navigation.navigate(ROUTES.ADMIN_STOCK_NEW, { productId })}
                >
                  <Text style={{ color: '#a78bfa', fontSize: 13, fontWeight: '600' }}>
                    ➕ Adjust Stock
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <Text style={adminStyles.label}>INITIAL QUANTITY</Text>
              <TextInput
                style={adminStyles.input}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="number-pad"
                placeholder="0"
                placeholderTextColor={colors.placeholder}
              />
            </>
          )}

          <Text style={adminStyles.label}>DESCRIPTION</Text>
          <TextInput
            style={[adminStyles.input, { minHeight: 80, textAlignVertical: 'top' }]}
            value={description}
            onChangeText={setDescription}
            multiline
            placeholder="Describe the product details..."
            placeholderTextColor={colors.placeholder}
          />

          <TouchableOpacity style={adminStyles.primaryBtn} onPress={save} disabled={saving}>
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={adminStyles.primaryBtnText}>{isEdit ? 'Save Changes' : 'Create Product'}</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </AdminShell>
  );
}
