/* components/coins/CoinRowsClient.test.tsx */
import { render, screen } from "@testing-library/react";
import CoinRowsClient from "./CoinRowsClient";

jest.mock("@/context/ThemeContext", () => ({
  useTheme: () => ({
    currency: "usd",
    isDarkMode: false,
    toggleTheme: jest.fn(),
    setCurrency: jest.fn(),
    search: "",
    setSearch: jest.fn(),
  }),
}));

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

const mockUseCoinsInfinite = jest.fn();

jest.mock("@/hooks/useCoinsInfinite", () => ({
  useCoinsInfinite: (...args: unknown[]) => mockUseCoinsInfinite(...args),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

it("renders coin rows and the Load More button", () => {
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

  expect(screen.getByTestId("coin-row-bitcoin")).toBeInTheDocument();
  expect(screen.getByTestId("coin-row-ethereum")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /load more/i })).toBeInTheDocument();
});

it("renders an error row when the query fails", () => {
  mockUseCoinsInfinite.mockReturnValue({
    status: "error",
    data: undefined,
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    error: new Error("Network error"),
  });

  render(
    <table>
      <tbody>
        <CoinRowsClient />
      </tbody>
    </table>
  );

  expect(screen.getByText(/failed to load coins: network error/i)).toBeInTheDocument();
});
