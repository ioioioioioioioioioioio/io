import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import useTheme, { ColorTheme } from '../colors/Colors';
import { useAppSelector } from '../redux/hooks';
import type { EntryState } from '../redux/slices/entrySlice';
import { selectEntries } from '../redux/slices/entrySlice';
import useTypedNavigation from '../utils/useTypedNavigation';

function Entry({ name, amount }: EntryState) {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <TouchableOpacity style={styles.entryContainer}>
      <Text style={styles.text}>{name} </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.text}>{amount}</Text>
        <MaterialCommunityIcons name="arrow-right" color={theme.textPrimary} size={20} />
      </View>
    </TouchableOpacity>
  );
}

export default function EntryListScreen() {
  const navigation = useTypedNavigation();
  const entries1 = useAppSelector((state) => selectEntries(state));
  // Duplicate entries to test scrolling
  const entries = [...entries1, ...entries1, ...entries1, ...entries1, ...entries1];
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your recent expenses</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={entries}
          renderItem={({ item }) => <Entry {...item} />}
          keyExtractor={(item) => String(item.id * Math.random())}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEntryScreen')}>
        <Text style={styles.text}>Add new entry</Text>
      </TouchableOpacity>
    </View>
  );
}

const useStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      padding: 30,
    },
    container: {
      backgroundColor: theme.backgroundPrimary,
      flex: 1,
      borderColor: theme.primary,
      borderWidth: 2,
      borderRadius: 15,
      padding: 10,
      marginTop: 10,
      marginBottom: 30,
    },
    titleContainer: {
      alignItems: 'center',
    },
    titleText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.textPrimary,
    },
    button: {
      width: 150,
      padding: 5,
      color: theme.textPrimary,
      backgroundColor: theme.secondary,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    entryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      padding: 10,
      borderColor: 'black',
      backgroundColor: theme.backgroundPrimary,
      borderRadius: 5,
    },
    text: {
      color: theme.textPrimary,
    },
  });
