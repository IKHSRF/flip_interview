import { useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Hook for dispatching Redux actions
import { setTransactions, setLoading, setError } from '../state/TransactionSlice'; // Import Redux actions to update the state
import { fetchData } from '../services/TransactionServices'; // Import the custom fetch function from services

/**
 * Custom hook to fetch transaction data from a given URL using the `fetchData` service function.
 *
 * This hook interacts with Redux to manage the loading, data, and error state for the fetched transactions.
 * It dispatches actions to update the Redux store during the fetch process.
 */
const useFetch = (url: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        // Before starting the fetch operation, dispatch the `setLoading` action to indicate that data is being loaded
        dispatch(setLoading(true));

        // Call the `fetchData` function from the `TransactionServices` to make the actual API request
        // `fetchData` is expected to return the fetched data
        const data = await fetchData(url);

        // Dispatch the action to store the fetched transactions in the Redux state
        // The data is expected to be in a structure suitable for Redux (e.g., an array of transactions)
        dispatch(setTransactions(Object.values(data))); // Convert object to array if needed

        // Once the data is fetched successfully, dispatch the `setLoading` action to stop the loading indicator
        dispatch(setLoading(false));
      } catch (err) {
        // If there is an error during the fetch operation, dispatch the `setError` action to store the error message in the Redux state
        dispatch(setError('Failed to fetch transactions.'));

        // Set the loading state to false after the error
        dispatch(setLoading(false));
      }
    };

    // Call the `fetchDataFromApi` function to initiate the fetch process
    fetchDataFromApi();
  }, [url, dispatch]);

  // The hook does not return any data directly, as the state (like `transactions`, `loading`, and `error`) is managed by Redux
  return {}; // Return an empty object because Redux handles the state
};

export default useFetch;
