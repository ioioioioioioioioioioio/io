import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

export interface EntryState {
  id: number;
  name: string;
  amount: number;
}

const entryAdapter = createEntityAdapter<EntryState>();

export const entrySlice = createSlice({
  name: 'entries',
  initialState: entryAdapter.getInitialState(),
  reducers: {
    addEntry: (state, action: PayloadAction<Omit<EntryState, 'id'>>) => {
      const id = Math.max(0, ...state.ids.map(Number)) + 1;
      entryAdapter.addOne(state, { id, ...action.payload });
    },
    addEntryWithID: entryAdapter.addOne,
    removeEntry: entryAdapter.removeOne,
  },
});

export const { addEntry, removeEntry } = entrySlice.actions;

const entriesSelectors = entryAdapter.getSelectors<RootState>((state) => state.entries);
export const selectEntriesDict = (state: RootState) => entriesSelectors.selectEntities(state);
export const selectEntries = (state: RootState) => entriesSelectors.selectAll(state);

export default entrySlice.reducer;
