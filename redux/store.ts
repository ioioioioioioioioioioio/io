import { configureStore } from '@reduxjs/toolkit';

import entriesReducer from './slices/entrySlice';
import penguinReducer from './slices/penguinSlice';

export const store = configureStore({
  reducer: {
    penguin: penguinReducer,
    entries: entriesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
