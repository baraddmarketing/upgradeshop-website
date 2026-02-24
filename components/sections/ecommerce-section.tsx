"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function EcommerceSection() {
  const theirStack = [
    { tool: "Shopify (Basic/Standard)", cost: "$79–$105/mo" },
    { tool: "Klaviyo (email marketing)", cost: "$60–$150/mo" },
    { tool: "WhatsApp Business tool", cost: "$30–$80/mo" },
    { tool: "Website design / maintenance", cost: "$100–$300/mo" },
    { tool: "CRM or support tool", cost: "$25–$80/mo" },
    { tool: "Facebook & Instagram automation", cost: "$30–$60/mo" },
  ];

  const ourStack = [
    { item: "Professional Website (10 pages)", price: "$260/mo" },
    { item: "Full E-commerce add-on", price: "$50/mo" },
    { item: "Email Marketing", price: "$16/mo" },
    { item: "WhatsApp Integration", price: "$30/mo" },
    { item: "CRM", price: "$19/mo" },
    { item: "Facebook & Instagram", price: "$30/mo" },
    { item: "Personal AI Agent", price: "Included" },
  ];

  const benefits = [
    {
      stat: "Similar cost",
      desc: "Comparable to what you already pay — but for a unified, fully managed system",
    },
    {
      stat: "One login",
      desc: "Everything in one dashboard. Stop switching between 6 different platforms",
    },
    {
      stat: "AI that earns",
      desc: "Your agent recovers abandoned carts, re-engages past buyers, captures social leads automatically",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/4 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-6">
            <ShoppingCart className="h-4 w-4 text-gold-dark" />
            <span className="text-sm font-medium text-gold-dark">
              For E-Commerce Brands
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            You&apos;re already paying for all of this.
            <br />
            <span className="text-gold">Separately.</span>
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            A typical growing e-commerce brand pays{" "}
            <strong>$324–$775/mo</strong> across 6+ disconnected platforms —
            and still spends hours a week managing all of them.
          </p>
        </motion.div>

        {/* Stack comparison */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-14">
          {/* Their fragmented stack */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-3 w-3 bg-red-400/70 rounded-full" />
              <h3 className="font-semibold text-foreground">
                Typical fragmented stack
              </h3>
            </div>
            <div className="space-y-0">
              {theirStack.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-border/60 last:border-0"
                >
                  <span className="text-sm text-foreground/65">{item.tool}</span>
                  <span className="text-sm font-medium text-foreground">{item.cost}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-foreground text-lg">$324–$775/mo</span>
              </div>
              <p className="text-xs text-foreground/40">
                Plus hours each week managing all of it manually
              </p>
            </div>
          </motion.div>

          {/* Our unified stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-gold/30 bg-gold/5 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-3 w-3 bg-gold rounded-full" />
              <h3 className="font-semibold text-foreground">
                The Upgrade Shop — fully managed
              </h3>
            </div>
            <div className="space-y-0">
              {ourStack.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-gold/10 last:border-0"
                >
                  <span className="text-sm text-foreground/65">{item.item}</span>
                  <span
                    className={`text-sm font-medium ${
                      item.price === "Included"
                        ? "text-gold-dark"
                        : "text-foreground"
                    }`}
                  >
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gold/20">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-bold text-gold text-lg">$405/mo</span>
              </div>
              <p className="text-xs text-foreground/40">
                Everything managed. AI agent included. No juggling.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Three benefit tiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="text-center p-6 bg-card rounded-xl border border-border"
              >
                <p className="font-display text-xl font-bold text-gold mb-2">
                  {item.stat}
                </p>
                <p className="text-sm text-foreground/65">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-foreground/50 text-sm mb-5">
              For most businesses, we save time and reduce cost.{" "}
              <span className="text-foreground/70">
                For e-commerce, we also{" "}
                <strong className="text-foreground">generate revenue</strong> —
                through cart recovery, re-engagement, and social lead capture.
              </span>
            </p>
            <Button
              asChild
              className="bg-gold hover:bg-gold-dark text-foreground font-medium"
            >
              <Link href="/pricing">
                See E-Commerce Pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
