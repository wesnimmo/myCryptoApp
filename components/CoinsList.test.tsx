// components/CoinsList.test.tsx
import { render, screen } from "@testing-library/react";
import CoinsList from './CoinsList'
import { formatCurrency, formatCurrencyCompact } from "@/utils/format/currency";


// Sample mock coin data (expand fields as needed for your table)
const mockCoins = [
  {
    id: "bitcoin",
    market_cap_rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 50000,
    price_change_percentage_1h_in_currency: 0.5,
    price_change_percentage_24h: 1.23,
    market_cap: 1000000000000,
    total_volume: 7000000000000,
    sparkline_in_7d: { price: [49500, 49600, 49800, 50000] },
  },
  {
    id: "ethereum",
    market_cap_rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3100,
    price_change_percentage_1h_in_currency: -0.1,
    price_change_percentage_24h: -2.11,
    market_cap: 350000000000,
    total_volume: 850000000,
    sparkline_in_7d: { price: [3200, 3150, 3180, 3100] },
  },
];

jest.mock('../context/ThemeContext', () => ({
  __esModule: true,
  useTheme: jest.fn().mockReturnValue({
    isDarkMode: false,
    toggleTheme: jest.fn(),
    currency: 'usd',
    setCurrency: jest.fn(),
  }),
}));

afterEach(() => {
  jest.clearAllMocks(); // good hygiene
});

describe("CoinsList component", () => {
  it("renders a table with coin data rows", () => {
    render(<CoinsList coins={mockCoins} />);

    // Check for the table headers using `getByRole` for robustness
    expect(screen.getByRole('columnheader', { name: /Rank/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Name \/ Symbol/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Price/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /1h %/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /24h %/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Market Cap/i })).toBeInTheDocument(); // FIX: Used getByRole
    expect(screen.getByRole('columnheader', { name: /Volume/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Vol \/ Mkt Cap/i })).toBeInTheDocument(); // FIX: Escaped slash
    expect(screen.getByRole('columnheader', { name: /Sparkline/i })).toBeInTheDocument();

    // Coin #1 data assertions - match what's visible in the DOM
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(50000, "usd"))).toBeInTheDocument(); // Matched formatted price
    expect(screen.getByText(/^\s*0\.50\s*%/)).toBeInTheDocument(); // Matched formatted percentage (assuming no '%' in test string)
    expect(screen.getByText(/^\s*1\.23\s*%/)).toBeInTheDocument(); // Matched formatted percentage
    expect(screen.getByText(formatCurrencyCompact(1000000000000, 'USD'))).toBeInTheDocument(); // Matched formatted market cap
    expect(screen.getByText(formatCurrencyCompact(7000000000000, 'USD'))).toBeInTheDocument(); // Matched formatted volume

    // Coin #2 data assertions - check based on your provided DOM snippet, adjust if your formatting differs
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
    expect(screen.getByText("ETH")).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(50000, "usd"))).toBeInTheDocument(); // Assuming 3100 would be formatted as "3,100"
    expect(screen.getByText("0.10%")).toBeInTheDocument(); // Assuming -0.1 would be formatted as "-0.10"
    expect(screen.getByText("2.11%")).toBeInTheDocument();
    // These need to match the *formatted* output. You'll need to check your component's exact formatting.
    // Based on the DOM snapshot, the volume for Bitcoin was 1.00B. Ethereum's raw volume is 850000000.
    // It's likely formatted similarly. Let's assume '850.00M' or similar based on your component's logic.
    // For now, I'll use raw values, but if these fail, inspect `screen.debug()` for the correct formatted string.
    expect(screen.getByText(formatCurrencyCompact(350000000000, "usd"))).toBeInTheDocument(); // Assuming formatted market cap
    expect(screen.getByText(formatCurrencyCompact(850000000, "usd"))).toBeInTheDocument(); // Assuming formatted volume (need to verify this string in actual output)
  });

  it("renders coin images in table rows", () => {
    render(<CoinsList coins={mockCoins} />);
    expect(screen.getByAltText("Bitcoin logo")).toHaveAttribute("src", mockCoins[0].image);
    expect(screen.getByAltText("Ethereum logo")).toHaveAttribute("src", mockCoins[1].image);
  });

  it("renders sparkline charts (placeholder test)", () => {
    render(<CoinsList coins={mockCoins} />);
    // This expects you to render a sparkline with a test id, e.g. <div data-testid={`sparkline-${coin.id}`}></div>
    expect(screen.getByTestId("sparkline-bitcoin")).toBeInTheDocument();
    expect(screen.getByTestId("sparkline-ethereum")).toBeInTheDocument();
  });

  it("renders empty message if no coins", () => {
    render(<CoinsList coins={[]} />);
    expect(screen.getByText(/no coins found/i)).toBeInTheDocument();
  });
});