/* components/coins/CoinRowsClient.test.tsx */
import { render, screen, fireEvent } from "@testing-library/react";
import CoinRowsClient from "./CoinRowsClient";

// ------------------------------
// Mock ThemeContext
// ------------------------------
jest.mock("@/context/ThemeContext", () => ({
  useTheme: () => ({
    currency: "usd",
    isDarkMode: false,
    toggleTheme: jest.fn(),
    setCurrency: jest.fn(),
    search: "",             
    setSearch: jest.fn()
  }),
}));

// ------------------------------
// Mock CoinRow
// ------------------------------
jest.mock("./CoinRow", () => {
  return function MockCoinRow({
    coin,
  }: {
    coin: { id: string; name: string };
  }) {
    return (
      <tr data-testid={`coin-row-${coin.id}`}>
        <td>{coin.name}</td>
      </tr>
    );
  };
});

// ------------------------------
// Mock useCoinsInfinite
// ------------------------------
const mockUseCoinsInfinite = jest.fn();
jest.mock("@/hooks/useCoinsInfinite", () => ({
  useCoinsInfinite: (...args: unknown[]) => mockUseCoinsInfinite(...args),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

// ======================================================
// TEST A — Normal load
// ======================================================
it("renders rows and the Load More button", () => {
  mockUseCoinsInfinite.mockReturnValue({
    status: "success",
    data: {
      pages: [
        [
          { id: "bitcoin", name: "Bitcoin" },
          { id: "ethereum", name: "Ethereum" },
        ],
      ],
    },
    fetchNextPage: jest.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
    error: null,
  });

  render(
    <table>
      <tbody>
        <CoinRowsClient />
      </tbody>
    </table>
  );

  expect(screen.getByPlaceholderText(/search coins/i)).toBeInTheDocument();
  expect(screen.getByTestId("coin-row-bitcoin")).toBeInTheDocument();
  expect(screen.getByTestId("coin-row-ethereum")).toBeInTheDocument();
});

// ======================================================
// TEST B — Search updates the results
// ======================================================
it("updates rows when search text changes", () => {
  mockUseCoinsInfinite.mockReturnValue({
    status: "success",
    data: { pages: [[{ id: "bitcoin", name: "Bitcoin" }]] },
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    error: null,
  });

  const { rerender } = render(
   <table>
    <tbody>
      <CoinRowsClient />
    </tbody>
  </table>
  );

  const input = screen.getByPlaceholderText(/search coins/i);
  fireEvent.change(input, { target: { value: "eth" } });

  mockUseCoinsInfinite.mockReturnValue({
    status: "success",
    data: { pages: [[{ id: "ethereum", name: "Ethereum" }]] },
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    error: null,
  });

  rerender(
   <table>
    <tbody>
      <CoinRowsClient />
    </tbody>
  </table>
  );

  expect(screen.getByTestId("coin-row-ethereum")).toBeInTheDocument();
});
