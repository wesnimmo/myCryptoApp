// hooks/useCoinsInfinite.ts
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getCoinsMarkets, searchCoinsMarkets } from '@/lib/coingecko';
import type { Coin } from '@/lib/types';

const PER_PAGE = 25;

export function useCoinsInfinite(currency: string, search?: string) {
  return useInfiniteQuery<
    Coin[],   // TQueryFnData   - each page returns Coin[]
    Error    // TError
  >({
    queryKey: ['coins-infinite', currency, search],

    queryFn: ({ pageParam = 1 }) =>
      search
        ? searchCoinsMarkets(currency, search, PER_PAGE, pageParam as number)
        : getCoinsMarkets(currency, PER_PAGE, pageParam as number),

    initialPageParam: 1,

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      // TS now knows lastPageParam: number
      return lastPage.length < PER_PAGE
        ? undefined
        : (lastPageParam as number) + 1;
    },
  });
}


