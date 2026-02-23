"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Bot } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";

interface PricingPreviewSectionProps {
  sections: PageSection[];
}

export function PricingPreviewSection({ sections }: PricingPreviewSectionProps) {
  const pricingPreviewSection = getSection(sections, "pricing-preview");
  const sectionId = pricingPreviewSection?.id;
  const sectionKey = pricingPreviewSection?.sectionKey;
  const products = [
    {
      name: "Website Builder",
      price: 89,
      description: "Built by developers, managed by Max",
      features: ["Professional design", "Content updates", "SEO optimized"],
    },
    {
      name: "CRM",
      price: 19,
      description: "Manage customers and close deals",
      features: ["Lead tracking", "Pipeline management", "Contact history"],
    },
    {
      name: "Email Marketing",
      price: 16,
      description: "Automated campaigns that convert",
      features: ["Beautiful templates", "Smart segmentation", "Analytics"],
    },
    {
      name: "WhatsApp Integration",
      price: 30,
      description: "Meet customers where they are",
      features: ["Business messaging", "Auto-responses", "Team inbox"],
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-sand/50 relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-noise opacity-30" />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6" data-field-id={getFieldId(sections, "pricing-preview", "p", 2) || undefined}>
            {getEditableText(sections, "pricing-preview", "p", "Transparent Pricing", 2)}
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6" data-field-id={getFieldId(sections, "pricing-preview", "h2", 0) || undefined}>
            {getEditableText(
              sections,
              "pricing-preview",
              "h2",
              "Start with what you need.",
              0
            )}
            <br />
            <span className="text-gold" data-field-id={getFieldId(sections, "pricing-preview", "h2", 1) || undefined}>
              {getEditableText(
                sections,
                "pricing-preview",
                "h2",
                "Add more as you grow.",
                1
              )}
            </span>
          </h2>
          <p className="text-lg text-foreground" data-field-id={getFieldId(sections, "pricing-preview", "p", 0) || undefined}>
            {getEditableText(
              sections,
              "pricing-preview",
              "p",
              "No long-term contracts. No hidden fees. Cancel anytime.",
              0
            )}
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-card rounded-2xl p-6 border transition-all duration-300 border-border hover:border-gold/20"
            >
              <div className="mb-4">
                <h3 className="font-display text-lg font-semibold text-foreground" data-field-id={getFieldId(sections, "pricing-preview", "h3", index + 1) || undefined}>
                  {getEditableText(sections, "pricing-preview", "h3", product.name, index + 1)}
                </h3>
                <p className="text-sm text-foreground" data-field-id={getFieldId(sections, "pricing-preview", "p", index + 4) || undefined}>
                  {getEditableText(sections, "pricing-preview", "p", product.description, index + 4)}
                </p>
              </div>

              <div className="mb-6">
                <span className="font-display text-3xl font-bold text-foreground" data-field-id={getFieldId(sections, "pricing-preview", "p", index + 8) || undefined}>
                  {getEditableText(sections, "pricing-preview", "p", `$${product.price}`, index + 8)}
                </span>
                <span className="text-foreground">/mo</span>
              </div>

              <ul className="space-y-2">
                {product.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Check className="h-4 w-4 text-gold-dark flex-shrink-0" />
                    <span data-field-id={getFieldId(sections, "pricing-preview", "ul", index * 3 + featureIndex) || undefined}>
                      {getEditableText(sections, "pricing-preview", "ul", feature, index * 3 + featureIndex)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* AI Agent included callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-foreground text-primary-foreground rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0 h-16 w-16 rounded-2xl bg-gold/20 flex items-center justify-center">
                <Bot className="h-8 w-8 text-gold" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-gold/20 text-gold text-sm font-medium rounded-full mb-2">
                  Included with every subscription
                </div>
                <h3 className="font-display text-xl font-semibold mb-1">
                  Your own personal AI agent — free
                </h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  Named by you, managing your platform from day one. 200 credits/month included.
                  Extend it to serve your customers when you're ready.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button
                  asChild
                  className="bg-gold hover:bg-gold-dark text-foreground font-medium"
                >
                  <Link href="/pricing">
                    <span>See All Pricing</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
