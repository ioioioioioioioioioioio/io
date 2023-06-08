import React, { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import useTheme, { ColorTheme } from '../colors/Colors';
import AccountList from '../components/AccountList';
import { useAppSelector } from '../redux/hooks';
import useTypedNavigation from '../utils/useTypedNavigation';

export default function AccountListScreen() {
  const accountsList = useAppSelector((state) => state.accounts.accounts);
  const navigation = useTypedNavigation();

  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer} />
      <AccountList accounts={accountsList} navigation={navigation} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddAccountScreen')}>
        <Text style={styles.text}>Add new Account</Text>
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
    titleContainer: {
      flexDirection: 'column',
      alignItems: 'center',
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

    text: {
      color: theme.textPrimary,
    },
  });
