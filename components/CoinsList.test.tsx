// components/CoinsList.test.tsx
import { render, screen } from "@testing-library/react";
import CoinsList from './CoinsList'

// Sample mock coin data (expand fields as needed for your table)
const mockCoins = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 50000,
    price_change_percentage_24h: 1.23,
    price_change_percentage_7d_in_currency: 5.45,
    total_volume: 1000000,
    sparkline_in_7d: { price: [49500, 49600, 49800, 50000] },
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3100,
    price_change_percentage_24h: -2.11,
    price_change_percentage_7d_in_currency: 0.25,
    total_volume: 850000,
    sparkline_in_7d: { price: [3200, 3150, 3180, 3100] },
  },
];

describe("CoinsList component", () => {
  it("renders a table with coin data rows", () => {
    render(<CoinsList coins={mockCoins} />);
    // Table headings
    expect(screen.getByText(/symbol/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/current price/i)).toBeInTheDocument();
    expect(screen.getByText(/24h %/i)).toBeInTheDocument();
    expect(screen.getByText(/7d %/i)).toBeInTheDocument();
    expect(screen.getByText(/total volume/i)).toBeInTheDocument();
    expect(screen.getByText(/sparkline/i)).toBeInTheDocument();

    // Coin #1
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("50000")).toBeInTheDocument();
    expect(screen.getByText("1.23")).toBeInTheDocument();
    expect(screen.getByText("5.45")).toBeInTheDocument();
    expect(screen.getByText("1000000")).toBeInTheDocument();

    // Coin #2
    expect(screen.getByText("ETH")).toBeInTheDocument();
    expect(screen.getByText("Ethereum")).toBeInTheDocument();
    expect(screen.getByText("3100")).toBeInTheDocument();
    expect(screen.getByText("-2.11")).toBeInTheDocument();
    expect(screen.getByText("0.25")).toBeInTheDocument();
    expect(screen.getByText("850000")).toBeInTheDocument();
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
