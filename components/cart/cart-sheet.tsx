"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

export function CartSheet() {
  const router = useRouter();
  const { items, total, isOpen, closeCart, removeItem, clearCart } = useCart();

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col bg-background border-l border-foreground/10">
        <SheetHeader className="border-b border-foreground/10 pb-4">
          <SheetTitle className="font-display text-xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gold" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="h-16 w-16 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-foreground/30" />
            </div>
            <p className="text-foreground/60 mb-2">Your cart is empty</p>
            <p className="text-foreground/40 text-sm">
              Add products from the pricing page to get started.
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl"
                  >
                    <div className="flex-1">
                      <h4 className="font-display font-semibold text-foreground">
                        {item.product.name}
                      </h4>
                      <p className="text-foreground/60 text-sm mt-0.5">
                        {item.product.shortDescription}
                      </p>
                      <p className="text-gold font-medium mt-2">
                        ${item.product.price}/mo
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-foreground/40 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-foreground/10 pt-6 space-y-6">
              {/* Total */}
              <div className="flex items-center justify-between px-1">
                <span className="text-foreground/70 font-medium">Monthly Total</span>
                <span className="font-display text-2xl font-bold text-foreground">
                  ${total}/mo
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gold hover:bg-gold-dark text-foreground py-6 text-base font-medium"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  onClick={clearCart}
                  variant="ghost"
                  className="w-full text-foreground/60 hover:text-foreground"
                >
                  Clear Cart
                </Button>
              </div>

              {/* Info text */}
              <p className="text-center text-foreground/50 text-xs leading-relaxed px-2">
                You&apos;ll be able to review your order before confirming.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
