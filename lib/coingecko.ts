
'use client'

import axios from 'axios';
import type { Coin } from './types';


const isServer = typeof window === "undefined";

const origin = isServer
  ? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  : "";

export const apiClient = axios.create({
  baseURL: `${origin}/api/markets`,
});


export const getCoinsMarkets = async (
  currency: string = 'usd',
  perPage: number = 10,
  page: number = 1
): Promise<Coin[]> => {
  const response = await apiClient.get('/coins/markets', {
    params: {
      vs_currency: currency,
      order: 'market_cap_desc',
      per_page: perPage,
      page,
      sparkline: true,
      price_change_percentage: '1h,24h,7d'
    },
  });
  return response.data;
};

export const getCurrencies = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/simple/supported_vs_currencies');
  return response.data;
};