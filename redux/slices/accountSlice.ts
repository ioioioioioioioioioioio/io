import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

import { RootState } from '../store';

export type Account = {
  id: number;
  name: string;
  amount: number;
};

interface AccountsState {
  accounts: Account[];
}

const initialState: AccountsState = {
  accounts: [{ name: 'test account', amount: 100, id: 1 }],
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Omit<Account, 'id'>>) => {
      let success = true;

      state.accounts.forEach((account) => {
        if (account.name.toLowerCase() === action.payload.name.toLowerCase()) {
          Alert.alert('Account already exists');
          success = false;
        }
      });
      if (success) {
        state.accounts.push({ id: selectNextAccountId(state), ...action.payload });
      }
    },
  },
});

export const { addAccount } = accountsSlice.actions;

const selectNextAccountId = (accounts: AccountsState) => {
  if (accounts.accounts.length === 0) {
    return 1;
  }
  const lastAccount = accounts.accounts.slice(-1)[0];
  return lastAccount.id + 1;
};

export const findAccount = (state: RootState, accountId: number) => {
  return state.accounts.accounts.find((account) => account.id === accountId);
};

export default accountsSlice.reducer;
