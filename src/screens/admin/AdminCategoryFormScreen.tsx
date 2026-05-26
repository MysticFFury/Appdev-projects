import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import { saveAdminCategory } from '../../app/api/admin';
import { colors } from '../../theme';
import { NavigationProps } from '../../types/screen.auth.types';

type Params = { categoryId?: number; name?: string; description?: string | null };

export default function AdminCategoryFormScreen({
  navigation,
  route,
}: NavigationProps & { route: { params?: Params } }) {
  const { categoryId, name: initName, description: initDesc } = route.params ?? {};
  const [name, setName] = useState(initName ?? '');
  const [description, setDescription] = useState(initDesc ?? '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Name is required');
      return;
    }
    setSaving(true);
    try {
      await saveAdminCategory({ name: name.trim(), description: description.trim() || undefined }, categoryId);
      navigation.goBack();
    } catch (e: unknown) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell navigation={navigation} title={categoryId ? 'Edit category' : 'New category'} showBack>
      <Text style={adminStyles.label}>NAME</Text>
      <TextInput style={adminStyles.input} value={name} onChangeText={setName} placeholderTextColor={colors.placeholder} />
      <Text style={adminStyles.label}>DESCRIPTION</Text>
      <TextInput style={adminStyles.input} value={description} onChangeText={setDescription} multiline placeholderTextColor={colors.placeholder} />
      <TouchableOpacity style={adminStyles.primaryBtn} onPress={save} disabled={saving}>
        <Text style={adminStyles.primaryBtnText}>{saving ? 'Saving…' : 'Save'}</Text>
      </TouchableOpacity>
    </AdminShell>
  );
}
