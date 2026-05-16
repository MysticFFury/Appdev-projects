import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomerLandingScreen from '../screens/customer/CustomerLandingScreen';
import CustomerProductsScreen from '../screens/customer/CustomerProductsScreen';
import CustomerPcBuilderScreen from '../screens/customer/CustomerPcBuilderScreen';
import CustomerServicesScreen from '../screens/customer/CustomerServicesScreen';
import CustomerAboutScreen from '../screens/customer/CustomerAboutScreen';
import CustomerContactScreen from '../screens/customer/CustomerContactScreen';
import CustomerCartScreen from '../screens/customer/CustomerCartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { ROUTES } from '../utils';
import { colors } from '../theme';

const Stack = createStackNavigator();

function CustomerNav() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.CUSTOMER_LANDING}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.bgBase },
      }}
    >
      <Stack.Screen name={ROUTES.CUSTOMER_LANDING} component={CustomerLandingScreen} />
      <Stack.Screen name={ROUTES.CUSTOMER_PRODUCTS} component={CustomerProductsScreen} />
      <Stack.Screen name={ROUTES.CUSTOMER_PC_BUILDER} component={CustomerPcBuilderScreen} />
      <Stack.Screen name={ROUTES.CUSTOMER_SERVICES} component={CustomerServicesScreen} />
      <Stack.Screen name={ROUTES.CUSTOMER_ABOUT} component={CustomerAboutScreen} />
      <Stack.Screen name={ROUTES.CUSTOMER_CONTACT} component={CustomerContactScreen} />
      <Stack.Screen name={ROUTES.CUSTOMER_CART} component={CustomerCartScreen} />
      <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default CustomerNav;
