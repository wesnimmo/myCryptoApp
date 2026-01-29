// lib/coingecko-server-service.ts (No 'use client' at the top)

import type { Coin, CoinDetail, MarketChart } from './types';

// Centralized fetch utility (no changes needed here)
export async function fetchFromCoinGecko(path: string, searchParams: string) {
  const url = `https://api.coingecko.com/api/v3/${path}?${searchParams}`;

  const res = await fetch(url, {
    next: { 
      revalidate: 60, // Use ISR to manage rate limits and performance
    },
  });

  if (!res.ok) {
    throw new Error(`CoinGecko fetch failed: ${res.statusText}`);
  }

  return res.json();
}

// Specific data fetching functions for Server Components to use:

// UPDATED: Added currency argument (defaulted to 'usd' for safety)
export async function getCoinByIdServer(id: string, currency: string = 'usd'): Promise<CoinDetail> {
  const params = new URLSearchParams({
    // Tell CoinGecko which currency you ONLY need
    vs_currency: currency, 
    localization: 'false',
    tickers: 'false',
    market_data: 'true',
    community_data: 'false',
    developer_data: 'false',
    sparkline: 'false',
  });
  
  // Call the utility function directly
  return fetchFromCoinGecko(`coins/${id}`, params.toString());
}

// getCoinMarketChartServer was already correct, it already accepts currency
export async function getCoinMarketChartServer(
  id: string,
  currency: string,
  days: number | string
): Promise<MarketChart> {
  const params = new URLSearchParams({
    vs_currency: currency,
    days: String(days),
  });
  // Call the utility function directly
  return fetchFromCoinGecko(`coins/${id}/market_chart`, params.toString());
}
