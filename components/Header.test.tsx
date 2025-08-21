// components/Header.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import Header from './Header';
import { ThemeProvider } from '@/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '../mocks/server';



function createTestQueryClient() {
    return new QueryClient({
      defaultOptions: { queries: { retry: 0, staleTime: 0 } },
    });
  }

describe('Header', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('fetches and renders supported currencies from CoinGecko API', async () => {
    // Arrange: mock MSW response (already in handlers.ts, but can override if needed)
    server.use(
      http.get('/api/markets/simple/supported_vs_currencies', () => {
        return HttpResponse.json(['btc', 'eth', 'ltc']);
      })
    );

    // Act: render Header with ThemeProvider and QueryProvider
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </QueryClientProvider>
    );

    // Assert: wait for and verify currency options
    expect(await screen.findByRole('option', { name: 'BTC' })).toBeInTheDocument();
    expect(await screen.findByRole('option', { name: 'ETH' })).toBeInTheDocument();
    expect(await screen.findByRole('option', { name: 'LTC' })).toBeInTheDocument();
  });

  test('displays error message when currency fetch fails', async () => {
    // Arrange: mock API error
    server.use(
      http.get('/api/markets/simple/supported_vs_currencies', () => {
        return HttpResponse.text('Internal Server Error', { status: 500 })
      })
    );

    // Act: render Header
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </QueryClientProvider>
    );

    // Assert: verify error message
    expect(await screen.findByText(/failed to load currencies/i)).toBeInTheDocument();
  });
});