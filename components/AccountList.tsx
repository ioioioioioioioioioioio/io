import { useState } from 'react';
import React, { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import useTheme, { ColorTheme } from '../colors/Colors';
import { Account } from '../redux/slices/accountSlice';

type AccountListProps = {
  accounts: Account[];
  navigation: any;
};

export default function AccountList({ accounts }: AccountListProps) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const sortedAccounts = [...accounts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.amount - b.amount;
    } else {
      return b.amount - a.amount;
    }
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        }}>
        <Text style={styles.text}>
          {sortOrder === 'asc' ? 'Sort descending' : 'Sort Ascending'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={sortedAccounts}
        renderItem={({ item }) => (
          <View style={styles.accountContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>{item.name} </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Text style={styles.text}>{Math.round(item.amount * 100) / 100}</Text>
            </View>
            <View style={{ marginLeft: 3, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>{item.currency} </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const useStyles = (theme: ColorTheme) =>
  StyleSheet.create({
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
    accountContainer: {
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
  });
