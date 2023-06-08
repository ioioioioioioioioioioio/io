import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, StyleSheet } from 'react-native';

import { RootStackParamList } from '../App';
import ListElem from '../components/ListElem';

export type Feature = {
  title: string;
  // We should be able to find a better way to do this other than listing all possible screen names
  screenName:
    | 'PetScreen'
    | 'InfoScreen'
    | 'AddEntryScreen'
    | 'EditScreen'
    | 'EntryListScreen'
    | 'AddAccountScreen'
    | 'FilteredEntryListScreen'
    | 'AccountListScreen';
  props: any;
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
        <ListElem
          title={item.title}
          onPress={() => navigation.navigate(item.screenName, item.props)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e6e6',
  },
});
