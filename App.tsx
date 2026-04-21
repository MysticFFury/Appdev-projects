import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNav from './src/navigations'

function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <AppNav />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                
  },
});

export default App;
