import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../screens/auth/Login';
import Register from '../../screens/auth/Register';
import { ROUTES } from '../../utils';
import { colors } from '../../theme';

const Stack = createStackNavigator();

function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.bgBase },
      }}
    >
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
    </Stack.Navigator>
  );
}

export default AuthNav;
