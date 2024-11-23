/**
 * Formats the bank name string by capitalizing the first letter.
 * If the bank name is shorter than or equal to 4 characters, the entire string is converted to uppercase.
 * Otherwise, only the first letter is capitalized, and the rest of the string remains as is.
 *
 * @param {string} [str] - The bank name string to format.
 * @returns {string} - The formatted bank name.
 * If the input is undefined or empty, returns an empty string.
 */
export const formatBankName = (str?: string): string => {
  if (!str) { return ''; } // If the input is undefined or empty, return an empty string.
  if (str.length <= 4) {
      return str.toUpperCase(); // If the string is short (<= 4 characters), return the whole string in uppercase.
  }
  // Otherwise, capitalize the first letter and leave the rest of the string unchanged.
  return str.charAt(0).toUpperCase() + str.slice(1);
};
