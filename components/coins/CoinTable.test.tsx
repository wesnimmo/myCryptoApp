import { render, screen } from "@testing-library/react";
import CoinTable from "./CoinTable";
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

jest.mock("./CoinRowsClient", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <tr>
      <td>Mock Coin Rows Client</td>
    </tr>
  )),
}));

describe("CoinTable component", () => {
  it("renders table headers, search bar, and CoinRowsClient", () => {
    render(<CoinTable />);

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

    expect(screen.getByPlaceholderText(/search coins/i)).toBeInTheDocument();
    expect(screen.getByText("Mock Coin Rows Client")).toBeInTheDocument();
    expect(CoinRowsClient).toHaveBeenCalledTimes(1);
  });
});
