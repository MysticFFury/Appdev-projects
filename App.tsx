import React, { useEffect } from 'react';
import { StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import AppNav from './src/navigations';
import toastConfig from './src/components/AlertMsg/config';
import store from './src/app/store';
import WebSocketProvider from './src/components/WebSocketProvider';

function App() {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
          await PermissionsAndroid.request(
            'android.permission.POST_NOTIFICATIONS' as any
          );
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestNotificationPermission();
  }, []);

  return (
    <Provider store={store}>
      <WebSocketProvider>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaProvider style={styles.container}>
            <AppNav />
            <Toast config={toastConfig} />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </WebSocketProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                // Takes up the full screen height
    // backgroundColor: '#fff', // White background
    // justifyContent: 'center', // Centers content vertically
    // alignItems: 'center',     // Centers content horizontally
  },
});

export default App;