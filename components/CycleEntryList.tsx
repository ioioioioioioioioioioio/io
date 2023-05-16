import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Button from './Button';
import CategoryLabel from './CategoryLabel';
import useTheme, { ColorTheme } from '../colors/Colors';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
  CycleEntryState,
  removeCyclicEntry,
  selectCyclicEntries,
} from '../redux/slices/cyclicEntrySlice';

type CycleEntryListProps = {
  entries: CycleEntryState[];
  navigation: any;
};

function Entry({
  id,
  name,
  amount,
  category,
  cycle,
  onPress,
}: CycleEntryState & { onPress: () => void }) {
  const theme = useTheme();
  const styles = useStyles(theme);
  return id ? (
    <TouchableOpacity style={styles.entryContainer} onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button
          onPress={() => {
            onPress(); // Call the parent onPress to update the entries state
          }}
          style={{ alignItems: 'center' }}>
          <MaterialIcons name="close" size={30} color={theme.primary} />
        </Button>
        <Text style={styles.text}>{name} </Text>
        <CategoryLabel title={category?.categoryName} color={category?.categoryColor} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.text}>{amount}</Text>
        <MaterialCommunityIcons name="arrow-right" color={theme.textPrimary} size={20} />
      </View>
    </TouchableOpacity>
  ) : null;
}

export default function CycleEntryList({ navigation }: CycleEntryListProps) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const entries = useAppSelector((state) => selectCyclicEntries(state));
  const [updatedEntries, setUpdatedEntries] = useState(entries);
  const dispatch = useAppDispatch();

  const handleEntryPress = (id: number) => {
    dispatch(removeCyclicEntry(id));
  };

  useEffect(() => {
    setUpdatedEntries(entries); // Update the local state when entries change
  }, [entries]);

  return (
    <View style={styles.container}>
      <FlatList
        data={updatedEntries}
        renderItem={({ item }) => <Entry {...item} onPress={() => handleEntryPress(item.id)} />}
        keyExtractor={(item) => String(item ? item.id : Math.random())}
      />
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