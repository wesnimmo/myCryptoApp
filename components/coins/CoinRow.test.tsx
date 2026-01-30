// components/coins/CoinRow.test.tsx
import { render, screen } from '@testing-library/react';
import CoinRow from './CoinRow';
import { Coin } from '@/lib/types';

// 1. Mock the Sparkline component so it doesn't try to animate or update state
jest.mock('../charts/Sparkline', () => {
  return function DummySparkline() {
    return <div data-testid="mock-sparkline">Chart</div>;
  };
});

const coin = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'btc',
  image: '/fake-path/to/image.png',
  market_cap_rank: 1,
  current_price: 50000,
  price_change_percentage_24h: 1,
  market_cap: 1,
  total_volume: 1,
  sparkline_in_7d: { price: [1,2,3] },
};

describe('<CoinRow />', () => {
  it('includes currency in the coin detail link', () => {
    render(
      <table>
        <tbody>
          <CoinRow coin={coin as Coin} currency="eur" />
        </tbody>
      </table>
    );

    const link = screen.getByRole('link', { name: /bitcoin/i });
    expect(link).toHaveAttribute('href', '/coins/bitcoin?currency=eur');
  });
});
