/**
 * Formats a given date string or Date object into a human-readable format: "DD Month YYYY".
 * - The day is padded to two digits.
 * - The month is returned as its full name (e.g., "January", "February").
 * - The year is returned as a four-digit number.
 *
 * @param {string | Date} date - The date to be formatted. Can be a string or a Date object.
 * @returns {string} - The formatted date in the "DD Month YYYY" format.
 * @throws {Error} - Throws an error if the provided date is invalid.
 */
export const formatDate = (date: string | Date): string => {
  const parsedDate = new Date(date); // Parse the input date.
  if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date'); // Handle invalid date format (e.g., NaN date).
  }

  // Get the day and pad it to ensure it's two digits (e.g., "01", "09").
  const day = parsedDate.getDate().toString().padStart(2, '0');

  // Get the month as a full name (e.g., "January", "February").
  const month = parsedDate.toLocaleString('default', { month: 'long' });

  // Get the full year (e.g., "2024").
  const year = parsedDate.getFullYear();

  // Return the formatted date as "DD Month YYYY".
  return `${day} ${month} ${year}`;
};
