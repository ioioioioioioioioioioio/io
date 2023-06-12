import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Category } from './categoriesSlice';
import { RootState } from '../store';

export enum Cycle {
  Undefined = 'Undefined',
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
}

export interface EntryState {
  id: number;
  name: string;
  amount: number;
  accountId: number;
  category: Category;
  imageUri: string | null;
  date: Date;
  done: boolean;
  cycle: Cycle;
}

const entryAdapter = createEntityAdapter<EntryState>();

export const entrySlice = createSlice({
  name: 'entries',
  initialState: entryAdapter.getInitialState({
    ids: [1, 2, 3, 4, 5],
    entities: {
      1: {
        id: 1,
        name: 'Salary',
        amount: 5000,
        category: { categoryColor: '#1633e6', categoryName: 'Electronics', id: 3 },
        done: true,
        cycle: Cycle.Undefined,
        accountId: 1,
        date: new Date('2021-01-03'),
      },
      2: {
        id: 2,
        name: 'Rent',
        amount: -1000,
        category: { categoryColor: '#00aeef', categoryName: 'Home', id: 4 },
        done: false,
        cycle: Cycle.Undefined,
        accountId: 1,
        date: new Date('2021-01-02'),
      },
      3: {
        id: 3,
        name: 'Food',
        amount: -1000,
        category: { categoryColor: '#ed1c24', categoryName: 'Food', id: 1 },
        done: true,
        cycle: Cycle.Undefined,
        accountId: 1,
        date: new Date('2021-01-06'),
      },
      4: {
        id: 4,
        name: 'Water',
        amount: -100,
        category: { categoryName: 'Home', categoryColor: '#00aeef', id: 4 },
        cycle: Cycle.Month,
        accountId: 1,
      },
      5: {
        id: 5,
        name: 'Gas',
        amount: -150,
        category: { categoryName: 'Home', categoryColor: '#00aeef', id: 4 },
        cycle: Cycle.Month,
        accountId: 1,
      },
    },
  }),
  reducers: {
    addEntry: (state, action: PayloadAction<Omit<EntryState, 'id'>>) => {
      const id = Math.max(0, ...state.ids.map(Number)) + 1;
      entryAdapter.addOne(state, { id, ...action.payload });
    },
    addEntryWithID: entryAdapter.addOne,
    removeEntry: (state, action: PayloadAction<number>) => {
      const entryId = action.payload;
      delete state.entities[entryId];
    },
    updateEntry: (state, action: PayloadAction<EntryState>) => {
      entryAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
  },
});

export const { addEntry, removeEntry, updateEntry } = entrySlice.actions;

const entriesSelectors = entryAdapter.getSelectors<RootState>((state) => state.entries);
export const selectEntriesDict = (state: RootState) => entriesSelectors.selectEntities(state);
export const selectEntries = (state: RootState) =>
  entriesSelectors
    .selectAll(state)
    .filter((val) => val !== undefined && val.cycle === Cycle.Undefined);
export const selectCyclicEntries = (state: RootState) =>
  entriesSelectors
    .selectAll(state)
    .filter((val) => val !== undefined && val.cycle !== Cycle.Undefined);
export const selectOneEntry = (id: number) => (state: RootState) =>
  entriesSelectors.selectById(state, id);

export default entrySlice.reducer;
