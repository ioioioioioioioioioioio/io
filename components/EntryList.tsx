import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Button from './Button';
import CategoryLabel from './CategoryLabel';
import useTheme, { ColorTheme } from '../colors/Colors';
import { useAppDispatch } from '../redux/hooks';
import { Account } from '../redux/slices/accountSlice';
import { Category } from '../redux/slices/categoriesSlice';
import { Cycle, EntryState, removeEntry, updateEntry } from '../redux/slices/entrySlice';

type EntryListProps = {
  entries: EntryState[];
  navigation: any;
};

function Entry({
  name,
  amount,
  category,
  done,
  cycle,
  onPress,
  onLongPress,
  onDelete,
}: EntryState & { onPress: () => void } & { onLongPress: () => void } & { onDelete: () => void }) {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <TouchableOpacity style={styles.entryContainer} onPress={onPress} onLongPress={onLongPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button
          onPress={() => {
            onDelete();
          }}
          style={{ alignItems: 'center' }}>
          <MaterialIcons name="close" size={30} color={theme.primary} />
        </Button>
        {!done && cycle === Cycle.Undefined && (
          <AntDesign name="hourglass" color={theme.primary} style={{ paddingRight: 2 }} size={20} />
        )}
        <Text style={styles.text}>{name} </Text>
        <CategoryLabel title={category?.categoryName} color={category?.categoryColor} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.text}>{amount}</Text>
        <MaterialCommunityIcons name="arrow-right" color={theme.textPrimary} size={20} />
      </View>
    </TouchableOpacity>
  );
}

export default function EntryList({ entries, navigation }: EntryListProps) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const dispatch = useAppDispatch();
  const handleEntryDelete = (id: number) => {
    dispatch(removeEntry(id));
  };

  const handleLongPress = (
    id: number,
    name: string,
    amount: number,
    category: Category,
    done: boolean,
    date: Date,
    imageUri: string | null,
    account: Account,
    cycle: Cycle
  ) => {
    dispatch(
      updateEntry({
        id,
        name,
        amount,
        category,
        done: !done,
        date,
        imageUri,
        account,
        cycle,
      })
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={entries}
        renderItem={({ item }) => (
          <Entry
            {...item}
            onLongPress={() =>
              handleLongPress(
                item.id,
                item.name,
                item.amount,
                item.category,
                item.done,
                item.date,
                item.imageUri,
                item.account,
                item.cycle
              )
            }
            onPress={() => navigation.navigate('EditScreen', { id: item.id })}
            onDelete={() => handleEntryDelete(item.id)}
          />
        )}
        keyExtractor={(item) => String(item.id * Math.random())}
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
