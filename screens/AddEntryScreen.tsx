import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';

import { RootStackParamList } from '../App';
import Button from '../components/Button';
import { useAppDispatch } from '../redux/hooks';
import { addEntry } from '../redux/slices/entrySlice';

type AddEntryScreenProps = NativeStackScreenProps<RootStackParamList, 'AddEntryScreen'>;

export default function AddEntryScreen({ navigation }: AddEntryScreenProps) {
  const dispatch = useAppDispatch();

  const [isIncome, setIsIncome] = React.useState(false);
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const defaultName = isIncome ? 'New income' : 'New expense';

  const onSubmitEntry = React.useCallback(() => {
    const finalName = name.length === 0 ? defaultName : name;
    const numericAmount = isIncome ? Number(amount) : -Number(amount);

    if (amount === '' || Number.isNaN(numericAmount)) {
      Alert.alert('Invalid amount', 'Please enter a correct amount');
      return;
    }

    dispatch(addEntry({ name: finalName, amount: numericAmount }));
    navigation.goBack();
  }, [name, amount, isIncome, navigation]);

  const amountInput = React.useRef<TextInput>(null);

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
          style={[
            styles.amountInput,
            isIncome ? styles.incomeAmountInput : styles.expenseAmountInput,
          ]}
          placeholder="0"
          keyboardType="numeric"
          onChangeText={(amount) => setAmount(amount.replace('-', ''))}
          value={amount}
          ref={amountInput}
          onSubmitEditing={onSubmitEntry}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()}>
          <MaterialIcons name="cancel" size={buttonSize} color="black" />
        </Button>
        <Button onPress={() => setIsIncome((v) => !v)}>
          <AntDesign name="swap" size={buttonSize} color="black" />
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
    alignItems: 'center',
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
  expenseAmountInput: {
    borderColor: 'red',
    backgroundColor: 'darkred',
  },
  incomeAmountInput: {
    borderColor: 'green',
    backgroundColor: 'lightgreen',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom: 50,
    width: '80%',
    justifyContent: 'space-around',
  },
});
