import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import { RootStackParamList } from '../App';
import Button from '../components/Button';

type AddAccountScreenProps = NativeStackScreenProps<RootStackParamList, 'AddAccountScreen'>;

export default function AddEntryScreen({ navigation }: AddAccountScreenProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const defaultName = 'New account';
  const amountInput = useRef<TextInput>(null);

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

      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()}>
          <MaterialIcons name="cancel" size={buttonSize} color="black" />
        </Button>
        <Button>
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
    width: 110,
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
});
