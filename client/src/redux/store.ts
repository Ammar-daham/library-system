import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice'
import authReducer from './slices/authSlice';
import authorReducer from './slices/authorSlice'

export const store = configureStore({
  reducer: {
    books: bookReducer,
    user: authReducer,
    authors: authorReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
