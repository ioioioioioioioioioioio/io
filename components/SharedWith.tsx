import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import React, {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import useTheme, { ColorTheme } from '../colors/Colors';

export type SharedWithProps = {
  people: string[];
  setPeople: (people: string[]) => void;
};
export default function SharedWith({ people, setPeople }: SharedWithProps) {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPersonName, setNewPersonName] = useState('');

  // Const holding a modal that allows adding a person to the peoplelist using setPeople
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This bill is shared with</Text>
      <FlatList
        contentContainerStyle={styles.listStyle}
        data={people}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={(item: any) => (
          <TouchableOpacity
            style={styles.listElement}
            onPress={() => {
              setPeople(people.filter((person, index) => person !== item.item || index === 0));
            }}>
            <MaterialIcons name="person" />
            <Text>{item.item}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            onPress={() => {
              setNewPersonName('');
              setModalVisible(true);
            }}
            style={styles.button}>
            <Text>Add</Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: theme.backgroundPrimary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.titleText}>Add a person</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="Enter a name"
            placeholderTextColor={theme.textSecondary}
            value={newPersonName}
            onChangeText={setNewPersonName}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (newPersonName === '') {
                  alert("The person's name cannot be empty");
                  return;
                }
                setPeople([...people, newPersonName]);
                setModalVisible(false);
              }}>
              <Text>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const useStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      height: 100,
      borderColor: theme.primary,
    },
    listStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      color: theme.textPrimary,
      fontSize: 20,
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: theme.secondary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginHorizontal: 10,
    },
    listElement: {
      flexDirection: 'row',
      backgroundColor: theme.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginHorizontal: 10,
      alignItems: 'center',
    },
    text: {
      color: theme.textPrimary,
    },
    nameInput: {
      backgroundColor: theme.backgroundTertiary,
      borderRadius: 5,
      textAlign: 'center',
      paddingVertical: 10,
      paddingHorizontal: 45,
      marginVertical: 20,
      color: theme.textPrimary,
    },
  });
