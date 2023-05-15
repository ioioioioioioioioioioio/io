import { MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Moment } from 'moment';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Text, TouchableOpacity, Modal } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { CheckBox } from 'react-native-elements';

import { RootStackParamList } from '../App';
import Button from '../components/Button';
import CategoryList from '../components/CategoryList';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateEntry, selectOneEntry } from '../redux/slices/entrySlice';

type EditScreenProps = NativeStackScreenProps<RootStackParamList, 'EditScreen'>;

export default function EditScreen({ navigation }: EditScreenProps) {
  const dispatch = useAppDispatch();

  const [isIncome, setIsIncome] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [selectedCategoryColor, setSelectedCategoryColor] = useState('');
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [cyclicExpenseChecked, setCyclicExpenseChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCycleTime, setSelectedCycleTime] = useState('Timestamp');

  const selectedEntry = useAppSelector((state) => selectOneEntry(3)(state)); // Zmieniony sposób pobierania wybranego wpisu

  useEffect(() => {
    if (selectedEntry) {
      setIsIncome(selectedEntry.amount >= 0);
      setName(selectedEntry.name);
      setAmount(Math.abs(selectedEntry.amount).toString());
      // setSelectedCategoryName(firstEntry.category.name);
      // setSelectedCategoryColor(firstEntry.category.color);
      // setSelectedDate(firstEntry.selectedDate);
      // setCyclicExpenseChecked(firstEntry.cyclicExpense);
      // setSelectedCycleTime(firstEntry.selectedCycleTime);
    } else {
      navigation.navigate('AddEntryScreen');
    }
  }, [selectedEntry, navigation]);

  const onDateChange = (date: Moment) => {
    setSelectedDate(date.toDate());
  };

  const onSubmitEntry = React.useCallback(() => {
    const numericAmount = isIncome ? Number(amount) : -Number(amount);

    if (amount === '' || Number.isNaN(numericAmount)) {
      Alert.alert('Invalid amount', 'Please enter a correct amount');
      return;
    }

    dispatch(
      updateEntry({
        id: selectedEntry ? selectedEntry.id : 0,
        name,
        amount: numericAmount,
        // other updated properties
      })
    );
    navigation.goBack();
  }, [name, amount, isIncome, navigation]);

  const amountInput = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.nameInput}
          autoFocus
          placeholder={name}
          onChangeText={setName}
          value={name}
          onSubmitEditing={() => amountInput?.current?.focus()}
        />
        <TextInput
          style={[
            styles.amountInput,
            isIncome ? styles.incomeAmountInput : styles.expenseAmountInput,
          ]}
          placeholder={amount}
          keyboardType="numeric"
          onChangeText={(amount) => setAmount(amount.replace('-', ''))}
          value={amount}
          ref={amountInput}
          onSubmitEditing={onSubmitEntry}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text>Details</Text>
        <View style={styles.detailContainer}>
          <MaterialIcons name="folder" size={buttonSize} color="black" />
          <TouchableOpacity
            style={{
              backgroundColor: selectedCategoryColor,
              padding: 10,
              borderRadius: 5,
            }}
            onPress={() => setShowCategoryList(!showCategoryList)}>
            <Text style={styles.detailText}>
              {selectedCategoryName === '' ? 'select category' : selectedCategoryName}
            </Text>
          </TouchableOpacity>
        </View>
        {showCategoryList && (
          <CategoryList
            onCategorySelect={(category) => {
              setSelectedCategoryName(category.categoryName);
              setSelectedCategoryColor(category.categoryColor);
              setShowCategoryList(false);
            }}
          />
        )}
        <View style={styles.detailContainer}>
          <Button
            onPress={() => setShowCalendarModal(true)}
            style={{ paddingBottom: 5, paddingRight: 10 }}>
            <AntDesign name="calendar" size={45} />
          </Button>
          <Text style={styles.detailText}>
            {selectedDate.getDate() +
              '.' +
              (selectedDate.getMonth() + 1) +
              '.' +
              selectedDate.getFullYear()}
          </Text>
        </View>
        <View style={styles.cyclicContainer}>
          <CheckBox
            title="Cyclic expense"
            onPress={() => setCyclicExpenseChecked(!cyclicExpenseChecked)}
            checked={cyclicExpenseChecked}
            checkedColor="black"
            size={40}
            center
            containerStyle={styles.cyclicCheckbox}
          />
          <View>
            {cyclicExpenseChecked && (
              <SelectList
                search={false}
                setSelected={setSelectedCycleTime}
                placeholder={selectedCycleTime}
                data={[
                  { key: '1', value: 'Weekly' },
                  { key: '2', value: 'Monthly' },
                  { key: '3', value: 'Yearly' },
                ]}
              />
            )}
          </View>
        </View>
        <View>
          <Modal visible={showCalendarModal} style={styles.modalContainer}>
            <CalendarPicker onDateChange={onDateChange} />
            <Button onPress={() => setShowCalendarModal(false)} style={{ alignItems: 'center' }}>
              <MaterialIcons name="cancel" size={buttonSize} color="black" />
            </Button>
          </Modal>
        </View>
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
    paddingHorizontal: 30,
    justifyContent: 'space-around',
  },
  detailContainer: {
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
  },
  detailText: {
    paddingLeft: 10,
  },
  cyclicContainer: {
    zIndex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  cyclicCheckbox: {
    borderColor: '#e6e6e6',
    backgroundColor: '#e6e6e6',
  },
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});