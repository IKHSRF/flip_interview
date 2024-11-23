/**
 * Formats a number as Indonesian Rupiah currency, adding thousand separators and prepending 'Rp'.
 *
 * @param {number} amount - The amount to be formatted as Rupiah.
 * @returns {string} - The formatted currency string, e.g., "Rp1.000.000".
 */
export const formatRupiah = (amount: number): string => {
  // Convert the number to a string, add thousand separators, and prepend 'Rp'
  return 'Rp' + amount.toLocaleString('id-ID'); // 'id-ID' locale for Indonesian currency formatting
};
