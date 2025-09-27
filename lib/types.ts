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
  