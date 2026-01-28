"use client";

import { motion } from "framer-motion";
import { Check, ShoppingBag, Sparkles } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/use-currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, isInCart, openCart } = useCart();
  const { getPriceDisplay } = useCurrency();
  const inCart = isInCart(product.id);
  const priceDisplay = getPriceDisplay(product.price);

  const handleAddToCart = () => {
    if (inCart) {
      openCart();
    } else {
      addItem(product);
      openCart();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative bg-card rounded-2xl p-8
        border-2 transition-all duration-300
        ${product.isPopular
          ? "border-gold shadow-lg shadow-gold/10"
          : "border-transparent hover:border-gold/30"
        }
      `}
    >
      {/* Popular Badge */}
      {product.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-gold text-foreground hover:bg-gold px-4 py-1 font-medium">
            <Sparkles className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-foreground/60 text-sm">
          {product.shortDescription}
        </p>
      </div>

      {/* Price */}
      <div className="text-center mb-8">
        {product.pricePrefix && (
          <p className="text-foreground/60 text-sm mb-1">{product.pricePrefix}</p>
        )}
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-display font-bold text-foreground">
            {priceDisplay.symbol}{priceDisplay.amount}
          </span>
          <span className="text-foreground/60">{priceDisplay.periodLabel}</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {product.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start gap-3">
            <div className="mt-0.5 h-5 w-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
              <Check className="h-3 w-3 text-gold" />
            </div>
            <span className="text-foreground/80 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Button
        onClick={handleAddToCart}
        className={`
          w-full py-6 text-base font-medium transition-all
          ${product.isPopular
            ? "bg-gold hover:bg-gold-dark text-foreground"
            : inCart
              ? "bg-foreground/10 text-foreground hover:bg-foreground/20"
              : "bg-foreground text-primary-foreground hover:bg-foreground/90"
          }
        `}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        {inCart ? "View Cart" : "Add to Cart"}
      </Button>
    </motion.div>
  );
}
