import { createSlice, PayloadAction } from '@reduxjs/toolkit'; // Tools for creating a Redux slice and defining action payloads
import { Transaction } from '../types/Transaction'; // Transaction type for type safety

// Define the shape of the state managed by this slice
interface TransactionState {
  transactions: Transaction[]; // List of transactions
  loading: boolean; // Indicates if data is being fetched
  error: string | null; // Stores any error message during fetch
  sortOption: string | null; // Sorting criteria (e.g., "nameAZ" or "dateNewest")
  query: string; // Search query string
}

// Initial state for the transaction slice
const initialState: TransactionState = {
  transactions: [], // Start with an empty list
  loading: false, // Not loading initially
  error: null, // No errors initially
  sortOption: null, // No sorting applied by default
  query: '', // No search query by default
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // Updates the list of transactions in the state
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
    },
    // Updates the loading status
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // Updates the error message in case of a failure
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    // Updates the sort option for transactions
    setSortOption(state, action: PayloadAction<string | null>) {
      state.sortOption = action.payload;
    },
    // Updates the search query
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const {
  setTransactions,
  setLoading,
  setError,
  setSortOption,
  setQuery,
} = transactionSlice.actions;

export default transactionSlice.reducer;
