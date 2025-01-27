import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, FlatList } from 'react-native';

import { RootStackParamList } from '../App';
import ListElem from '../components/ListElem';

export type Feature = {
  title: string;
  // We should be able to find a better way to do this other than listing all possible screen names
  screenName: 'PetScreen' | 'InfoScreen' | 'AddEntryScreen';
};

type FeaturesScreenProps = NativeStackScreenProps<RootStackParamList, 'FeaturesScreen'>;

export default function FeaturesScreen({
  route: {
    params: { features },
  },
  navigation,
}: FeaturesScreenProps) {
  return (
    <FlatList
      style={styles.container}
      data={features}
      renderItem={({ item }) => (
        <ListElem title={item.title} onPress={() => navigation.navigate(item.screenName)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
  },
});
