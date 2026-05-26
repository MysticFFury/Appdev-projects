import React, { useState, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { isStaffOrAdmin } from '../utils/authRoles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '../app/action';
import ScreenBackground from '../components/ScreenBackground';
import { radii } from '../theme';
import { fetchCustomerOrders } from '../app/api/customer';
import { showSuccess, showError } from '../components/AlertMsg';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: { auth: { user: { user?: { name?: string; email?: string; roles?: string[] }; name?: string; email?: string; roles?: string[] } } }) => state.auth.user);
  const u = auth?.user ?? auth;
  const staffMode = isStaffOrAdmin(auth);
  
  const userInitials = u?.name ? u.name.substring(0, 2).toUpperCase() : 'USER';

  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!staffMode) {
        setLoadingOrders(true);
        fetchCustomerOrders().then(data => {
          setOrders(data);
          setLoadingOrders(false);
        });
      }
    }, [staffMode])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch(logout());
      // Saga will also trigger the Toast notification, but we can have it here or Saga will do it
    } catch (error) {
      console.log('Error clearing token:', error);
      showError('Error', 'There was a problem signing out.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScreenBackground>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Text style={styles.brand}>ACCOUNT SUMMARY</Text>
            <Text style={styles.screenTitle}>My Profile</Text>
          </View>

          <View style={styles.glassPanel}>
            <View style={styles.avatarSection}>
              <View style={styles.avatarOuterGlow}>
                <View style={styles.avatarInner}>
                  <Text style={styles.avatarInitials}>{userInitials}</Text>
                </View>
              </View>
              
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>{staffMode ? 'STAFF / ADMIN' : 'VERIFIED CUSTOMER'}</Text>
              </View>
            </View>
            
            <View style={styles.infoSection}>
              {u?.name && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <Text style={styles.name}>{u.name}</Text>
                  <Text style={{ fontSize: 16 }}>✓</Text>
                </View>
              )}
              {u?.email && <Text style={styles.email}>{u.email}</Text>}
              
              <View style={styles.divider} />
              
              {!staffMode && !loadingOrders && orders.length > 0 && (
                <View style={{ flexDirection: 'row', width: '100%', gap: 12, marginBottom: 24, marginTop: -4 }}>
                  <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
                    <Text style={{ color: '#8b5cf6', fontSize: 28, fontWeight: '800' }}>{orders.length}</Text>
                    <Text style={{ color: '#94a3b8', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4, fontWeight: '600' }}>Total Orders</Text>
                  </View>
                  <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
                    <Text style={{ color: '#34d399', fontSize: 28, fontWeight: '800' }}>{orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length}</Text>
                    <Text style={{ color: '#94a3b8', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4, fontWeight: '600' }}>In Progress</Text>
                  </View>
                </View>
              )}

              <Text style={styles.helperText}>
                {staffMode
                  ? 'Access your administrative tools from the side menu. Your session is fully secured.'
                  : 'Manage your customer account and track your latest orders below.'}
              </Text>
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
              <Text style={styles.logoutIcon}>🚪</Text>
              <Text style={styles.logoutText}>Secure Sign Out</Text>
            </TouchableOpacity>
          </View>

          {!staffMode && (
            <View style={styles.ordersSection}>
              <Text style={styles.ordersTitle}>Recent Orders</Text>
              {loadingOrders ? (
                <ActivityIndicator color="#8b5cf6" style={{ marginTop: 20 }} />
              ) : orders.length === 0 ? (
                <View style={{ alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', padding: 32, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' }}>
                  <Text style={{ fontSize: 40, marginBottom: 12 }}>🛍️</Text>
                  <Text style={{ color: '#f8fafc', fontSize: 18, fontWeight: '600', marginBottom: 4 }}>No orders yet</Text>
                  <Text style={styles.noOrders}>When you place an order, it will appear here.</Text>
                </View>
              ) : (
                orders.map((order: any) => (
                  <View key={order.id} style={styles.orderCard}>
                    <View style={styles.orderHeader}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(139, 92, 246, 0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(139, 92, 246, 0.2)' }}>
                          <Text style={{ fontSize: 20 }}>📦</Text>
                        </View>
                        <View>
                          <Text style={styles.orderId}>Order #{order.id}</Text>
                          <Text style={{ color: '#94a3b8', fontSize: 13, marginTop: 2 }}>{order.items?.length || 0} items</Text>
                        </View>
                      </View>
                      <View style={[styles.statusBadge, order.status === 'Delivered' && styles.statusDelivered]}>
                        <Text style={[styles.statusText, order.status === 'Delivered' && { color: '#34d399' }]}>{order.status}</Text>
                      </View>
                    </View>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' }}>
                      <View style={{ flex: 1, marginRight: 16 }}>
                        <Text style={styles.orderItems} numberOfLines={2}>
                          {order.items?.map((i: any) => `${i.quantity}x ${i.productName}`).join(', ')}
                        </Text>
                      </View>
                      <View style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                        <Text style={[styles.orderTotal, { color: '#34d399', marginBottom: 0 }]}>₱{Number(order.totalPrice).toFixed(2)}</Text>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}
          
        </ScrollView>
      </ScreenBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#030712',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  brand: {
    fontSize: 16,
    color: '#8b5cf6',
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc',
    letterSpacing: -0.5,
  },
  glassPanel: {
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 8,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  avatarOuterGlow: {
    padding: 6,
    borderRadius: 60,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    marginBottom: -14,
    zIndex: 1,
  },
  avatarInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1,
  },
  roleBadge: {
    backgroundColor: '#030712',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
    zIndex: 2,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  infoSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: '#94a3b8',
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 20,
  },
  helperText: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    paddingVertical: 16,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.25)',
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
  },
  logoutIcon: {
    fontSize: 18,
  },
  logoutText: {
    color: '#f87171',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  ordersSection: {
    marginTop: 32,
  },
  ordersTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  noOrders: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
  orderCard: {
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  statusBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  statusDelivered: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    borderColor: 'rgba(52, 211, 153, 0.4)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#f8fafc',
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#a78bfa',
    marginBottom: 6,
  },
  orderItems: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 20,
  },
});

export default ProfileScreen;
