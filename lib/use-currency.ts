"use client";

import { useState, useEffect } from 'react';
import { Currency, detectCurrency, formatPrice, getPriceDisplayValues } from './currency';

/**
 * Hook to get the user's preferred currency based on browser language
 * Automatically updates when language changes via localStorage
 */
export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Detect currency on client side
    const detected = detectCurrency();
    setCurrency(detected);
    setIsReady(true);

    // Listen for language changes in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language') {
        const newCurrency = detectCurrency();
        setCurrency(newCurrency);
      }
    };

    // Also listen for custom language change events
    const handleLanguageChange = () => {
      const newCurrency = detectCurrency();
      setCurrency(newCurrency);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  return {
    currency,
    isReady,
    formatPrice: (usdPrice: number) => formatPrice(usdPrice, currency),
    getPriceDisplay: (usdPrice: number, dbPrices?: Record<string, number> | null) =>
      getPriceDisplayValues(usdPrice, currency, dbPrices),
  };
}
