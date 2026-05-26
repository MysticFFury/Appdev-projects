import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AdminShell from '../../components/admin/AdminShell';
import { adminStyles } from '../../components/admin/adminStyles';
import { fetchAdminDashboard, formatPeso } from '../../app/api/admin';
import { AdminDashboard } from '../../types/admin.types';
import { colors } from '../../theme';
import { ROUTES } from '../../utils';
import { NavigationProps } from '../../types/screen.auth.types';
import { appEvents } from '../../utils/eventEmitter';

export default function AdminDashboardScreen({ navigation }: NavigationProps) {
  const [data, setData] = useState<AdminDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const user = useSelector((state: any) => state.auth.user);
  const userName = user?.name || user?.user?.name || 'User';
  const userInitials = userName.substring(0, 2).toUpperCase();

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      setData(await fetchAdminDashboard());
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load dashboard');
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  useEffect(() => {
    const unsubscribe = appEvents.on('new-order', () => {
      load(true); // reload silently
    });
    return () => unsubscribe();
  }, [load]);

  return (
    <AdminShell
      navigation={navigation}
      title=""
      subtitle=""
    >
      <View style={{ marginBottom: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff' }}>
                {data?.isAdmin ? 'Admin Command Center' : 'Staff Workspace'}
              </Text>
              <View style={[adminStyles.chip, { backgroundColor: 'rgba(99, 102, 241, 0.2)', borderWidth: 1, borderColor: 'rgba(99, 102, 241, 0.3)' }]}>
                <Text style={{ color: '#818cf8', fontSize: 10, fontWeight: 'bold' }}>v2.0</Text>
              </View>
            </View>
            <Text style={{ color: '#94a3b8', fontSize: 14 }}>
              Welcome back, <Text style={{ color: '#fff', fontWeight: '500' }}>{userName}</Text>. Here's what's happening today.
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity 
              style={[adminStyles.btnPrimary, { paddingHorizontal: 18 }]}
              onPress={() => navigation.navigate(ROUTES.ADMIN_ORDERS)}
            >
              <Text style={adminStyles.btnPrimaryText}>⚡ View Orders</Text>
            </TouchableOpacity>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: 6, paddingLeft: 12, borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
              <View style={{ marginRight: 8 }}>
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>{userName}</Text>
                <Text style={{ color: '#94a3b8', fontSize: 10 }}>{data?.isAdmin ? 'Administrator' : 'Staff'}</Text>
              </View>
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#8b5cf6', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>{userInitials}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {loading && <ActivityIndicator color="#8b5cf6" size="large" style={{ marginTop: 40 }} />}
      {error && <Text style={adminStyles.error}>{error}</Text>}
      
      {data && !loading && (
        <>
          <View style={adminStyles.metricGrid}>
            <TouchableOpacity style={[adminStyles.metricCard, adminStyles.cardPurple]} onPress={() => navigation.navigate(ROUTES.ADMIN_PRODUCTS)}>
              <View style={adminStyles.metricHeader}>
                <View>
                  <Text style={adminStyles.metricLabel}>Products</Text>
                  <Text style={adminStyles.metricValue}>{data.totalProducts}</Text>
                </View>
                <View style={[adminStyles.metricIconWrap, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                  <Text style={adminStyles.iconPurple}>📦</Text>
                </View>
              </View>
              <View style={[adminStyles.chip, adminStyles.chipPurple, { alignSelf: 'flex-start' }]}>
                <Text style={adminStyles.chipPurpleText}>↑ Active Inventory</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[adminStyles.metricCard, adminStyles.cardPink]} onPress={() => navigation.navigate(ROUTES.ADMIN_CATEGORIES)}>
              <View style={adminStyles.metricHeader}>
                <View>
                  <Text style={adminStyles.metricLabel}>Categories</Text>
                  <Text style={adminStyles.metricValue}>{data.totalCategories}</Text>
                </View>
                <View style={[adminStyles.metricIconWrap, { backgroundColor: 'rgba(236, 72, 153, 0.2)' }]}>
                  <Text style={adminStyles.iconPink}>🏷️</Text>
                </View>
              </View>
              <View style={[adminStyles.chip, adminStyles.chipPink, { alignSelf: 'flex-start' }]}>
                <Text style={adminStyles.chipPinkText}>✦ Organized Groups</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[adminStyles.metricCard, adminStyles.cardGreen]} onPress={() => navigation.navigate(ROUTES.ADMIN_ORDERS)}>
              <View style={adminStyles.metricHeader}>
                <View>
                  <Text style={adminStyles.metricLabel}>Orders</Text>
                  <Text style={adminStyles.metricValue}>{data.totalOrders}</Text>
                </View>
                <View style={[adminStyles.metricIconWrap, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <Text style={adminStyles.iconGreen}>🛍️</Text>
                </View>
              </View>
              <View style={[adminStyles.chip, adminStyles.chipGreen, { alignSelf: 'flex-start' }]}>
                <Text style={adminStyles.chipGreenText}>✓ Global Orders</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[adminStyles.metricCard, adminStyles.cardBlue]} onPress={() => data.isAdmin && navigation.navigate(ROUTES.ADMIN_USERS)}>
              <View style={adminStyles.metricHeader}>
                <View>
                  <Text style={adminStyles.metricLabel}>Registered Users</Text>
                  <Text style={adminStyles.metricValue}>
                    {data.totalUsers ?? 0}
                  </Text>
                </View>
                <View style={[adminStyles.metricIconWrap, { backgroundColor: 'rgba(14, 165, 233, 0.2)' }]}>
                  <Text style={adminStyles.iconBlue}>👥</Text>
                </View>
              </View>
              <View style={[adminStyles.chip, adminStyles.chipBlue, { alignSelf: 'flex-start' }]}>
                <Text style={adminStyles.chipBlueText}>+ Total Accounts</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
            <View style={[adminStyles.panel, { flex: 2, minWidth: 280, height: 260 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <View>
                  <Text style={adminStyles.panelTitle}>Order Activity</Text>
                  <Text style={{ color: '#94a3b8', fontSize: 12, marginTop: -8 }}>Monthly breakdown of created vs completed orders</Text>
                </View>
                <Text style={{ color: '#94a3b8' }}>•••</Text>
              </View>
              
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', marginTop: 8 }}>
                <Text style={{ color: '#64748b', fontSize: 14 }}>[ Line Chart Placeholder ]</Text>
                <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <View style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: '#8b5cf6' }} />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Created Orders</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <View style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: '#ec4899' }} />
                    <Text style={{ color: '#94a3b8', fontSize: 12 }}>Completed Orders</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[adminStyles.panel, { flex: 1, minWidth: 200, height: 260 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <Text style={adminStyles.panelTitle}>Status Overview</Text>
                <Text style={{ color: '#94a3b8' }}>📊</Text>
              </View>
              
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 140, height: 140, borderRadius: 70, borderWidth: 16, borderColor: '#10b981', borderTopColor: '#0ea5e9', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>{data.totalOrders}</Text>
                  <Text style={{ color: '#94a3b8', fontSize: 10, letterSpacing: 1 }}>TOTAL</Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </AdminShell>
  );
}
