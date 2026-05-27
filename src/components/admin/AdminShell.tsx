import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '../../utils/storage';
import ScreenBackground from '../ScreenBackground';
import { logout } from '../../app/action';
import { colors, radii } from '../../theme';
import { ROUTES } from '../../utils';
import { isAdminUser } from '../../utils/authRoles';

type NavItem = { route: string; label: string; icon: string; adminOnly?: boolean };

const NAV: NavItem[] = [
  { route: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: '📊' },
  { route: ROUTES.ADMIN_PRODUCTS, label: 'Products', icon: '📦' },
  { route: ROUTES.ADMIN_CATEGORIES, label: 'Categories', icon: '🏷️' },
  { route: ROUTES.ADMIN_ORDERS, label: 'Orders', icon: '🛒' },
  { route: ROUTES.ADMIN_STOCK, label: 'Stock', icon: '📥' },
  { route: ROUTES.PROFILE, label: 'Profile', icon: '👤' },
  { route: ROUTES.ADMIN_LOGS, label: 'Logs', icon: '📋', adminOnly: true },
  { route: ROUTES.ADMIN_USERS, label: 'Users', icon: '👥', adminOnly: true },
];

type Props = {
  navigation: { navigate: (r: string, p?: object) => void; goBack?: () => void };
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showBack?: boolean;
};

export default function AdminShell({ navigation, title, subtitle, children, showBack }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: { auth: { user: any } }) => state.auth.user);
  const admin = isAdminUser(user);

  const items = NAV.filter((n) => !n.adminOnly || admin);

  const handleLogout = async () => {
    setMenuOpen(false);
    try {
      await AsyncStorage.removeItem('userToken');
    } catch {}
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScreenBackground>
        <View style={styles.topBar}>
          {showBack ? (
            <TouchableOpacity onPress={() => navigation.goBack?.()} style={styles.menuBtn}>
              <Text style={styles.menuIcon}>←</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setMenuOpen(true)} style={styles.menuBtn}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          )}
          <View style={styles.topTitles}>
            <Text style={styles.brand}>GearGrid</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          {children}
        </ScrollView>

        <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
          <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)}>
            <Pressable style={styles.drawer} onPress={(e) => e.stopPropagation()}>
              <Text style={styles.drawerBrand}>GearGrid Admin</Text>
              <Text style={styles.drawerRole}>{admin ? 'Administrator' : 'Staff'}</Text>
              <ScrollView style={styles.drawerNav}>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item.route}
                    style={styles.drawerItem}
                    onPress={() => {
                      setMenuOpen(false);
                      navigation.navigate(item.route);
                    }}
                  >
                    <Text style={styles.drawerIcon}>{item.icon}</Text>
                    <Text style={styles.drawerLabel}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      </ScreenBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bgBase },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
  },
  menuBtn: {
    width: 44,
    height: 44,
    borderRadius: radii.sm,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuIcon: { fontSize: 20, color: colors.textMain },
  topTitles: { flex: 1 },
  brand: { fontSize: 12, color: colors.primary, fontWeight: '700', letterSpacing: 1 },
  title: { fontSize: 18, fontWeight: '700', color: colors.textMain },
  subtitle: { color: colors.textMuted, fontSize: 14, marginBottom: 16, paddingHorizontal: 20 },
  body: { padding: 20, paddingBottom: 40 },
  overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.55)' },
  drawer: {
    width: 280,
    backgroundColor: '#111827',
    borderRightWidth: 1,
    borderRightColor: colors.glassBorder,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 24,
    flex: 1,
  },
  drawerBrand: { fontSize: 22, fontWeight: '800', color: colors.textMain },
  drawerRole: { fontSize: 13, color: colors.textMuted, marginBottom: 20 },
  drawerNav: { flex: 1 },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: radii.sm,
    marginBottom: 4,
  },
  drawerIcon: { fontSize: 18, marginRight: 12 },
  drawerLabel: { fontSize: 16, fontWeight: '600', color: colors.textMain },
  logoutBtn: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: radii.sm,
    backgroundColor: colors.dangerMutedBg,
    borderWidth: 1,
    borderColor: colors.dangerMutedBorder,
    alignItems: 'center',
  },
  logoutText: { color: colors.danger, fontWeight: '700' },
});
