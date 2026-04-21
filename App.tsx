import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppNav from './src/navigations';
import store from './src/app/store';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <AppNav />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                
  },
});

export default App;
