import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Text, Alert } from 'react-native';

import { RootStackParamList } from '../App';
import Button from '../components/Button';
import { useAppDispatch } from '../redux/hooks';
import { addAccount } from '../redux/slices/accountSlice';

type AddAccountScreenProps = NativeStackScreenProps<RootStackParamList, 'AddAccountScreen'>;

export default function AddEntryScreen({ navigation }: AddAccountScreenProps) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('PLN'); // Domyślna waluta (można zmienić na inną)

  const defaultName = 'New account';
  const amountInput = useRef<TextInput>(null);

  const onSubmitEntry = React.useCallback(() => {
    const finalName = name.length === 0 ? defaultName : name;
    const numericAmount = Number(amount);
    if (amount === '' || Number.isNaN(numericAmount)) {
      Alert.alert('Invalid amount', 'Please enter a correct amount');
      return;
    }
    dispatch(
      addAccount({
        name: finalName,
        amount: numericAmount,
        currency:currency,
      })
    );
    navigation.goBack();
  }, [name, amount]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.nameInput}
          autoFocus
          placeholder={defaultName}
          onChangeText={setName}
          value={name}
          onSubmitEditing={() => amountInput?.current?.focus()}
        />
        <TextInput
          style={[styles.amountInput, styles.incomeAmountInput]}
          placeholder="0"
          keyboardType="numeric"
          onChangeText={(amount) => setAmount(amount.replace('-', ''))}
          value={amount}
          ref={amountInput}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.pickerContainer}>
          <Text>Choose currency</Text>
          <Picker
            style={styles.currencyPicker}
            selectedValue={currency}
            onValueChange={(itemValue) => setCurrency(itemValue)}>
            <Picker.Item label="PLN" value="PLN" />
            <Picker.Item label="USD" value="USD" />
            <Picker.Item label="EUR" value="EUR" />
            <Picker.Item label="GBP" value="GBP" />
          </Picker>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()}>
          <MaterialIcons name="cancel" size={buttonSize} color="black" />
        </Button>
        <Button onPress={onSubmitEntry}>
          <FontAwesome5 name="check" size={buttonSize} color="black" />
        </Button>
      </View>
    </View>
  );
}

const buttonSize = 50;
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#e6e6e6',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nameInput: {
    fontSize: 30,
    width: 200,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  amountInput: {
    width: 150,
    textAlign: 'center',
    fontSize: 40,
    borderWidth: 5,
    borderRadius: 50,
  },
  incomeAmountInput: {
    borderColor: 'green',
    backgroundColor: 'lightgreen',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom: 50,
    paddingHorizontal: 30,
    justifyContent: 'space-around',
  },
  currencyPicker: {
    width: 150,
    height: 50,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  detailsContainer: {
    flex: 1,
    flexGrow: 1,
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
  },
});
