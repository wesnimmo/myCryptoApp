import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import { server } from '../mocks/server';
import mockRouter from 'next-router-mock'; 

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    ...mockRouter,
    replace: jest.fn((url: string) => {
      // Manually update the mock router's path so assertions pass
      mockRouter.asPath = url;
      // Trigger a popstate event to simulate navigation for any listeners
      window.dispatchEvent(new PopStateEvent('popstate'));
    }),
  }),
  usePathname: () => mockRouter.pathname,
  useSearchParams: () => new URLSearchParams(mockRouter.asPath.split('?')[1] || ''),
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: 0 } },
});

describe('<ThemeProvider>', () => {
  const getAppTree = (queryClient: QueryClient) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </QueryClientProvider>
  );

  beforeEach(() => {
    server.resetHandlers();
    localStorage.clear();
    mockRouter.setCurrentUrl("/?currency=usd");
    mockRouter.asPath = "/?currency=usd";
    document.documentElement.classList.remove('dark');
  });

  test('currency selector updates URL and localStorage', async () => {
    const queryClient = createTestQueryClient();
    const { rerender } = render(getAppTree(queryClient));
    
    const select = await screen.findByTestId('currency-select');
    await userEvent.selectOptions(select, 'eur');

    // Force a rerender so hooks pick up the manual mockRouter.asPath change
    rerender(getAppTree(createTestQueryClient()));

    // Assert the URL change
    expect(mockRouter.asPath).toContain('currency=eur');

    // Assert LocalStorage sync
    await waitFor(() => {
      expect(localStorage.getItem('currency')).toBe(JSON.stringify('eur'));
    });
  });

  test('persists theme choice', async () => {
    render(getAppTree(createTestQueryClient()));
    const toggleButton = screen.getByTestId('theme-toggle');
    await userEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(localStorage.getItem('dark-mode')).toBe(JSON.stringify(true));
      expect(document.documentElement).toHaveClass('dark');
    });
  });
});