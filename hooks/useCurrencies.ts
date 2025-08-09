// hooks/useCurrencies.ts
import { useQuery } from '@tanstack/react-query';
import { getCurrencies } from '@/lib/coingecko';

export function useCurrencies() {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
    staleTime: Infinity, // Currencies rarely change
  });
}