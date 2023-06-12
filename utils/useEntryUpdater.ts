/**
 * Used for automatically updating the accounts and other linked redux objects when editing entries
 */

import { useAppDispatch } from '../redux/hooks';
import { EntryState } from '../redux/slices/entrySlice';

export const useEntryUpdater = () => {
  const dispatch = useAppDispatch();
  const updateEntry = (entry: EntryState, initialAmount: number) => {
    dispatch({ type: 'entries/updateEntry', payload: entry });
    dispatch({
      type: 'accounts/changeAccountBalance',
      payload: {
        accountId: entry.accountId,
        amount: entry.amount / Math.max(entry.sharedWith.length, 1) - initialAmount,
      },
    });
  };
  const addEntry = (entry: Omit<EntryState, 'id'>) => {
    dispatch({ type: 'entries/addEntry', payload: entry });
    dispatch({
      type: 'accounts/changeAccountBalance',
      payload: {
        accountId: entry.accountId,
        amount: entry.amount / Math.max(entry.sharedWith.length, 1),
      },
    });
  };
  return { updateEntry, addEntry };
};
