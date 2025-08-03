'use client';

import { useQuery } from '@tanstack/react-query';
import { Coin, getCoinsMarkets } from '../lib/coingecko';

export const useCoins = (currency: string, page: number = 1) => {
  return useQuery<Coin[], Error>({
    queryKey: ['coins', currency, page],
    queryFn: () => getCoinsMarkets(currency, 10, page),
  });
};