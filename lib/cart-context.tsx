"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Product, CartItem, calculateCartTotal } from "./products";

// Cart state
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isHydrated: boolean;
}

// Cart actions
type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_ITEMS"; items: CartItem[] }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_HYDRATED" };

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
  isHydrated: false,
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // For subscription products, we only allow quantity of 1
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id
      );
      if (existingItem) {
        // Already in cart, don't add again
        return state;
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      };
    }
    case "CLEAR_CART": {
      return {
        ...state,
        items: [],
      };
    }
    case "SET_ITEMS": {
      return {
        ...state,
        items: action.items,
      };
    }
    case "OPEN_CART": {
      return {
        ...state,
        isOpen: true,
      };
    }
    case "CLOSE_CART": {
      return {
        ...state,
        isOpen: false,
      };
    }
    case "TOGGLE_CART": {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }
    case "SET_HYDRATED": {
      return {
        ...state,
        isHydrated: true,
      };
    }
    default:
      return state;
  }
}

// Context
interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  isOpen: boolean;
  isHydrated: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Storage key
const CART_STORAGE_KEY = "upgradeshop-cart";

// Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const items = JSON.parse(stored) as CartItem[];
          dispatch({ type: "SET_ITEMS", items });
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      } finally {
        // Mark as hydrated even if loading failed
        dispatch({ type: "SET_HYDRATED" });
      }
    }
  }, []);

  // Save cart to localStorage when items change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [state.items]);

  // Actions
  const addItem = useCallback((product: Product) => {
    dispatch({ type: "ADD_ITEM", product });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: "OPEN_CART" });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: "CLOSE_CART" });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: "TOGGLE_CART" });
  }, []);

  const isInCart = useCallback(
    (productId: string) => {
      return state.items.some((item) => item.product.id === productId);
    },
    [state.items]
  );

  // Computed values
  const itemCount = useMemo(() => state.items.length, [state.items]);
  const total = useMemo(() => calculateCartTotal(state.items), [state.items]);

  const value: CartContextType = {
    items: state.items,
    itemCount,
    total,
    isOpen: state.isOpen,
    isHydrated: state.isHydrated,
    addItem,
    removeItem,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
