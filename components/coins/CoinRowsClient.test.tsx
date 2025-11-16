import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CoinRowsClient from './CoinRowsClient';

// Minimal coin factory
const coin = (id: string, name = 'Bitcoin') => ({
  id,
  market_cap_rank: 1,
  name,
  symbol: 'BTC',
  image: 'https://example.com/placeholder.png',
  current_price: 1,
  price_change_percentage_1h_in_currency: 0.1,
  price_change_percentage_24h: -0.2,
  market_cap: 1,
  total_volume: 1,
  sparkline_in_7d: { price: [1, 2, 3] },
});

// Mock ThemeContext
jest.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({
    currency: 'usd',
    isDarkMode: false,
    toggleTheme: jest.fn(),
    setCurrency: jest.fn(),
  }),
}));

// --- Define the mock hook function ---
let mockUseCoinsInfinite = jest.fn();

jest.mock('@/hooks/useCoinsInfinite', () => ({
  useCoinsInfinite: () => mockUseCoinsInfinite(),
}));

const defaultMockReturnValue = {
  data: { pages: [[coin('btc', 'Bitcoin')], [coin('eth', 'Ethereum')]] },
  fetchNextPage: jest.fn(),
  hasNextPage: true,
  isFetchingNextPage: false,
  status: 'success' as const,
  error: null,
};

mockUseCoinsInfinite.mockReturnValue(defaultMockReturnValue);

describe('CoinRowsClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCoinsInfinite.mockReturnValue(defaultMockReturnValue);
  });

  it('renders rows and shows Load more', async () => {
    render(
      <table>
        <tbody>
          <CoinRowsClient />
        </tbody>
      </table>
    );

    // Use async queries so React has a chance to flush updates
    expect(await screen.findByText('Bitcoin')).toBeInTheDocument();
    expect(await screen.findByText('Ethereum')).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { name: /load more/i })
    ).toBeEnabled();
  });

  it('calls fetchNextPage when clicking Load more', async () => {
    const fetchNextPage = jest.fn();

    mockUseCoinsInfinite.mockReturnValueOnce({
      data: { pages: [[coin('btc')]] },
      fetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      status: 'success' as const,
      error: null,
    });

    render(
      <table>
        <tbody>
          <CoinRowsClient />
        </tbody>
      </table>
    );

    const loadMoreButton = await screen.findByRole('button', {
      name: /load more/i,
    });

    // userEvent is async & act-aware
    await userEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(fetchNextPage).toHaveBeenCalled();
    });
  });
});
