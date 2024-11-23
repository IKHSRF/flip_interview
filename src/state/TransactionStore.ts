import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './TransactionSlice';

// Create and configure the Redux store
const store = configureStore({
  // Combine reducers for different slices of the state
  reducer: {
    transactions: transactionReducer, // The `transactions` slice is managed by `transactionReducer`
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
