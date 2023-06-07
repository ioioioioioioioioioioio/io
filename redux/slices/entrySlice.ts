import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Account } from './accountSlice';
import { Category } from './categoriesSlice';
import { RootState } from '../store';

export interface EntryState {
  id: number;
  name: string;
  amount: number;
  account: Account;
  category: Category;
  imageUri: string | null;
  date: Date;
  done: boolean;
}

const entryAdapter = createEntityAdapter<EntryState>();

export const entrySlice = createSlice({
  name: 'entries',
  initialState: entryAdapter.getInitialState({
    ids: [1, 2, 3],
    entities: {
      1: {
        id: 1,
        name: 'Salary',
        amount: 5000,
        category: { categoryColor: '#1633e6', categoryName: 'Electronics', id: 3 },
        done: true,
        account: { currency: 'PLN', name: 'test account', amount: 100, id: 1 },
        date: new Date(),
      },
      2: {
        id: 2,
        name: 'Rent',
        amount: -1000,
        category: { categoryColor: '#00aeef', categoryName: 'Home', id: 4 },
        done: false,
        account: { currency: 'PLN', name: 'test account', amount: 100, id: 1 },
        date: new Date(),
      },
      3: {
        id: 3,
        name: 'Food',
        amount: -1000,
        category: { categoryColor: '#ed1c24', categoryName: 'Food', id: 1 },
        done: true,
        account: { currency: 'PLN', name: 'test account', amount: 100, id: 1 },
        date: new Date(),
      },
    },
  }),
  reducers: {
    addEntry: (state, action: PayloadAction<Omit<EntryState, 'id'>>) => {
      const id = Math.max(0, ...state.ids.map(Number)) + 1;
      entryAdapter.addOne(state, { id, ...action.payload });
    },
    addEntryWithID: entryAdapter.addOne,
    removeEntry: entryAdapter.removeOne,
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
export const selectEntries = (state: RootState) => entriesSelectors.selectAll(state);
export const selectOneEntry = (id: number) => (state: RootState) =>
  entriesSelectors.selectById(state, id);

export default entrySlice.reducer;
