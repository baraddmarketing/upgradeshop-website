"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { PageSection, getSection, getEditableText, getFieldId } from "@/lib/pages-api";

interface EcommerceSectionProps {
  sections: PageSection[];
}

export function EcommerceSection({ sections }: EcommerceSectionProps) {
  const ecommerceSection = getSection(sections, "ecommerce");
  const sectionId = ecommerceSection?.id;
  const sectionKey = ecommerceSection?.sectionKey;

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
    { stat: "Similar cost", desc: "Comparable to what you already pay — but for a unified, fully managed system" },
    { stat: "One login", desc: "Everything in one dashboard. Stop switching between 6 different platforms" },
    { stat: "AI that earns", desc: "Your agent recovers abandoned carts, re-engages past buyers, captures social leads automatically" },
  ];

  return (
    <section
      className="py-24 md:py-24 bg-background relative overflow-hidden"
      data-section-id={sectionId}
      data-section-key={sectionKey}
    >
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
            <span className="text-sm font-medium text-gold-dark" data-field-id={getFieldId(sections, "ecommerce", "p", 0) || undefined}>
              {getEditableText(sections, "ecommerce", "p", "For E-Commerce Brands", 0)}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-foreground mb-6">
            <span data-field-id={getFieldId(sections, "ecommerce", "h2", 0) || undefined}>
              {getEditableText(sections, "ecommerce", "h2", "You're already paying for all of this.", 0)}
            </span>
            <br />
            <span className="text-gold" data-field-id={getFieldId(sections, "ecommerce", "h2", 1) || undefined}>
              {getEditableText(sections, "ecommerce", "h2", "Separately.", 1)}
            </span>
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto" data-field-id={getFieldId(sections, "ecommerce", "p", 1) || undefined}>
            {getEditableText(sections, "ecommerce", "p", "A typical growing e-commerce brand pays $324–$775/mo across 6+ disconnected platforms — and still spends hours a week managing all of them.", 1)}
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
              <h3 className="font-semibold text-foreground" data-field-id={getFieldId(sections, "ecommerce", "h3", 0) || undefined}>
                {getEditableText(sections, "ecommerce", "h3", "Typical fragmented stack", 0)}
              </h3>
            </div>
            <div className="space-y-0">
              {theirStack.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-border/60 last:border-0">
                  <span className="text-sm text-foreground/65" data-field-id={getFieldId(sections, "ecommerce", "ul", i) || undefined}>
                    {getEditableText(sections, "ecommerce", "ul", item.tool, i)}
                  </span>
                  <span className="text-sm font-medium text-foreground" data-field-id={getFieldId(sections, "ecommerce", "ul", i + 6) || undefined}>
                    {getEditableText(sections, "ecommerce", "ul", item.cost, i + 6)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-foreground" data-field-id={getFieldId(sections, "ecommerce", "p", 2) || undefined}>
                  {getEditableText(sections, "ecommerce", "p", "Total", 2)}
                </span>
                <span className="font-bold text-foreground text-lg" data-field-id={getFieldId(sections, "ecommerce", "p", 3) || undefined}>
                  {getEditableText(sections, "ecommerce", "p", "$324–$775/mo", 3)}
                </span>
              </div>
              <p className="text-xs text-foreground/40" data-field-id={getFieldId(sections, "ecommerce", "p", 4) || undefined}>
                {getEditableText(sections, "ecommerce", "p", "Plus hours each week managing all of it manually", 4)}
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
              <h3 className="font-semibold text-foreground" data-field-id={getFieldId(sections, "ecommerce", "h3", 1) || undefined}>
                {getEditableText(sections, "ecommerce", "h3", "The Upgrade Shop — fully managed", 1)}
              </h3>
            </div>
            <div className="space-y-0">
              {ourStack.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gold/10 last:border-0">
                  <span className="text-sm text-foreground/65" data-field-id={getFieldId(sections, "ecommerce", "ol", i) || undefined}>
                    {getEditableText(sections, "ecommerce", "ol", item.item, i)}
                  </span>
                  <span className={`text-sm font-medium ${item.price === "Included" ? "text-gold-dark" : "text-foreground"}`} data-field-id={getFieldId(sections, "ecommerce", "ol", i + 7) || undefined}>
                    {getEditableText(sections, "ecommerce", "ol", item.price, i + 7)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-gold/20">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-foreground" data-field-id={getFieldId(sections, "ecommerce", "p", 5) || undefined}>
                  {getEditableText(sections, "ecommerce", "p", "Total", 5)}
                </span>
                <span className="font-bold text-gold text-lg" data-field-id={getFieldId(sections, "ecommerce", "p", 6) || undefined}>
                  {getEditableText(sections, "ecommerce", "p", "$405/mo", 6)}
                </span>
              </div>
              <p className="text-xs text-foreground/40" data-field-id={getFieldId(sections, "ecommerce", "p", 7) || undefined}>
                {getEditableText(sections, "ecommerce", "p", "Everything managed. AI agent included. No juggling.", 7)}
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
              <div key={i} className="text-center p-6 bg-card rounded-xl border border-border">
                <p className="font-display text-xl font-bold text-gold mb-2" data-field-id={getFieldId(sections, "ecommerce", "h4", i) || undefined}>
                  {getEditableText(sections, "ecommerce", "h4", item.stat, i)}
                </p>
                <p className="text-sm text-foreground/65" data-field-id={getFieldId(sections, "ecommerce", "p", i + 8) || undefined}>
                  {getEditableText(sections, "ecommerce", "p", item.desc, i + 8)}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-foreground/50 text-sm mb-5" data-field-id={getFieldId(sections, "ecommerce", "p", 11) || undefined}>
              {getEditableText(sections, "ecommerce", "p", "For most businesses, we save time and reduce cost. For e-commerce, we also generate revenue — through cart recovery, re-engagement, and social lead capture.", 11)}
            </p>
            <Button
              asChild
              className="bg-gold hover:bg-gold-dark text-foreground font-medium"
              data-field-id={getFieldId(sections, "ecommerce", "button", 0) || undefined}
            >
              <Link href="/pricing">
                {getEditableText(sections, "ecommerce", "button", "See E-Commerce Pricing", 0)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
