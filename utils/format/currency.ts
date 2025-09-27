export const formatCurrency = (
    number: number,
    currency: string,
    useDecimals = true
  ): string => {
    return Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      notation: 'standard',
      maximumFractionDigits: useDecimals ? 2 : 0,
    }).format(number);
  };


  export const formatCurrencyCompact = (
    number: number,
    currency: string
  ): string => {
    return Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(number);
  };