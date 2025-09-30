'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getCoinsMarkets } from '../lib/coingecko';
import type { Coin } from '@/lib/types';

export const useCoins = (currency: string, page: number = 1) => {
  return useQuery<Coin[], Error>({
    queryKey: ['coins', currency, page],
    queryFn: () => getCoinsMarkets(currency, 10, page),
  });
};

// Suspense version (throws during load / error)
export function useCoinsSuspense(currency: string, page: number = 1) {
  return useSuspenseQuery<Coin[], Error>({
    queryKey: ['coins', currency, page],
    queryFn: () => getCoinsMarkets(currency, 10, page),
  });
}