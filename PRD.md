# Product Requirements Document (PRD) — Crypto App

## 1. Project Overview

A production-grade, highly responsive cryptocurrency dashboard and detail viewer built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and the CoinGecko API.

## 2. Target Audience & Goals

- **Target Audience:** Crypto enthusiasts, casual investors, and academic auditors evaluating full-stack development best practices.

- **Core Goals:** Deliver real-time crypto prices, seamless currency conversion, responsive historical charts, and clean, type-safe code under strict TDD practices.

## 3. Core Features & Scope

- **[Completed] Market Overview Table:** Live market data, pagination (10 per page), global currency conversion (USD, EUR, GBP, AUD), search filtering, sparklines.

- **[Completed] CI/CD & Testing:** GitHub Actions pipeline, Jest + React Testing Library suite, MSW mocks.

- **[Active/In-Progress] Coin Detail Page `/coins/[id]`):**

  - Responsive 2-column grid layout.

  - Type-safe market statistics (Rank, Market Cap, FDV, Circulating Supply).

  - Sanitized HTML description rendering `isomorphic-dompurify`).

  - Interactive price charts across multi-timeframe intervals (24h, 7d, 30d, 1y).

  - Bidirectional currency conversion tool.

## 4. Quality & Architecture Constraints

- Next.js Server Components preferred for data fetching; Client Components isolated for interactivity `"use client"`).

- Strict TypeScript enforcement (no unnecessary `any` usage).

- Sanitized external markup to prevent XSS.

- Full dark/light mode compatibility using Tailwind v4 custom variants.