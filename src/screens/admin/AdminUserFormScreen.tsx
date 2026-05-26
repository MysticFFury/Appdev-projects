import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import { saveAdminUser } from '../../app/api/admin';
import { AdminUser } from '../../types/admin.types';
import { colors } from '../../theme';
import { NavigationProps } from '../../types/screen.auth.types';

type Params = { userId?: number; user?: AdminUser };

export default function AdminUserFormScreen({
  navigation,
  route,
}: NavigationProps & { route: { params?: Params } }) {
  const { userId, user } = route.params ?? {};
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(user?.roles?.includes('ROLE_ADMIN') ? 'ROLE_ADMIN' : 'ROLE_STAFF');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!name.trim() || !email.trim() || (!userId && !password)) {
      Alert.alert('Validation', 'Name, email, and password (new user) are required');
      return;
    }
    setSaving(true);
    try {
      await saveAdminUser(
        {
          name: name.trim(),
          email: email.trim(),
          password: password || undefined,
          roles: [role],
          isActive: user?.isActive ?? true,
        },
        userId,
      );
      navigation.goBack();
    } catch (e: unknown) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminShell navigation={navigation} title={userId ? 'Edit user' : 'New user'} showBack>
      <Text style={adminStyles.label}>NAME</Text>
      <TextInput style={adminStyles.input} value={name} onChangeText={setName} placeholderTextColor={colors.placeholder} />
      <Text style={adminStyles.label}>EMAIL</Text>
      <TextInput style={adminStyles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholderTextColor={colors.placeholder} />
      <Text style={adminStyles.label}>PASSWORD {userId ? '(leave blank to keep)' : ''}</Text>
      <TextInput style={adminStyles.input} value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor={colors.placeholder} />
      <Text style={adminStyles.label}>ROLE</Text>
      {(['ROLE_STAFF', 'ROLE_ADMIN'] as const).map((r) => (
        <TouchableOpacity
          key={r}
          style={[adminStyles.row, role === r && { backgroundColor: 'rgba(108,99,255,0.15)' }]}
          onPress={() => setRole(r)}
        >
          <Text style={adminStyles.rowTitle}>{r === 'ROLE_ADMIN' ? 'Admin' : 'Staff'}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={adminStyles.primaryBtn} onPress={save} disabled={saving}>
        <Text style={adminStyles.primaryBtnText}>{saving ? 'Saving…' : 'Save user'}</Text>
      </TouchableOpacity>
    </AdminShell>
  );
}
