import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Moment } from 'moment';
import { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

import useTheme, { ColorTheme } from '../colors/Colors';
import Button from '../components/Button';
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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text style={styles.dateSelectorText}>From:</Text>
          <View style={styles.dateSelectorContainer}>
            <AntDesign name="calendar" size={45} color={theme.textPrimary} />
            <TouchableOpacity onPress={() => setShowCalendarModal('from')}>
              <Text style={styles.dateSelectorText}>{formattedDates[0]}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.dateSelectorText}>To:</Text>
          <View style={styles.dateSelectorContainer}>
            <AntDesign name="calendar" size={45} color={theme.textPrimary} />
            <TouchableOpacity onPress={() => setShowCalendarModal('to')}>
              <Text style={styles.dateSelectorText}>{formattedDates[1]}</Text>
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
        <Chart begin={selectedDates[0]} end={selectedDates[1]} />
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
    dateSelectorContainer: {
      paddingLeft: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    dateSelectorText: {
      paddingLeft: 10,
      color: theme.textPrimary,
    },
    modalContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
