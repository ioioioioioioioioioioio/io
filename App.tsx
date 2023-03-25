import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Test from './screens/PetScreen';
export default function App() {
  return (
    <View style={styles.container}>
      <Test />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
