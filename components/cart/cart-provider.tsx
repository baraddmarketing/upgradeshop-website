"use client";

import { CartProvider as CartContextProvider } from "@/lib/cart-context";
import { CartButton } from "./cart-button";
import { CartSheet } from "./cart-sheet";

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  return (
    <CartContextProvider>
      {children}
      <CartButton />
      <CartSheet />
    </CartContextProvider>
  );
}
