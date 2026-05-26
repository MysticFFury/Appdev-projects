import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminProductsScreen from '../screens/admin/AdminProductsScreen';
import AdminProductFormScreen from '../screens/admin/AdminProductFormScreen';
import AdminCategoriesScreen from '../screens/admin/AdminCategoriesScreen';
import AdminCategoryFormScreen from '../screens/admin/AdminCategoryFormScreen';
import AdminOrdersScreen from '../screens/admin/AdminOrdersScreen';
import AdminOrderDetailScreen from '../screens/admin/AdminOrderDetailScreen';
import AdminStockScreen from '../screens/admin/AdminStockScreen';
import AdminStockFormScreen from '../screens/admin/AdminStockFormScreen';
import AdminUsersScreen from '../screens/admin/AdminUsersScreen';
import AdminUserFormScreen from '../screens/admin/AdminUserFormScreen';
import AdminLogsScreen from '../screens/admin/AdminLogsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { ROUTES } from '../utils';
import { colors } from '../theme';

const Stack = createStackNavigator();

function MainNav() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.ADMIN_DASHBOARD}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.bgBase },
      }}
    >
      <Stack.Screen name={ROUTES.ADMIN_DASHBOARD} component={AdminDashboardScreen} />
      <Stack.Screen name={ROUTES.ADMIN_PRODUCTS} component={AdminProductsScreen} />
      <Stack.Screen name={ROUTES.ADMIN_PRODUCT_FORM} component={AdminProductFormScreen} />
      <Stack.Screen name={ROUTES.ADMIN_CATEGORIES} component={AdminCategoriesScreen} />
      <Stack.Screen name={ROUTES.ADMIN_CATEGORY_FORM} component={AdminCategoryFormScreen} />
      <Stack.Screen name={ROUTES.ADMIN_ORDERS} component={AdminOrdersScreen} />
      <Stack.Screen name={ROUTES.ADMIN_ORDER_DETAIL} component={AdminOrderDetailScreen} />
      <Stack.Screen name={ROUTES.ADMIN_STOCK} component={AdminStockScreen} />
      <Stack.Screen name={ROUTES.ADMIN_STOCK_NEW} component={AdminStockFormScreen} />
      <Stack.Screen name={ROUTES.ADMIN_USERS} component={AdminUsersScreen} />
      <Stack.Screen name={ROUTES.ADMIN_USER_FORM} component={AdminUserFormScreen} />
      <Stack.Screen name={ROUTES.ADMIN_LOGS} component={AdminLogsScreen} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default MainNav;
