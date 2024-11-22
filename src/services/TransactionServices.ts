// Define an asynchronous function `fetchData` that accepts a URL as a string parameter
// and returns a Promise with any type of data or in this case is JSON data
export const fetchData = async (url: string): Promise<any> => {
    try {
        // Attempt to fetch data from the provided URL using the Fetch API.
        const response = await fetch(url);

        // Check if the response status is not OK (status code outside the range 200–299).
        if (!response.ok) {
            // Throw an error with a custom message if the fetch operation failed.
            throw new Error('Failed to fetch data');
        }

        // Instead of resolving the JSON here, return the Promise returned by `response.json()`.
        // This allows the caller to handle the promise itself and makes the function more flexible.
        // By returning the Promise, we enable the caller to decide how to handle the data (with `.then()`, `.catch()`, or `await`).
        // This is beneficial when dealing with multiple asynchronous operations or if the caller needs more control over error handling.
        return response.json();  // This returns a Promise that will resolve with the parsed JSON data.
    } catch(error: any) {
        // Catch any error that occurs during the fetch or JSON parsing.
        // Re-throw the error with the error message for further handling.
        throw new Error(error.message);
    }
};
