import { useState } from 'react';
import React, { StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';

import useTheme, { ColorTheme } from '../colors/Colors';
import CycleEntryList from '../components/CycleEntryList';
import EntryList from '../components/EntryList';
import { useAppSelector } from '../redux/hooks';
import { selectEntries, selectCyclicEntries } from '../redux/slices/entrySlice';
import useTypedNavigation from '../utils/useTypedNavigation';

export default function FilteredEntryListScreen() {
  const [isCyclicList, setIsCyclicList] = useState(false);
  const expenses = useAppSelector((state) => selectEntries(state));
  const cyclicExpenses = useAppSelector((state) => selectCyclicEntries(state));
  const navigation = useTypedNavigation();

  // Duplicate entries to test scrolling
  const toggleSwitch = () => {
    setIsCyclicList((isCyclicList) => !isCyclicList);
  };
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Switch
          onValueChange={toggleSwitch}
          value={isCyclicList}
          trackColor={{ false: theme.containerPrimary, true: theme.containerPrimary }}
          thumbColor={theme.primary}
        />
        {!isCyclicList && <Text style={styles.titleText}>Your recent expenses</Text>}
        {isCyclicList && <Text style={styles.titleText}>Your cyclic expenses</Text>}
      </View>
      {!isCyclicList && <EntryList entries={expenses} navigation={navigation} />}
      {isCyclicList && <CycleEntryList entries={cyclicExpenses} navigation={navigation} />}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FilteredEntryListScreen')}>
        <Text style={styles.text}>Update Filter...</Text>
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
      flexDirection: 'column',
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
