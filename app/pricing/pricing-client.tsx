"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/pricing/product-card";
import { Product, websiteService, websiteTiers } from "@/lib/products";
import { useCurrency } from "@/lib/use-currency";
import { Check, HelpCircle, ArrowRight, Globe, Zap, Package, ShoppingBag, Bot, ChevronDown, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";

interface PricingClientProps {
  modules: Product[];
  websiteAddons: Product[];
  landingPageAddons: Product[];
  aiAgentProduct: Product | null;
  landingPageProduct: Product;
  websiteVariantPrices?: Record<number, Record<string, number> | null>;
}

const navItems = [
  { id: "website", label: "Website", icon: Globe },
  { id: "ai-agent", label: "AI Agent", icon: Bot },
  { id: "modules", label: "Modules", icon: LayoutGrid },
  { id: "landing-page", label: "Landing Page", icon: Zap },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PricingClient({ modules, websiteAddons, landingPageAddons, aiAgentProduct, landingPageProduct, websiteVariantPrices = {} }: PricingClientProps) {
  const { getPriceDisplay, currency } = useCurrency();
  const { addItem, isInCart, openCart } = useCart();
  const [showWebsiteAddons, setShowWebsiteAddons] = useState(false);
  const [showLandingAddons, setShowLandingAddons] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 md:pt-28 pb-10 md:pb-14">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Currency Indicator */}
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium text-gold">
                {currency === 'USD' ? 'Prices in US Dollars' : 'מחירים בשקלים'}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              No hidden fees. No surprises. Just professional digital infrastructure
              at prices that make sense for your business.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Anchor Navigation */}
      <section className="pb-12 md:pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-foreground/[0.04] border border-foreground/10 hover:border-gold/40 hover:bg-gold/5 transition-all duration-200"
                >
                  <Icon className="h-4 w-4 text-foreground/50 group-hover:text-gold transition-colors" />
                  <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WEBSITE SERVICE
       ═══════════════════════════════════════════════════════════════════════ */}
      <section id="website" className="pb-16 md:pb-24 scroll-mt-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-foreground to-foreground/90 rounded-3xl overflow-hidden relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-2xl" />

            <div className="relative p-8 md:p-12 lg:p-16">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-full mb-6">
                  <Globe className="h-4 w-4 text-gold" />
                  <span className="text-sm font-medium text-gold">Fully Managed Website Service</span>
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                  {websiteService.name}
                </h2>

                <p className="text-xl text-primary-foreground/80 mb-4">
                  {websiteService.tagline}
                </p>

                <p className="text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
                  {websiteService.description}
                </p>
              </div>

              {/* Pricing Tiers Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {websiteTiers.map((tier, index) => (
                  <motion.div
                    key={tier.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="relative bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10"
                  >
                    <div className="text-center">
                      <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                        {tier.name}
                      </h3>
                      <p className="text-primary-foreground/60 text-sm mb-4">
                        {tier.description}
                      </p>

                      {tier.monthlyPrice > 0 ? (
                        <>
                          <div className="flex items-baseline justify-center gap-1 mb-2">
                            <span className="text-3xl font-display font-bold text-primary-foreground">
                              {getPriceDisplay(tier.monthlyPrice, websiteVariantPrices[tier.monthlyPrice]).symbol}{getPriceDisplay(tier.monthlyPrice, websiteVariantPrices[tier.monthlyPrice]).amount}
                            </span>
                            <span className="text-primary-foreground/60">{getPriceDisplay(tier.monthlyPrice, websiteVariantPrices[tier.monthlyPrice]).periodLabel}</span>
                          </div>
                          <p className="text-primary-foreground/70 text-sm">
                            {tier.maxPages ? (currency === 'ILS' ? `עד ${tier.maxPages} עמודים` : `Up to ${tier.maxPages} pages`) : (currency === 'ILS' ? "עמודים מותאמים" : "Custom pages")}
                          </p>
                        </>
                      ) : (
                        <div className="py-2">
                          <span className="text-xl font-display font-bold text-primary-foreground">
                            {currency === 'ILS' ? 'תמחור מותאם' : 'Custom Pricing'}
                          </span>
                          <p className="text-primary-foreground/70 text-sm mt-2">
                            {currency === 'ILS' ? 'צרו קשר לקבלת הצעה' : 'Contact us for a quote'}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
                <h3 className="font-display text-lg font-semibold text-primary-foreground mb-6 text-center">
                  All Website Plans Include
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {websiteService.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-gold" />
                      </div>
                      <span className="text-primary-foreground/90 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold-dark text-foreground font-medium"
                  asChild
                >
                  <Link href="/products/website">
                    Learn More <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>

                {websiteAddons.length > 0 && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white/20 text-primary-foreground hover:bg-white/5"
                    onClick={() => setShowWebsiteAddons(!showWebsiteAddons)}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    {showWebsiteAddons ? "Hide" : "View"} Website Addons ({websiteAddons.length})
                    <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${showWebsiteAddons ? "rotate-180" : ""}`} />
                  </Button>
                )}
              </div>

              {/* Expandable Website Addons */}
              <AnimatePresence>
                {showWebsiteAddons && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-10">
                      <div className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10">
                        <div className="text-center mb-8">
                          <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                            Website Addons
                          </h3>
                          <p className="text-primary-foreground/60 text-sm">
                            Add powerful functionality to your website. Requires an active Website subscription.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {websiteAddons.map((addon) => (
                            <div
                              key={addon.id}
                              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-gold/30 transition-all"
                            >
                              <h4 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                                {addon.name}
                              </h4>
                              <p className="text-primary-foreground/50 text-sm mb-4">
                                {addon.shortDescription}
                              </p>

                              <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-2xl font-display font-bold text-primary-foreground">
                                  {getPriceDisplay(addon.price, addon.prices).symbol}{getPriceDisplay(addon.price, addon.prices).amount}
                                </span>
                                <span className="text-primary-foreground/50">{getPriceDisplay(addon.price, addon.prices).periodLabel}</span>
                              </div>

                              <ul className="space-y-2 mb-5">
                                {addon.features.slice(0, 3).map((feature, featureIndex) => (
                                  <li key={featureIndex} className="flex items-start gap-2">
                                    <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                                    <span className="text-primary-foreground/70 text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>

                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full bg-transparent border-white/20 text-primary-foreground hover:bg-white/5"
                                onClick={() => {
                                  if (isInCart(addon.id)) {
                                    openCart();
                                  } else {
                                    addItem(addon);
                                    openCart();
                                  }
                                }}
                              >
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                {isInCart(addon.id) ? "View Cart" : "Add to Cart"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          AI AGENT
       ═══════════════════════════════════════════════════════════════════════ */}
      {aiAgentProduct && (
        <section id="ai-agent" className="py-16 md:py-24 bg-gradient-to-br from-foreground to-foreground/95 scroll-mt-8">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Explanation */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-full mb-6">
                    <Bot className="h-4 w-4 text-gold" />
                    <span className="text-sm font-medium text-gold">AI-Powered Enhancement</span>
                  </div>

                  <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    AI Agents Credit System
                  </h2>

                  <p className="text-primary-foreground/70 text-lg mb-6 leading-relaxed">
                    AI Agents enhance your existing modules with intelligent automation. Purchase credits once,
                    use them across <strong className="text-primary-foreground">all compatible modules</strong>.
                  </p>

                  <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 mb-6">
                    <h3 className="font-display text-lg font-semibold text-primary-foreground mb-4">
                      How It Works
                    </h3>
                    <ol className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-sm font-bold">1</span>
                        <span className="text-primary-foreground/80 text-sm">Subscribe to modules you need (CRM, WhatsApp, Email, etc.)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-sm font-bold">2</span>
                        <span className="text-primary-foreground/80 text-sm">Add AI Agents to get monthly credits</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center text-sm font-bold">3</span>
                        <span className="text-primary-foreground/80 text-sm">Credits work across all your modules automatically</span>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
                    <h3 className="font-display text-sm font-semibold text-primary-foreground/60 mb-3 uppercase tracking-wide">
                      Works With These Modules
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['CRM', 'Email Marketing', 'WhatsApp', 'Booking System', 'Employee Management', 'Project Management'].map((module, index) => (
                        <div key={index} className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                          <Check className="h-4 w-4 text-gold flex-shrink-0" />
                          <span>{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side - Product Card */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/5 backdrop-blur rounded-2xl p-8 border-2 border-gold/30"
                  >
                    <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                      {aiAgentProduct.name}
                    </h3>
                    <p className="text-primary-foreground/60 mb-6">
                      {aiAgentProduct.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-sm text-primary-foreground/60">Starting from</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-display font-bold text-primary-foreground">
                          {getPriceDisplay(aiAgentProduct.price, aiAgentProduct.prices).symbol}{getPriceDisplay(aiAgentProduct.price, aiAgentProduct.prices).amount}
                        </span>
                        <span className="text-primary-foreground/60 text-lg">{getPriceDisplay(aiAgentProduct.price, aiAgentProduct.prices).periodLabel}</span>
                      </div>
                      <p className="text-primary-foreground/50 text-sm mt-2">
                        Includes monthly AI credits for all modules
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {aiAgentProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-primary-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      size="lg"
                      className="w-full bg-gold hover:bg-gold-dark text-foreground font-medium mb-3"
                      onClick={() => {
                        if (isInCart(aiAgentProduct.id)) {
                          openCart();
                        } else {
                          addItem(aiAgentProduct);
                          openCart();
                        }
                      }}
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      {isInCart(aiAgentProduct.id) ? "View Cart" : "Add to Cart"}
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full bg-transparent border-white/20 text-primary-foreground hover:bg-white/5"
                      asChild
                    >
                      <Link href="/products/ai-agent">
                        Learn More <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>

                    <p className="text-primary-foreground/50 text-xs text-center mt-4">
                      {currency === 'ILS' ? 'דורש לפחות מודול אחד' : 'Requires at least one module'}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PLATFORM MODULES
       ═══════════════════════════════════════════════════════════════════════ */}
      <section id="modules" className="py-16 md:py-24 scroll-mt-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-6">
              <LayoutGrid className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">Platform Modules</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Build Your Stack
            </h2>
            <p className="text-foreground/70">
              Each module works on its own — and gets smarter with AI Agents. Add what you need, when you need it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {modules.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          LANDING PAGE
       ═══════════════════════════════════════════════════════════════════════ */}
      <section id="landing-page" className="py-16 md:py-24 bg-foreground/[0.02] scroll-mt-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 md:p-12 border-2 border-gold/30"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-6">
                  <Zap className="h-4 w-4 text-gold" />
                  <span className="text-sm font-medium text-gold">Single Page Solution</span>
                </div>

                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {landingPageProduct.name}
                </h2>

                <p className="text-foreground/70 leading-relaxed mb-6">
                  {landingPageProduct.description}
                </p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-display font-bold text-foreground">
                    {getPriceDisplay(landingPageProduct.price, landingPageProduct.prices).symbol}{getPriceDisplay(landingPageProduct.price, landingPageProduct.prices).amount}
                  </span>
                  <span className="text-foreground/60">{getPriceDisplay(landingPageProduct.price, landingPageProduct.prices).periodLabel}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-foreground text-primary-foreground hover:bg-foreground/90 font-medium"
                    onClick={() => {
                      if (isInCart(landingPageProduct.id)) {
                        openCart();
                      } else {
                        addItem(landingPageProduct);
                        openCart();
                      }
                    }}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    {isInCart(landingPageProduct.id) ? "View Cart" : "Add to Cart"}
                  </Button>

                  {landingPageAddons.length > 0 && (
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setShowLandingAddons(!showLandingAddons)}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Addons ({landingPageAddons.length})
                      <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${showLandingAddons ? "rotate-180" : ""}`} />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {landingPageProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-5 w-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-gold" />
                    </div>
                    <span className="text-foreground/80 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expandable Landing Page Addons */}
            <AnimatePresence>
              {showLandingAddons && landingPageAddons.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-10 border-t border-foreground/10 mt-10">
                    <div className="text-center mb-8">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        Landing Page Addons
                      </h3>
                      <p className="text-foreground/60 text-sm">
                        Extend your landing page with these add-ons. Requires an active Landing Page subscription.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                      {landingPageAddons.map((addon) => (
                        <div
                          key={addon.id}
                          className="bg-foreground/[0.03] rounded-xl p-6 border border-foreground/10 hover:border-gold/30 transition-all"
                        >
                          <div className="mb-3">
                            <Badge variant="outline" className="text-xs">
                              {currency === 'ILS' ? 'דורש דף נחיתה' : 'Requires Landing Page'}
                            </Badge>
                          </div>

                          <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                            {addon.name}
                          </h4>
                          <p className="text-foreground/60 text-sm mb-4">
                            {addon.shortDescription}
                          </p>

                          <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-2xl font-display font-bold text-foreground">
                              {getPriceDisplay(addon.price, addon.prices).symbol}{getPriceDisplay(addon.price, addon.prices).amount}
                            </span>
                            <span className="text-foreground/60">{getPriceDisplay(addon.price, addon.prices).periodLabel}</span>
                          </div>

                          <ul className="space-y-2 mb-5">
                            {addon.features.slice(0, 3).map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start gap-2">
                                <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                                <span className="text-foreground/70 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              if (isInCart(addon.id)) {
                                openCart();
                              } else {
                                addItem(addon);
                                openCart();
                              }
                            }}
                          >
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            {isInCart(addon.id) ? "View Cart" : "Add to Cart"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHAT'S INCLUDED
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What You Get With Every Product
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              No matter which product you choose, you&apos;ll always get these essentials.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Managed by Max AI",
                description: "Our AI assistant handles updates, changes, and day-to-day management.",
              },
              {
                title: "Priority Support",
                description: "Chat with our team anytime. We respond within hours, not days.",
              },
              {
                title: "No Lock-in Contracts",
                description: "Cancel anytime. We'll even help you export your data.",
              },
              {
                title: "Regular Updates",
                description: "We continuously improve your setup with the latest best practices.",
              },
              {
                title: "Seamless Integration",
                description: "All products work together automatically. No complex setup required.",
              },
              {
                title: "Unlimited Max Access",
                description: "Chat with Max as much as you want. No per-use charges, ever.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-foreground/[0.02]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Common Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What's the difference between a Landing Page and Website?",
                answer: `A Landing Page ($${landingPageProduct.price}/mo) is a single, high-converting page perfect for campaigns, lead generation, or promotions. A Website is a multi-page solution with tiered pricing based on the number of pages you need (Starter: 3 pages, Standard: 10 pages, Professional: 20 pages).`,
              },
              {
                question: "What happens after I subscribe?",
                answer: "You'll get a welcome email from Max, our AI assistant. Max will guide you through onboarding, gather your requirements, and connect you with our team. Your setup typically goes live within 1-2 weeks.",
              },
              {
                question: "Can I add Website Addons without a Website?",
                answer: "No, Website Addons (Digital Courses, Booking System, Events Management) require an active Website subscription. They're extensions that add functionality to your website.",
              },
              {
                question: "Can I upgrade my website tier later?",
                answer: "Absolutely! You can upgrade from Starter to Standard or Professional anytime. We'll prorate the difference on your next billing cycle.",
              },
              {
                question: "Is there a setup fee?",
                answer: "No setup fees for any of our products. The monthly price is all you pay. We invest in getting you started right because we believe in long-term relationships.",
              },
              {
                question: "How do I cancel?",
                answer: "You can cancel anytime through your dashboard or by messaging Max. No questions asked, and we'll help you export your data if needed.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6"
              >
                <div className="flex gap-4">
                  <HelpCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {item.question}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FINAL CTA
       ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-foreground">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Add the products you need to your cart and we&apos;ll have you up and running
              in no time.
            </p>
            <p className="text-gold font-medium">
              Questions? Chat with Max anytime.
            </p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
