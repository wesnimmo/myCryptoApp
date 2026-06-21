import { render, screen, fireEvent } from "@testing-library/react";
import CoinSearchBar from "./CoinSearchBar";

const mockSetSearch = jest.fn();

jest.mock("@/context/ThemeContext", () => ({
  useTheme: () => ({
    currency: "usd",
    isDarkMode: false,
    toggleTheme: jest.fn(),
    setCurrency: jest.fn(),
    search: "btc",
    setSearch: mockSetSearch,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("CoinSearchBar", () => {
  it("renders the search input with current search value", () => {
    render(
      <table>
        <tbody>
          <CoinSearchBar />
        </tbody>
      </table>
    );

    const input = screen.getByPlaceholderText(/search coins/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("btc");
  });

  it("calls setSearch when the input changes", () => {
    render(
      <table>
        <tbody>
          <CoinSearchBar />
        </tbody>
      </table>
    );

    fireEvent.change(screen.getByPlaceholderText(/search coins/i), {
      target: { value: "eth" },
    });

    expect(mockSetSearch).toHaveBeenCalledWith("eth");
  });
});
