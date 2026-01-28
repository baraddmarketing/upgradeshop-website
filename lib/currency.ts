/**
 * Currency utilities for UpgradeShop marketing website
 *
 * Supports USD and ILS with automatic detection based on selected language
 */

import { getCurrentLanguage, getCurrencyForLanguage } from './i18n';

export type Currency = 'USD' | 'ILS';

// Approximate USD to ILS conversion rate (update periodically)
// Using a conservative rate that's slightly higher to account for fluctuations
const USD_TO_ILS_RATE = 3.7;

export interface PriceDisplay {
  amount: number;
  currency: Currency;
  symbol: string;
  formatted: string;
}

/**
 * Detect preferred currency based on selected language
 * Uses saved language preference, falls back to browser language
 */
export function detectCurrency(): Currency {
  if (typeof window === 'undefined') {
    return 'USD'; // Server-side default
  }

  // Use the language-based currency detection
  const lang = getCurrentLanguage();
  return getCurrencyForLanguage(lang);
}

/**
 * Convert USD price to the target currency
 */
export function convertPrice(usdPrice: number, targetCurrency: Currency): number {
  if (targetCurrency === 'USD') {
    return usdPrice;
  }

  // Convert to ILS and round to nearest 10
  const ilsPrice = usdPrice * USD_TO_ILS_RATE;
  return Math.round(ilsPrice / 10) * 10;
}

/**
 * Format price for display
 */
export function formatPrice(usdPrice: number, currency: Currency): PriceDisplay {
  const amount = convertPrice(usdPrice, currency);
  const symbol = currency === 'ILS' ? '₪' : '$';

  // Format the number
  const formatted = currency === 'ILS'
    ? `${symbol}${amount.toLocaleString('he-IL')}`
    : `${symbol}${amount}`;

  return {
    amount,
    currency,
    symbol,
    formatted,
  };
}

/**
 * Get price string with /mo suffix
 */
export function formatPriceWithPeriod(usdPrice: number, currency: Currency): string {
  const { formatted } = formatPrice(usdPrice, currency);
  const periodSuffix = currency === 'ILS' ? '/חודש' : '/mo';
  return `${formatted}${periodSuffix}`;
}

/**
 * Price display component helper - returns all needed values
 */
export function getPriceDisplayValues(usdPrice: number, currency: Currency) {
  const { amount, symbol, formatted } = formatPrice(usdPrice, currency);
  const periodLabel = currency === 'ILS' ? '/חודש' : '/mo';

  return {
    amount,
    symbol,
    formatted,
    periodLabel,
    fullPrice: `${formatted}${periodLabel}`,
  };
}
