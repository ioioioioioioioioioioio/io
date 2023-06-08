import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import { Moment } from 'moment';
import { useState } from 'react';
import React, {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  Modal,
  TextInput,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

import useTheme, { ColorTheme } from '../colors/Colors';
import Button from '../components/Button';
import CategoryList from '../components/CategoryList';
import EntryList from '../components/EntryList';
import { useAppSelector } from '../redux/hooks';
import { selectEntries, selectCyclicEntries } from '../redux/slices/entrySlice';
import useTypedNavigation from '../utils/useTypedNavigation';

export default function FilteredEntryListScreen() {
  const [isCyclicList, setIsCyclicList] = useState(false);
  const expenses = useAppSelector((state) => selectEntries(state));
  const cyclicExpenses = useAppSelector((state) => selectCyclicEntries(state));
  const navigation = useTypedNavigation();
  const [selectedCategoryName, setSelectedCategoryName] = useState('No Category');
  const [selectedCategoryColor, setSelectedCategoryColor] = useState('#ddff00');
  const [, setSelectedCategoryId] = useState(0);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [showStartCalendarModal, setShowStartCalendarModal] = useState(false);
  const [showEndCalendarModal, setShowEndCalendarModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date('2001-01-01T00:00:00.000Z'));
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [startAmount, setStartAmount] = useState('');
  const [endAmount, setEndAmount] = useState('');

  // Duplicate entries to test scrolling
  const toggleSwitch = () => {
    setIsCyclicList((isCyclicList) => !isCyclicList);
  };

  const formattedStartDate =
    selectedStartDate.getDate() +
    '.' +
    (selectedStartDate.getMonth() + 1) +
    '.' +
    selectedStartDate.getFullYear();

  const formattedEndDate =
    selectedEndDate.getDate() +
    '.' +
    (selectedEndDate.getMonth() + 1) +
    '.' +
    selectedEndDate.getFullYear();

  const onStartDateChange = (date: Moment) => {
    setSelectedStartDate(date.toDate());
  };
  const onEndDateChange = (date: Moment) => {
    setSelectedEndDate(date.toDate());
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
        <View style={styles.colContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.detailContainer}>
              <Text style={styles.text}>Choose Category</Text>
              <AntDesign style={styles.icon} name="folder1" size={45} color="white" />
              <TouchableOpacity
                style={{
                  backgroundColor: selectedCategoryColor,
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={() => setShowCategoryList(!showCategoryList)}>
                <Text style={styles.detailText}>
                  {selectedCategoryName === '' ? 'Select category' : selectedCategoryName}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.detailContainer}>
              <Text style={styles.text}>Choose Range</Text>
              <AntDesign style={styles.icon} name="aliyun" size={45} color="white" />
              <TextInput
                style={[styles.amountInput]}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(startAmount) => setStartAmount(startAmount.replace('-', ''))}
                value={startAmount}
                // ref={amountInput}
                // onSubmitEditing={onSubmitEntry}
              />
              <AntDesign name="minus" size={45} color="white" />
              <TextInput
                style={[styles.amountInput]}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={(endAmount) => setEndAmount(endAmount.replace('-', ''))}
                value={endAmount}
                // ref={amountInput}
                // onSubmitEditing={onSubmitEntry}
              />
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
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.detailContainer}>
              <Text style={styles.text}>Choose Date </Text>
              <AntDesign style={styles.icon} name="calendar" size={45} color="white" />
              <TouchableOpacity onPress={() => setShowStartCalendarModal(true)}>
                <Text style={styles.text}>{selectedStartDate ? formattedStartDate : '-'}</Text>
              </TouchableOpacity>
              <AntDesign style={styles.icon} name="minus" size={45} color="white" />
              <TouchableOpacity onPress={() => setShowEndCalendarModal(true)}>
                <Text style={styles.text}>{formattedEndDate}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Modal visible={showStartCalendarModal} style={styles.modalContainer}>
                <CalendarPicker onDateChange={onStartDateChange} />
                <Button
                  onPress={() => setShowStartCalendarModal(false)}
                  style={{ alignItems: 'center' }}>
                  <MaterialIcons name="check-circle" size={buttonSize} color="black" />
                </Button>
              </Modal>
              <Modal visible={showEndCalendarModal} style={styles.modalContainer}>
                <CalendarPicker onDateChange={onEndDateChange} />
                <Button
                  onPress={() => setShowEndCalendarModal(false)}
                  style={{ alignItems: 'center' }}>
                  <MaterialIcons name="check-circle" size={buttonSize} color="black" />
                </Button>
              </Modal>
            </View>
          </View>
        </View>
      </View>
      <EntryList entries={isCyclicList ? cyclicExpenses : expenses} navigation={navigation} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FilteredEntryListScreen')}>
        <Text style={styles.text}>Update Filter...</Text>
      </TouchableOpacity>
    </View>
  );
}

const buttonSize = 50;
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
    detailContainer: {
      paddingLeft: 10,
      color: 'white',
      flexDirection: 'row',
      // justifyContent: 'flex-start',
      alignItems: 'center',
      // borderBottomWidth: 1,
    },
    text: {
      color: theme.textPrimary,
    },
    detailText: {
      paddingLeft: 10,
    },
    accountListStyle: {
      height: 100,
      marginHorizontal: 50,
    },
    modalContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rowContainer: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    colContainer: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    amountInput: {
      width: 70,
      textAlign: 'center',
      fontSize: 20,
      color: 'white',
      borderWidth: 4,
      borderRadius: 10,
      borderColor: 'white',
    },
    icon: {
      padding: 10,
    },
  });
