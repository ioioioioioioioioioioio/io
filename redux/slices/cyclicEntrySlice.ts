import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { EntryState } from './entrySlice';
import { RootState } from '../store';

export enum Cycle {
  Undefined = 'Timestamp',
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
}

export interface CycleEntryState extends EntryState {
  cycle: Cycle;
}

const cyclicEntryAdapter = createEntityAdapter<CycleEntryState>();

export const cyclicEntrySlice = createSlice({
  name: 'cycle-entries',
  initialState: cyclicEntryAdapter.getInitialState({
    ids: [1, 2],
    entities: {
      1: {
        id: 1,
        name: 'Water',
        amount: -100,
        category: { categoryName: 'Home', categoryColor: '#00aeef', id: 4 },
        cycle: Cycle.Month,
      },
      2: {
        id: 2,
        name: 'Gas',
        amount: -150,
        category: { categoryName: 'Home', categoryColor: '#00aeef', id: 4 },
        cycle: Cycle.Month,
      },
    },
  }),
  reducers: {
    addCyclicEntry: (state, action: PayloadAction<Omit<CycleEntryState, 'id'>>) => {
      const id = Math.max(0, ...state.ids.map(Number)) + 1;
      cyclicEntryAdapter.addOne(state, { id, ...action.payload });
    },
    removeCyclicEntry: (state, action: PayloadAction<number>) => {
      const entryId = action.payload;
      delete state.entities[entryId];
    },
    updateEntry: (state, action: PayloadAction<CycleEntryState>) => {
      cyclicEntryAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
  },
});

export const { addCyclicEntry, removeCyclicEntry, updateEntry } = cyclicEntrySlice.actions;

const cyclicEntriesSelectors = cyclicEntryAdapter.getSelectors<RootState>(
  (state) => state.cycleEntries
);
export const selectCyclicEntries = (state: RootState) => cyclicEntriesSelectors.selectAll(state);
export const selectOneEntry = (id: number) => (state: RootState) =>
  cyclicEntriesSelectors.selectById(state, id);

export default cyclicEntrySlice.reducer;
