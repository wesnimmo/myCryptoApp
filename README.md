# Crypto App

A modern cryptocurrency dashboard built with **Next.js (App Router, TypeScript)**, **Tailwind CSS v4**, **React Query**, and the **CoinGecko API**.  
This project demonstrates a production-grade, accessible, responsive UI with global dark/light mode, live market data, robust state management, and test-driven development.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Design & Technical Decisions](#design--technical-decisions)
- [Directory Structure](#directory-structure)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Live Market Data** – Real-time cryptocurrency prices and metadata from CoinGecko.
- **Global Currency Selector** – Instantly convert prices between USD, AUD, GBP, EUR.
- **Theme Toggle** – Persistent dark/light mode with accessible toggle.
- **Responsive Table UI** – Custom table with rank, symbol, price, 24h change, 24h volume, and sparklines.
- **Pagination** – View 10 coins per page, with intuitive navigation.
- **Search Filtering** – Filter table by currency name or symbol.
- **Coin Detail View** – Individual currency pages with large chart, metadata, and interactive conversion calculator.
- **Top Movers Ticker** – Animated ticker for top 10 gainers over 24h/7d.
- **Reusable API Layer** – Centralized, type-safe API logic with React Query caching.
- **TDD-First Approach** – Comprehensive unit/integration tests with Jest and React Testing Library.
- **CI/CD** – Automated linting, tests, and deployment via GitHub Actions and Vercel.

## Demo

- **Live App**: [https://my-crypto-app-beta.vercel.app/](https://my-crypto-app-beta.vercel.app/)  
*Note: Demo uses public CoinGecko API—occasionally subject to rate limits.*

![Crypto App Screenshot](./public/demo Tech Stack

| Tool                      | Purpose                                      |
|---------------------------|----------------------------------------------|
| **Next.js (14+)**         | Fullstack React with App Router, SSR/SSG     |
| **TypeScript**            | Type safety and scalable architecture        |
| **Tailwind CSS v4**       | Utility-first, responsive, dark mode styling |
| **@tanstack/react-query** | Declarative fetching, caching, pagination    |
| **Jest**                  | Unit test runner                             |
| **React Testing Library** | DOM-level component integration testing      |
| **CoinGecko API**         | Real-time crypto data                        |
| **GitHub Actions**        | Continuous Integration/Deployment            |
| **Vercel**                | Hosting and edge infra support               |

## Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/wesnimmo/myCryptoApp.git
cd myCryptoApp
npm install          # or yarn install
cp .env.example .env.local
# (free version of coingecko api does not require my key)
npm run dev
```

- The app runs at [http://localhost:3000](http://localhost:3000) by default.
- To run tests:  
  ```bash
  npm run test
  ```

## Design & Technical Decisions

- **Next.js App Router**  
  Chosen for file-based routing, server/client component flexibility, and seamless SSR support.

- **TypeScript**  
  Ensures type safety across all API interactions, React context, and state management.

- **Tailwind CSS v4 with CSS Variables**  
  Enables design tokens and fast theme switching. Uses new `@custom-variant` dark mode (see `/app/globals.css`).

- **React Query**  
  Simplifies fetching, pagination, caching, and background data sync from CoinGecko.

- **Custom API Layer**  
  All API logic centralized in `/lib/coingecko.ts`, enabling easy TDD and isolation for tests.

- **TDD Workflow**  
  Every utility, hook, and context provider has associated tests. New UI/components are tested for accessibility and edge cases.

- **Environment Variables**  
  For advanced CoinGecko API usage, `COINGECKO_API_KEY` can be added to `.env.local` (never commit real keys). The free tier is sufficient for most personal use.

- **Accessibility**  
  Color contrast, keyboard navigation, and ARIA labeling prioritized for all controls.

## Directory Structure

```
/app           # Next.js App Router pages/layout
/components    # Reusable React UI components
/context       # React Context providers (e.g., ThemeProvider)
/hooks         # Custom hooks (e.g., useCoins)
/lib           # API utilities (e.g., coingecko.ts)
/providers     # Context wrappers for app-wide state (e.g., QueryProvider)
/public        # Static assets (images, etc.)
/tests         # Jest/RTL test files (if outside __tests__)
README.md
.env.example
package.json
```

## Testing

- **Frameworks:** Jest, React Testing Library.
- **Tools Used**: [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/react) for unit and integration testing, with [MSW (Mock Service Worker)](https://mswjs.io/) for mocking CoinGecko API responses during tests.
- **Coverage:** API utilities, context logic, custom hooks, major UI components.
- **How to run:**  
  ```bash
  npm run test
  ```
- **Other:**  
  - API calls are mocked—no live CoinGecko hits during test runs.
  - Linting and tests also run in CI (GitHub Actions).
  - TDD is used for new features/workflows.

## Future Enhancements

- Add user authentication and favorites watchlist
- SSR for improved SEO on coin detail pages
- Enhanced chart interactivity with charting library
- Push notification support for price movements
- Localized number/currency formatting
- Performance tuning and Lighthouse optimization

## Contributing

Contributions welcome!  
- Fork this repo, make your feature branch from `main`, and open a pull request.
- For major changes, open an issue first to discuss what you’d like to change.
- See [CONTRIBUTING.md](./CONTRIBUTING.md) if present.

## License

MIT — see [LICENSE](./LICENSE) for details.

## Contact

Made by Wes Nimmo (mailto:wesnimmo@gmail.com).
For issues or feature requests, open a GitHub issue or contact via email.

> **Note:**  
> This project uses **Tailwind CSS v4** with native custom dark mode and a minimal, scalable Next.js App Router structure.  
> The CoinGecko public API’s rate limits may affect demo availability during high-traffic periods.

