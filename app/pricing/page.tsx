"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/pricing/product-card";
import { modules, websiteService, websiteAddons, landingPageProduct, websiteTiers } from "@/lib/products";
import { useCurrency } from "@/lib/use-currency";
import { Check, HelpCircle, ArrowRight, Sparkles, Globe, Zap, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PricingPage() {
  const { getPriceDisplay, currency } = useCurrency();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
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

      {/* Website Service with Tiers */}
      <section className="pb-16 md:pb-24">
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
                    className={`relative bg-white/5 backdrop-blur rounded-xl p-6 border ${
                      tier.isPopular ? "border-gold" : "border-white/10"
                    }`}
                  >
                    {tier.isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gold text-foreground hover:bg-gold px-3 py-1 text-xs font-medium">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}

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
                              {getPriceDisplay(tier.monthlyPrice).symbol}{getPriceDisplay(tier.monthlyPrice).amount}
                            </span>
                            <span className="text-primary-foreground/60">{getPriceDisplay(tier.monthlyPrice).periodLabel}</span>
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

              <div className="text-center mt-8">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold-dark text-foreground font-medium"
                  asChild
                >
                  <Link href="/checkout">
                    Get Started <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Landing Page Product */}
      <section className="pb-16 md:pb-24">
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
                    {getPriceDisplay(landingPageProduct.price).symbol}{getPriceDisplay(landingPageProduct.price).amount}
                  </span>
                  <span className="text-foreground/60">{getPriceDisplay(landingPageProduct.price).periodLabel}</span>
                </div>

                <Button
                  size="lg"
                  className="bg-foreground text-primary-foreground hover:bg-foreground/90 font-medium"
                  asChild
                >
                  <Link href="/checkout">
                    Get Landing Page <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
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
          </motion.div>
        </Container>
      </section>

      {/* Platform Modules Header */}
      <section className="pb-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Platform Modules
            </h2>
            <p className="text-foreground/70">
              Standalone products you can add to your toolkit. All modules integrate seamlessly.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Modules Grid */}
      <section className="pb-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {modules.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Website Addons Section */}
      <section className="py-16 md:py-24 bg-foreground/[0.02]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-6">
              <Package className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold">Website Addons</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Extend Your Website
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Add powerful functionality to your website. These addons require an active Website subscription.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {websiteAddons.map((addon, index) => (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border-2 border-transparent hover:border-gold/30 transition-all"
              >
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs">
                    {currency === 'ILS' ? 'דורש אתר' : 'Requires Website'}
                  </Badge>
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {addon.name}
                </h3>
                <p className="text-foreground/60 text-sm mb-4">
                  {addon.shortDescription}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-display font-bold text-foreground">
                    {getPriceDisplay(addon.price).symbol}{getPriceDisplay(addon.price).amount}
                  </span>
                  <span className="text-foreground/60">{getPriceDisplay(addon.price).periodLabel}</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {addon.features.slice(0, 4).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/70 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="w-full">
                  Add to Website
                </Button>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* What's Included Section */}
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
              No matter which product you choose, you'll always get these essentials.
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

      {/* FAQ Section */}
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
                answer: "A Landing Page ($89/mo) is a single, high-converting page perfect for campaigns, lead generation, or promotions. A Website is a multi-page solution with tiered pricing based on the number of pages you need (Starter: 3 pages, Standard: 10 pages, Professional: 20 pages).",
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

      {/* Final CTA */}
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
