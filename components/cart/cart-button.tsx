"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";

export function CartButton() {
  const { itemCount, toggleCart } = useCart();

  // Don't show button if cart is empty
  if (itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleCart}
          size="lg"
          className="bg-gold hover:bg-gold-dark text-foreground rounded-full h-14 w-14 p-0 shadow-lg shadow-gold/30"
        >
          <div className="relative">
            <ShoppingBag className="h-6 w-6" />
            <span className="absolute -top-1.5 -right-2.5 bg-foreground text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          </div>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
