"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/use-currency";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  index?: number;
  exchangeRates?: Record<string, number>;
}

export function ProductCard({ product, index = 0, exchangeRates }: ProductCardProps) {
  const { addItem, isInCart, openCart } = useCart();
  const { getPriceDisplay } = useCurrency(exchangeRates);
  const inCart = isInCart(product.id);
  const priceDisplay = getPriceDisplay(product.price, product.prices);

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
      className="relative bg-card rounded-2xl p-8 border-2 transition-all duration-300 border-transparent hover:border-gold/30"
    >
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
          ${inCart
            ? "bg-foreground/10 text-foreground hover:bg-foreground/20"
            : "bg-foreground text-primary-foreground hover:bg-foreground/90"
          }
        `}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        {inCart ? "View Cart" : "Add to Cart"}
      </Button>

      {/* Learn More Link */}
      <Link
        href={`/products/${product.slug}`}
        className="flex items-center justify-center gap-1.5 mt-4 px-4 py-2 rounded-lg text-sm font-medium bg-white text-foreground border border-foreground/10 hover:border-gold/40 hover:text-gold transition-colors"
      >
        Learn more
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </motion.div>
  );
}
