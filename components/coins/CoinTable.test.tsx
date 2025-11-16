import { render, screen } from "@testing-library/react";
import CoinTable from "./CoinTable";
import CoinRowsClient from "./CoinRowsClient";

jest.mock("./CoinRowsClient", () => ({
  __esModule: true,
  default: jest.fn(() => (
    <tr>
      <td>Mock Coin Rows Client</td>
    </tr>
  )),
}));

describe("CoinTable component", () => {
  it("renders table headers and the CoinRowsClient component", () => {
    render(<CoinTable />);

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

    // Mocked child
    expect(screen.getByText("Mock Coin Rows Client")).toBeInTheDocument();
    expect(CoinRowsClient).toHaveBeenCalledTimes(1);
  });
});
