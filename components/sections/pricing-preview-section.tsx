"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
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

        {/* Bundle highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-foreground text-primary-foreground rounded-2xl p-8 text-center">
            <div className="inline-block px-3 py-1 bg-gold/20 text-gold text-sm font-medium rounded-full mb-4" data-field-id={getFieldId(sections, "pricing-preview", "p", 12) || undefined}>
              {getEditableText(sections, "pricing-preview", "p", "Best Value", 12)}
            </div>
            <h3 className="font-display text-2xl font-semibold mb-2" data-field-id={getFieldId(sections, "pricing-preview", "h3", 0) || undefined}>
              {getEditableText(
                sections,
                "pricing-preview",
                "h3",
                "Want everything?",
                0
              )}
            </h3>
            <p className="text-primary-foreground/80 mb-4" data-field-id={getFieldId(sections, "pricing-preview", "p", 1) || undefined}>
              {getEditableText(
                sections,
                "pricing-preview",
                "p",
                "All-Access Bundle — everything we offer, one simple price.",
                1
              )}
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="font-display text-4xl font-bold text-gold" data-field-id={getFieldId(sections, "pricing-preview", "p", 13) || undefined}>
                {getEditableText(sections, "pricing-preview", "p", "$199", 13)}
              </span>
              <span className="text-primary-foreground/60">/mo</span>
              <span className="ml-2 px-2 py-1 bg-gold/20 text-gold text-sm rounded-full" data-field-id={getFieldId(sections, "pricing-preview", "p", 14) || undefined}>
                {getEditableText(sections, "pricing-preview", "p", "Save $90+", 14)}
              </span>
            </div>
            <Button
              asChild
              className="bg-gold hover:bg-gold-dark text-foreground font-medium px-8"
            >
              <Link href="/pricing">
                <span data-field-id={getFieldId(sections, "pricing-preview", "button", 0) || undefined}>
                  {getEditableText(sections, "pricing-preview", "button", "View All Products & Pricing", 0)}
                </span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
