// hooks/useCoins.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCoins } from './useCoins';
import { http, HttpResponse } from 'msw';

// Wrapper for QueryClientProvider
const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for faster tests
        staleTime: 0, // Ensure fresh data
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useCoins hook', () => {
  test('fetches and returns USD coin data by default', async () => {
    const { result } = renderHook(() => useCoins('usd', 1), { wrapper });

    // Check initial loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to succeed
    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 3000 });

    // Verify the data matches the MSW handler
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.[0]).toEqual(
      expect.objectContaining({
        id: 'bitcoin',
        name: expect.stringContaining('Bitcoin (Page 1, usd)'),
        current_price: 9999999,
      })
    );
  });

  test('fetches and returns EUR coin data when currency is changed', async () => {
    const { result } = renderHook(() => useCoins('eur', 1), { wrapper });

    // Check initial loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to succeed
    await waitFor(() => expect(result.current.isSuccess).toBe(true), { timeout: 3000 });

    // Verify the data matches the MSW handler
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.[0]).toEqual(
      expect.objectContaining({
        id: 'bitcoin',
        name: expect.stringContaining('Bitcoin (Page 1, eur)'),
        current_price: 777777777,
      })
    );
  });

  test('handles API error gracefully', async () => {
    // Temporarily override MSW handler to simulate an error
    const { server } = require('../mocks/server');
    server.use(
      http.get('/api/markets/coins/markets', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useCoins('usd', 1), { wrapper });

    // Check initial loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to fail
    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 3000 });

    // Verify error state
    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });
});