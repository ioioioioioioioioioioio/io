import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

import { RootState } from '../store';

export type Category = {
  id: number;
  categoryName: string;
  categoryColor: string;
};

// Define a type for the slice state
interface CategoriesState {
  categories: Category[];
  foundCategory: Category;
}

// Define the initial state using that type
const initialState: CategoriesState = {
  categories: [
    { id: 1, categoryName: 'Food', categoryColor: '#ed1c24' },
    { id: 2, categoryName: 'Clothing', categoryColor: '#d11cd5' },
    { id: 3, categoryName: 'Electronics', categoryColor: '#1633e6' },
    { id: 4, categoryName: 'Home', categoryColor: '#00aeef' },
    { id: 5, categoryName: 'Toys', categoryColor: '#00c85d' },
  ],
  foundCategory: { id: 1, categoryName: 'Food', categoryColor: '#ed1c24' },
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Omit<Category, 'id'>>) => {
      let success = true;

      state.categories.forEach((category) => {
        if (category.categoryName.toLowerCase() === action.payload.categoryName.toLowerCase()) {
          Alert.alert('Category already exists');
          success = false;
        }
      });
      if (success) {
        state.categories.push({ id: selectNextCategoryId(state), ...action.payload });
      }
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;
      const categoryIndex = state.categories.findIndex((category) => category.id === categoryId);
      if (categoryIndex >= 0) {
        state.categories.splice(categoryIndex, 1);
      } else {
        Alert.alert('Error', 'Category not found');
      }
    },
    findCategory: (state, action: PayloadAction<number>) => {
      const categoryId = action.payload;
      const foundCategory = state.categories.find((category) => category.id === categoryId);
      if (foundCategory !== undefined) {
        state.foundCategory = foundCategory;
      }
    },
  },
});

export const { addCategory, deleteCategory, findCategory } = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectFoundCategory = (state: RootState) => state.categories.foundCategory;

const selectNextCategoryId = (categories: CategoriesState) => {
  const lastCategory = categories.categories.slice(-1)[0];
  return lastCategory.id + 1;
};

export default categoriesSlice.reducer;
