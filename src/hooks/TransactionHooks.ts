import { useState, useEffect } from 'react'; // React hooks for managing state and side effects
import { fetchData } from '../services/TransactionServices'; // A custom function to fetch data from the API
import { Transactions } from '../types/Transaction'; // TypeScript type for the structure of transaction data

// Custom hook `useFetch` that takes a URL as input and returns data, loading state, and error state
const useFetch = (url: string) => {
    // State hook for storing the fetched transaction data.
    // Initially set to null because data is not yet fetched.
    const [data, setData] = useState<Transactions | null>(null);

    // State hook for tracking the loading state of the API call.
    // Initially set to `true` since data is being fetched on mount.
    const [loading, setLoading] = useState<Boolean>(true);

    // State hook for storing any error that may occur during the fetch.
    // Initially set to `null` since no error has occurred yet.
    const [error, setError] = useState<string | null>(null);

    // useEffect hook runs after every render when dependencies change.
    // In this case, it runs when the `url` changes, initiating a new API call.
    useEffect(() => {
        // Define an async function inside the effect to perform the fetch operation.
        const fetchDataFromApi = async () => {
            try {
                // Call the `fetchData` function (imported from services) to make the API request.
                // `fetchData` will return a Promise that resolves with the response data.
                const response = await fetchData(url);

                // Once the data is fetched, cast it to the `Transactions` type for type safety.
                // This ensures that the data structure aligns with the expected format.
                const tranasctionData: Transactions = response;

                // Update the `data` state with the fetched data.
                setData(tranasctionData);
            } catch(err: any) {
                // Update the `error` state to store the error message.
                setError(err.message);
            } finally {
                // Set `loading` to `false` after the fetch operation completes (whether successful or failed).
                setLoading(false);
            }
        };

        // Call the fetch function to start fetching data as soon as the component mounts or the `url` changes.
        fetchDataFromApi();
    }, [url]); // The effect depends on `url`, so it runs every time the `url` changes.

    // Return an object with the `data`, `loading`, and `error` state.
    // This allows the calling component to access the result of the fetch operation,
    // track the loading state, and handle any errors appropriately.
    return {data, loading, error};
};

export default useFetch;
