'use client';

import axios from 'axios';
import type { Coin, CoinDetail, MarketChart  } from './types';

const isServer = typeof window === "undefined";

const origin = isServer
  ? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  : "";

export const apiClient = axios.create({
  baseURL: `${origin}/api/markets`,
});

/** ------------------------------------------------------------
 * Normal markets fetch (extended to support optional `ids`)
 * ------------------------------------------------------------ */
export const getCoinsMarkets = async (
  currency: string = 'usd',
  perPage: number = 10,
  page: number = 1,
  ids?: string[]
): Promise<Coin[]> => {
  const response = await apiClient.get('/coins/markets', {
    params: {
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: true,
      price_change_percentage: '1h,24h,7d',
      ...(ids && ids.length > 0 ? { ids: ids.join(',') } : {}),
    },
  });

  return response.data;
};



/** ------------------------------------------------------------
 * Step 1: Search endpoint → return only IDs
 * ------------------------------------------------------------ */
type SearchCoin = {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
};

export async function searchCoinIds(query: string): Promise<string[]> {
  if (!query.trim()) return [];

  const res = await apiClient.get('/search', {
    params: { query },
  });

  const coins = (res.data.coins ?? []) as SearchCoin[];

  // Limit to a reasonable number
  return coins.slice(0, 30).map((c) => c.id);
}

/** ------------------------------------------------------------
 * Step 2: Combined helper — search → then markets (paged)
 * ------------------------------------------------------------ */
export async function searchCoinsMarkets(
  query: string,
  currency: string,
  perPage: number,
  page: number
): Promise<Coin[]> {
  // Step 1: Get IDs from search
  const ids = await searchCoinIds(query);
  if (!ids.length) return [];

  // Step 2: Pagination logic
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageIds = ids.slice(start, end);
  if (!pageIds.length) return [];

  // Step 3: Call markets endpoint using the filtered IDs
  return getCoinsMarkets(currency, pageIds.length, 1, pageIds);
}



/** ------------------------------------------------------------
 * Currencies helper
 * ------------------------------------------------------------ */
export const getCurrencies = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/simple/supported_vs_currencies');
  return response.data;
};


/** ------------------------------------------------------------
 * Single Coin Data
 * ------------------------------------------------------------ */

export async function getCoinById(id: string): Promise<CoinDetail> {
  const res = await apiClient.get(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  });
  return res.data;
}

export async function getCoinMarketChart(
  id: string,
  currency: string,
  days: number | string
): Promise<MarketChart> {
  const res = await apiClient.get(`/coins/${id}/market_chart`, {
    params: { vs_currency: currency, days },
  });
  return res.data;
}

