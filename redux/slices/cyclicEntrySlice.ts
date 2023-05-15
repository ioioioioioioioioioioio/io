import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { Category } from './categoriesSlice';

export enum Cycle {
  Undefined = 'Timestamp',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
}

export interface CycleEntryState {
  id: number;
  name: string;
  amount: number;
  category: Category;
  firstOccurence: Date;
  cycle: Cycle;
}

const cyclicEntryAdapter = createEntityAdapter<CycleEntryState>();

export const cyclicEntrySlice = createSlice({
  name: 'cycle-entries',
  initialState: cyclicEntryAdapter.getInitialState(),
  reducers: {
    addCyclicEntry: (state, action: PayloadAction<Omit<CycleEntryState, 'id'>>) => {
      const id = Math.max(0, ...state.ids.map(Number)) + 1;
      cyclicEntryAdapter.addOne(state, { id, ...action.payload });
    },
    removeCyclicEntry: cyclicEntryAdapter.removeOne,
  },
});

export const { addCyclicEntry, removeCyclicEntry } = cyclicEntrySlice.actions;

export default cyclicEntrySlice.reducer;
