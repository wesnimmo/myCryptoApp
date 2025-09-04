// components/CoinsList.tsx
import React from "react";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  sparkline_in_7d: { price: number[] };
};

interface Props {
  coins: Coin[];
}

export default function CoinsList({ coins }: Props) {
  if (!coins.length) {
    return <div>No coins found</div>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Image</th>
          <th>Current Price</th>
          <th>24h %</th>
          <th>7d %</th>
          <th>Total Volume</th>
          <th>Sparkline</th>
        </tr>
      </thead>
      <tbody>
        {coins.map(coin => (
          <tr key={coin.id}>
            <td>{coin.symbol}</td>
            <td>{coin.name}</td>
            <td>
              <img src={coin.image} alt={`${coin.name} logo`} width={24} height={24} />
            </td>
            <td>{coin.current_price}</td>
            <td>{coin.price_change_percentage_24h}</td>
            <td>{coin.price_change_percentage_7d_in_currency}</td>
            <td>{coin.total_volume}</td>
            <td>
              {/* Placeholder for sparkline chart */}
              <div data-testid={`sparkline-${coin.id}`}></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
