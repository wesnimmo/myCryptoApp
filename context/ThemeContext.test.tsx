// context/ThemeContext.test.tsx
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import { server } from '../mocks/server';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 } },
  });
}

describe('<ThemeProvider>', () => {
  beforeEach(() => {
    // Reset MSW handlers and DOM
    server.resetHandlers();
    document.documentElement.classList.remove('dark');
    localStorage.clear();

    // Render component tree
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </QueryClientProvider>
    );
  });
  
  test('currency selector updates the currency', async () => {
    const select = await screen.findByTestId('currency-select');
    expect(select).toHaveValue('usd'); // Default from ThemeContext

    await userEvent.selectOptions(select, 'eur');
    expect(select).toHaveValue('eur');
  });

  test('persists currency selection to localStorage', async () => {
    // Arrange — render provider + Header
    const select = await screen.findByTestId('currency-select');

    // Act — change the currency
    await userEvent.selectOptions(select, 'eur');

    // Assert — localStorage recorded the change
    expect(localStorage.getItem('currency')).toBe(JSON.stringify('eur'));
  });

  test('persists theme choice to localStorage', async () => {
    const toggleButton = screen.getByTestId('theme-toggle');

    // Start in light mode by default
    expect(localStorage.getItem('dark-mode')).toBe('false');

    // Act — toggle to dark mode
    await userEvent.click(toggleButton);

    // Assert — localStorage reflects dark mode
    expect(localStorage.getItem('dark-mode')).toBe(JSON.stringify(true));
  });

  test('theme toggle switches from light to dark', async () => {
    // Wait for currencies to load to ensure Header is fully rendered
    await waitFor(() => {
      expect(screen.getByTestId('currency-select')).toBeInTheDocument();
    });

    const toggleButton = screen.getByTestId('theme-toggle');
    expect(toggleButton).toContainElement(screen.getByTestId('moon-icon'));
    expect(document.documentElement).not.toHaveClass('dark');

    await userEvent.click(toggleButton);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('dark');
  });

  test('theme toggle switches from dark to light', async () => {
    // Simulate dark mode by clicking toggle
    const toggleButton = screen.getByTestId('theme-toggle');
    await userEvent.click(toggleButton);

    // Wait for currencies to load and verify dark mode
    await waitFor(() => {
      expect(screen.getByTestId('currency-select')).toBeInTheDocument();
      expect(toggleButton).toContainElement(screen.getByTestId('sun-icon'));
      expect(document.documentElement).toHaveClass('dark');
    });

    await userEvent.click(toggleButton);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('dark');
  });


});