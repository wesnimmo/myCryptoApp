// lib/coingecko.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export interface Coin {
    id: number;
    name: string;
    current_price: number;
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
    },
  });
  return response.data;
};

export const getCurrencies = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/simple/supported_vs_currencies');
  return response.data;
};