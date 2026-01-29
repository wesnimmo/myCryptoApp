export type Coin = {
    id: string;
    market_cap_rank: number;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
    sparkline_in_7d: { price: number[] };
  };

export type CoinDetail = {
  id: string;
  name: string;
  symbol: string;
  image: { small: string; large: string };
  market_cap_rank: number | null;
  description?: { en?: string };
  market_data?: {
    current_price: Record<string, number>;
    market_cap: Record<string, number>;
    total_volume: Record<string, number>;
    price_change_percentage_24h?: number;
  };
};

export type MarketChart = {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

  