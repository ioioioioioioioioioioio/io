import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  FlatList,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import ColorPicker from 'react-native-wheel-color-picker';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { Category, addCategory, deleteCategory } from '../redux/slices/categoriesSlice';

type CategoryListProps = {
  onCategorySelect: (category: Category) => void;
  containerStyle?: ViewStyle;
  listStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  iconSize?: number;
};
export default function CategoryList({
  onCategorySelect,
  containerStyle,
  listStyle,
  buttonStyle,
  iconSize = 32,
}: CategoryListProps) {
  const categoryList = useAppSelector((state) => state.categories.categories);
  const [showCategoryCreator, setShowCategoryCreator] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [color, setColor] = useState('#fff');
  const [isVisible, setIsVisible] = useState(false); // State to control modal visibility
  const inputRef: React.RefObject<TextInput> = React.createRef<TextInput>();

  const openModal = () => {
    setIsVisible(true); // Show modal
  };

  const closeModal = () => {
    setIsVisible(false); // Hide modal
  };
  const dispatch = useAppDispatch();
  return (
    <View style={[styles.categoryListContainer, containerStyle]}>
      <FlatList
        style={[styles.listStyle, listStyle]}
        data={categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.listElemStyle, { backgroundColor: item.categoryColor }, buttonStyle]}
            onPress={() => {
              const category: Category = {
                categoryName: item.categoryName,
                categoryColor: item.categoryColor,
                id: item.id,
              };
              onCategorySelect(category);
            }}
            onLongPress={() => dispatch(deleteCategory(item.id))}>
            <Text style={{ fontWeight: 'bold' }}>{item.categoryName}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[styles.addCategoryStyle, buttonStyle]}
        onPress={() => setShowCategoryCreator(!showCategoryCreator)}>
        {showCategoryCreator ? (
          <View style={styles.addCategoryContainer}>
            <TextInput
              ref={inputRef}
              placeholder="category name"
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              autoFocus
            />
            <MaterialIcons name="color-lens" size={iconSize} color="black" onPress={openModal} />
            <Modal
              backdropColor="white"
              backdropOpacity={0.9}
              isVisible={isVisible}
              onBackdropPress={closeModal}>
              <View style={{ flex: 1, paddingVertical: 50 }}>
                <ColorPicker onColorChangeComplete={(color) => setColor(color)} />
                <MaterialIcons
                  name="check"
                  size={3 * iconSize}
                  color="black"
                  onPress={closeModal}
                  style={{ alignSelf: 'center' }}
                />
              </View>
            </Modal>
            <MaterialIcons
              name="add"
              size={iconSize}
              color="black"
              onPress={() => {
                if (newCategoryName === '') {
                  // Show alert when newCategoryName is empty
                  Alert.alert('Invalid name', 'Category name cannot be empty');
                } else {
                  dispatch(
                    addCategory({
                      categoryName: newCategoryName,
                      categoryColor: color,
                    })
                  );
                  inputRef.current?.clear();
                }
              }}
            />
          </View>
        ) : (
          <Text>add new category</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryListContainer: {},
  listStyle: {
    height: 100,
    marginHorizontal: 50,
  },
  listElemStyle: {
    paddingVertical: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  addCategoryStyle: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  addCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
});
