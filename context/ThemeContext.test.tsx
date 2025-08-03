import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeContext';
import Header from '../components/Header';


afterEach(() => {
  document.documentElement.classList.remove('dark');
});

test('theme toggle switches between dark and light', async () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );

  const toggleButton = screen.getByTestId('theme-toggle');

  expect(document.documentElement.classList.contains('dark')).toBe(false);

  // simulate user click
  await userEvent.click(toggleButton);

  // assert the dark class was toggled onto <html>
  expect(document.documentElement.classList.contains('dark')).toBe(true);

  // Optional: check if sun icon is rendered
  expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
});

test('currency selector updates the currency', async () => {
  render(
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );

  // Assume your currency dropdown has test id 'currency-select'
  const currencySelect = screen.getByTestId('currency-select');

  // Assert default value, assuming it's 'usd'
  expect((currencySelect as HTMLSelectElement).value).toBe('usd');

  // Change currency to eur
  await userEvent.selectOptions(currencySelect, 'eur');

  // Assert that the value changed
  expect((currencySelect as HTMLSelectElement).value).toBe('eur');
});
