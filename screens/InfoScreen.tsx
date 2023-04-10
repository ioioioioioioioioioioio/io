import { StyleSheet, View, Text } from 'react-native';

import { useAppSelector } from '../redux/hooks';

export type Feature = {
  title: string;
  // We should be able to find a better way to do this other than listing all possible screen names
  screenName: 'PetScreen';
};

export default function InfoScreen() {
  const happiness = useAppSelector((state) => state.penguin.happiness);
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your penguin info:</Text>
      <Text>Penguin's happiness: {happiness}</Text>
      <Text style={styles.titleText}>Go and pet him!!! And come back here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
