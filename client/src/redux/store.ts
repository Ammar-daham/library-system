import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice'
import authReducer from './slices/authSlice';
import authorReducer from './slices/authorSlice'
import categoryReducer from './slices/categorySlice'

export const store = configureStore({
  reducer: {
    books: bookReducer,
    users: authReducer,
    authors: authorReducer,
    categories: categoryReducer
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
