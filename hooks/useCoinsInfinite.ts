// hooks/useCoinsInfinite.ts
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getCoinsMarkets } from '@/lib/coingecko';
import type { Coin } from '@/lib/types';

const PER_PAGE = 25; // tweak as you like

export function useCoinsInfinite(currency: string) {
  return useInfiniteQuery<Coin[], Error>({
    queryKey: ['coins-infinite', currency, PER_PAGE],
    queryFn: ({ pageParam = 1 }) => getCoinsMarkets(currency, PER_PAGE, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        // '_' allPages to not use it
        // If the last page returned fewer items than PER_PAGE, there’s no next page
      return lastPage.length < PER_PAGE ? undefined : (lastPageParam as number) + 1;
    },
  });
}
