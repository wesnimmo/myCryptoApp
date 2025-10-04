// components/CoinTable.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CoinTable from "./CoinTable";
import { formatCurrency, formatCurrencyCompact } from "@/utils/format/currency";

// --- Mock ThemeContext (currency=usd) ---
jest.mock("../../context/ThemeContext", () => ({
  useTheme: jest.fn().mockReturnValue({
    isDarkMode: false,
    toggleTheme: jest.fn(),
    currency: "usd",
    setCurrency: jest.fn(),
  }),
}));

// --- Mock the suspense hook so CoinTable does NOT actually suspend in this test ---
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
    market_cap: 1_000_000_000_000,
    total_volume: 7_000_000_000_000,
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
    market_cap: 350_000_000_000,
    total_volume: 850_000_000,
    sparkline_in_7d: { price: [3200, 3150, 3180, 3100] },
  },
];

jest.mock("../../hooks/useCoins", () => ({
  // Make the suspense hook return data synchronously for this unit test
  useCoinsSuspense: () => ({ data: mockCoins }),
}));

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 } },
  });
}

describe("CoinTable component", () => {
  it("renders headers and coin rows (no suspense in this test)", async () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <CoinTable />
      </QueryClientProvider>
    );

    // Headers
    expect(
      screen.getByRole("columnheader", { name: /Rank/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Name \/ Symbol/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Price/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /1h %/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /24h %/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Market Cap/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Volume/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Vol \/ Mkt Cap/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /Last 7 Days/i })
    ).toBeInTheDocument();

    // --- Coin #1 (Bitcoin) assertions ---
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(50000, "usd"))
    ).toBeInTheDocument();
    expect(screen.getByText(/^\s*0\.50\s*%/)).toBeInTheDocument();
    expect(screen.getByText(/^\s*1\.23\s*%/)).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrencyCompact(1_000_000_000_000, "USD"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrencyCompact(7_000_000_000_000, "USD"))
    ).toBeInTheDocument();

    // --- Coin #2 (Ethereum) assertions ---
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
    expect(screen.getByText("ETH")).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(3100, "usd"))
    ).toBeInTheDocument(); // <-- was 50000 by mistake
    expect(screen.getByText(/^\s*0\.10\s*%/)).toBeInTheDocument(); // abs(-0.1) => 0.10%
    expect(screen.getByText(/^\s*2\.11\s*%/)).toBeInTheDocument(); // abs(-2.11) => 2.11%
    expect(
      screen.getByText(formatCurrencyCompact(350_000_000_000, "USD"))
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrencyCompact(850_000_000, "USD"))
    ).toBeInTheDocument();

    // expect(screen.getByTestId("sparkline-bitcoin")).toBeInTheDocument();
    // expect(screen.getByTestId("sparkline-ethereum")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("sparkline-bitcoin")).toBeInTheDocument();
      expect(screen.getByTestId("sparkline-ethereum")).toBeInTheDocument();
    });
    
  });
});
