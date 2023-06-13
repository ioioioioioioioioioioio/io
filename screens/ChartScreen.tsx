import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Moment } from 'moment';
import { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

import useTheme, { ColorTheme } from '../colors/Colors';
import Button from '../components/Button';
import CategoryList from '../components/CategoryList';
import Chart from '../components/Chart';

const weekInMs = 7 * 24 * 60 * 60 * 1000;

export default () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const [showCalendarModal, setShowCalendarModal] = useState<false | 'from' | 'to'>(false);
  // Default time range is one week
  const [selectedDates, setSelectedDates] = useState([
    new Date(new Date().getTime() - weekInMs),
    new Date(),
  ]);

  const formattedDates = selectedDates.map(
    (d) => d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear()
  );

  const onDateChange = (which: 'from' | 'to') => (date: Moment) => {
    if (which === 'from') {
      setSelectedDates((dates) => [date.toDate(), dates[1]]);
    } else {
      setSelectedDates((dates) => [dates[0], date.toDate()]);
    }
  };

  const [showCategoryList, setShowCategoryList] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState('#ddff00');
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text style={styles.text}>From:</Text>
          <View style={styles.selectorContainer}>
            <AntDesign name="calendar" size={45} color={theme.textPrimary} />
            <TouchableOpacity onPress={() => setShowCalendarModal('from')}>
              <Text style={styles.text}>{formattedDates[0]}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.text}>To:</Text>
          <View style={styles.selectorContainer}>
            <AntDesign name="calendar" size={45} color={theme.textPrimary} />
            <TouchableOpacity onPress={() => setShowCalendarModal('to')}>
              <Text style={styles.text}>{formattedDates[1]}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Modal visible={showCalendarModal === 'from'} style={styles.modalContainer}>
            <CalendarPicker onDateChange={onDateChange('from')} />
            <Button onPress={() => setShowCalendarModal(false)} style={{ alignItems: 'center' }}>
              <MaterialIcons name="check-circle" size={50} color="black" />
            </Button>
          </Modal>
        </View>
        <View>
          <Modal visible={showCalendarModal === 'to'} style={styles.modalContainer}>
            <CalendarPicker onDateChange={onDateChange('to')} />
            <Button onPress={() => setShowCalendarModal(false)} style={{ alignItems: 'center' }}>
              <MaterialIcons name="check-circle" size={50} color="black" />
            </Button>
          </Modal>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.text}>Category:</Text>
          <View style={styles.selectorContainer}>
            <MaterialIcons name="folder" size={50} color="white" />
            <TouchableOpacity
              style={{
                backgroundColor: selectedCategoryColor,
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => setShowCategoryList(!showCategoryList)}>
              <Text style={styles.text}>{selectedCategoryName ?? 'Select category'}</Text>
            </TouchableOpacity>
          </View>
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
        <Chart begin={selectedDates[0]} end={selectedDates[1]} categoryID={selectedCategoryId} />
      </View>
    </View>
  );
};

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
    sectionContainer: {
      flexDirection: 'column',
      gap: 5,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderColor: theme.primary,
    },
    selectorContainer: {
      paddingLeft: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    text: {
      paddingLeft: 10,
      color: theme.textPrimary,
    },
    modalContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
