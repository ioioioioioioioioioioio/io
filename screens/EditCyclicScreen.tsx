/* eslint-disable no-lone-blocks */
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { copyAsync, deleteAsync, documentDirectory } from 'expo-file-system';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { Moment } from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { useSelector } from 'react-redux';

import { RootStackParamList } from '../App';
import Button from '../components/Button';
import CategoryList from '../components/CategoryList';
import PhotoButton from '../components/PhotoButton';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { findCategory } from '../redux/slices/categoriesSlice';
import { Cycle, selectOneEntry, updateEntry } from '../redux/slices/cyclicEntrySlice';
import { RootState } from '../redux/store';

type EditCyclicScreenProps = NativeStackScreenProps<RootStackParamList, 'EditCyclicScreen'>;

export default function EditCyclicScreen({
  route: {
    params: { id },
  },
  navigation,
}: EditCyclicScreenProps) {
  const dispatch = useAppDispatch();

  const [isIncome, setIsIncome] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [selectedCategoryColor, setSelectedCategoryColor] = useState('');
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCycleTime, setSelectedCycleTime] = useState(Cycle.Undefined);
  const [selectedImageURI, setSelectedImageURI] = useState<string | null>(null);

  const defaultName = isIncome ? 'New income' : 'New expense';
  const stateCategory = useSelector((state: RootState) => state);
  const formattedDate =
    selectedDate.getDate() + '.' + (selectedDate.getMonth() + 1) + '.' + selectedDate.getFullYear();

  const selectedEntry = useAppSelector((state) => selectOneEntry(id)(state));

  useEffect(() => {
    if (selectedEntry) {
      setIsIncome(selectedEntry.amount >= 0);
      setName(selectedEntry.name);
      setAmount(Math.abs(selectedEntry.amount).toString());
      setSelectedImageURI(selectedEntry.imageUri);
      setSelectedCategoryId(selectedEntry.category.id);
      setSelectedCategoryName(selectedEntry.category.categoryName);
      setSelectedCategoryColor(selectedEntry.category.categoryColor);
      setSelectedCycleTime(selectedEntry.cycle);
      // eslint-disable-next-line no-lone-blocks
      {
        selectedEntry && selectedEntry.date && setSelectedDate(selectedEntry.date);
      }
    } else {
      navigation.navigate('AddEntryScreen');
    }
  }, [selectedEntry, navigation]);

  const onDateChange = (date: Moment) => {
    setSelectedDate(date.toDate());
  };

  const onSubmitEntry = React.useCallback(() => {
    const numericAmount = isIncome ? Number(amount) : -Number(amount);
    const foundCategory = findCategory(stateCategory, selectedCategoryId);

    if (amount === '' || Number.isNaN(numericAmount)) {
      Alert.alert('Invalid amount', 'Please enter a correct amount');
      return;
    }
    if (foundCategory) {
      dispatch(
        updateEntry({
          id: selectedEntry ? selectedEntry.id : 0,
          name,
          amount: numericAmount,
          category: foundCategory,
          date: selectedDate,
          imageUri: selectedImageURI,
          cycle: selectedCycleTime,
        })
      );
    }
    navigation.goBack();
  }, [
    name,
    amount,
    isIncome,
    navigation,
    selectedCategoryId,
    selectedDate,
    selectedImageURI,
    selectedCycleTime,
  ]);

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
              setSelectedCategoryId(category.id);
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
          <Text style={styles.detailText}>{formattedDate}</Text>
        </View>
        <View>
          <Modal visible={showCalendarModal} style={styles.modalContainer}>
            <CalendarPicker onDateChange={onDateChange} />
            <Button onPress={() => setShowCalendarModal(false)} style={{ alignItems: 'center' }}>
              <MaterialIcons name="cancel" size={buttonSize} color="black" />
            </Button>
          </Modal>
        </View>
        <View style={styles.detailContainer}>
          <MaterialIcons name="photo" size={buttonSize} color="black" />
          <TouchableOpacity
            onPress={async () => {
              const result = await launchImageLibraryAsync({
                allowsEditing: true,
                allowsMultipleSelection: false,
                mediaTypes: MediaTypeOptions.Images,
              });
              if (!result.canceled) {
                if (selectedImageURI) {
                  deleteAsync(selectedImageURI);
                }

                const uri = `${documentDirectory}entry-${Date.now()}`;
                const photo = result.assets[0];
                copyAsync({ from: photo.uri, to: uri });
                setSelectedImageURI(uri);
              }
            }}>
            <Text style={styles.detailText}>Add a photo</Text>
          </TouchableOpacity>
          {selectedImageURI && <PhotoButton uri={selectedImageURI} />}
        </View>
        <View style={styles.cycleContainer}>
          <SelectList
            search={false}
            setSelected={setSelectedCycleTime}
            placeholder={selectedCycleTime}
            data={[
              { key: Cycle.Day, value: Cycle.Day },
              { key: Cycle.Week, value: Cycle.Week },
              { key: Cycle.Month, value: Cycle.Month },
              { key: Cycle.Year, value: Cycle.Year },
            ]}
          />
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
  cycleContainer: {
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