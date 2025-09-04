// lib/coingecko.ts
import axios from 'axios';

const API_BASE_URL = '/api/markets'; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  sparkline_in_7d: { price: number[] };
  // Add any other fields you use in your UI
}

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