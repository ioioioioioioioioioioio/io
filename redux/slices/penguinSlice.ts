import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

// Define a type for the slice state
interface PenguinState {
  happiness: number;
}

// Define the initial state using that type
const initialState: PenguinState = {
  happiness: 0,
};

export const penguinSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.happiness += 1;
    },
    decrement: (state) => {
      state.happiness -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.happiness += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = penguinSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHappiness = (state: RootState) => state.penguin.happiness;

export default penguinSlice.reducer;
