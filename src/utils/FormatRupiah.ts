export const formatRupiah = (amount: number): string => {
    // Convert number to string, add thousand separator, and prepend 'Rp'
    return 'Rp' + amount.toLocaleString('id-ID'); // 'id-ID' locale for Indonesian currency formatting
  };
