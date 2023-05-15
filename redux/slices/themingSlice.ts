import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

// Define a type for the slice state
interface AppTheme {
  theme: 'light' | 'dark';
}

// Define the initial state using that type
const initialState: AppTheme = {
  theme: 'dark',
};

export const themingSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themingSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.theme.theme;

export default themingSlice.reducer;
