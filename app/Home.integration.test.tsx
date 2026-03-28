import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../context/ThemeContext';
import Header from '../components/Header';
import Home from './page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { formatCurrency } from '@/utils/format/currency';
import mockRouter from 'next-router-mock';

// 1. Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockRouter.pathname,
  useSearchParams: () => new URLSearchParams(mockRouter.asPath.split('?')[1] || ''),
}));

describe('Home integration test', () => {
  const renderApp = (queryClient: QueryClient) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Header />
          <Home />
        </ThemeProvider>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    mockRouter.setCurrentUrl("/?currency=usd");
    localStorage.clear();
  });

  test('shows USD data by default, and updates when switching to EUR', async () => {
    const user = userEvent.setup();
    const queryClient = new QueryClient({ 
        defaultOptions: { queries: { retry: false, staleTime: 0 } } 
    });

    const { rerender } = renderApp(queryClient);

    // Assert initial USD data
    expect(await screen.findByText(/Bitcoin \(Page 1, usd\)/i)).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(9999999, "usd"))).toBeInTheDocument();

    // Act: Change dropdown
    const select = screen.getByTestId('currency-select');
    await user.selectOptions(select, 'eur');

    // 2. THE CRITICAL STEP: 
    // Manually update the mock URL and clear the cache
    mockRouter.setCurrentUrl("/?currency=eur");
    queryClient.clear(); 

    // Force React to re-evaluate the tree with the new URL state
    rerender(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Header />
          <Home />
        </ThemeProvider>
      </QueryClientProvider>
    );

    // 3. Assert new EUR mock data
    // findByText is key: it retries until MSW returns the new data
    expect(await screen.findByText(/Bitcoin \(Page 1, eur\)/i)).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(777777777, "eur"))).toBeInTheDocument();
    expect(screen.getByTestId('currency-select')).toHaveValue('eur');
  });
});