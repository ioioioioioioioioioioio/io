import { configureStore } from '@reduxjs/toolkit';

import accountsReducer from './slices/accountSlice';
import categoriesReducer from './slices/categoriesSlice';
import entriesReducer from './slices/entrySlice';
import penguinReducer from './slices/penguinSlice';
import themingReducer from './slices/themingSlice';

export const store = configureStore({
  reducer: {
    penguin: penguinReducer,
    entries: entriesReducer,
    categories: categoriesReducer,
    accounts: accountsReducer,
    theme: themingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
