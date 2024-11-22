export const formatDate = (date: string | Date): string => {
    const parsedDate = new Date(date); // Parse the input date
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date'); // Handle invalid date format
    }

    const day = parsedDate.getDate().toString().padStart(2, '0'); // Get day and pad to 2 digits
    const month = parsedDate.toLocaleString('default', { month: 'long' }); // Get month (1-indexed)
    const year = parsedDate.getFullYear(); // Get the full year
    return `${day} ${month} ${year}`;
  };
